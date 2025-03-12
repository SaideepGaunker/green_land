// This file defines controller functions for managing orders in the backend, including order creation, payment capture, and retrieval of order details.
// It integrates with PayPal for payment processing and interacts with the `Order`, `Cart`, and `Product` models for database operations.

const paypal = require("../../helpers/paypal"); // Importing PayPal helper for payment integration.
const Order = require("../../models/Order"); // Importing the `Order` model for database interactions.
const Cart = require("../../models/Cart"); // Importing the `Cart` model for cart-related operations.
const Product = require("../../models/Product"); // Importing the `Product` model for product-related operations.
const axios = require('axios'); // Add axios for making API requests

// Function to get the exchange rate from INR to USD
async function getExchangeRate() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
    return response.data.rates.USD;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Could not fetch exchange rate');
  }
}

// Controller to Create a New Order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Get the exchange rate from INR to USD
    const exchangeRate = await getExchangeRate();
    const totalAmountInUSD = (totalAmount * exchangeRate).toFixed(2); // Convert total amount to USD

    // Constructing the PayPal payment request object
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return", // Redirect URL after successful payment.
        cancel_url: "http://localhost:5173/shop/paypal-cancel", // Redirect URL if payment is canceled.
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: (item.price * exchangeRate).toFixed(2), // Convert item price to USD
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmountInUSD, // Total amount in USD
          },
          description: "description",
        },
      ],
    };

    // Creating the PayPal payment
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment",
        });
      } else {
        // Saving the new order to the database
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newlyCreatedOrder.save();

        // Extracting the PayPal approval URL for redirection
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL, // URL for PayPal payment approval.
          orderId: newlyCreatedOrder._id, // ID of the newly created order.
        });
      }
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Controller to Capture Payment and Confirm the Order
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    let order = await Order.findById(orderId); // Fetching the order by its ID.
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Updating the order's payment and status
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Deducting stock for each product in the order
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId); // Fetching the product by its ID.
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }
      product.totalStock -= item.quantity; // Deducting the purchased quantity from the product's stock.
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId); // Deleting the associated cart after confirming the order.
    await order.save(); // Saving the updated order.

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order, // Returning the confirmed order details.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Controller to Fetch All Orders for a User
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extracts the user ID from the request parameters.
    const orders = await Order.find({ userId }); // Fetches all orders associated with the user ID.
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }
    res.status(200).json({
      success: true,
      data: orders, // Returns the list of orders.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Controller to Fetch Details of a Specific Order
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the order ID from the request parameters.
    const order = await Order.findById(id); // Fetches the order by its ID.
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: order, // Returns the order details.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Exporting the Controller Functions
module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};

/* 
  Summary of the File's Purpose:
  This file defines controller functions for managing orders in the backend. Key features include:
  1. **Create Order**: Creates a new order, integrates with PayPal for payment processing, and saves the order to the database.
  2. **Capture Payment**: Confirms the order, updates payment status, deducts product stock, and deletes the associated cart.
  3. **Fetch All Orders**: Retrieves all orders for a specific user.
  4. **Fetch Order Details**: Retrieves detailed information about a specific order using its ID.
  5. **Error Handling**: Includes robust error handling to log errors and return appropriate responses to the client.
  6. **Integration with PayPal**: Uses PayPal's API for payment creation and approval, ensuring secure and reliable transactions.
*/