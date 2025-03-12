// This file defines controller functions for handling order-related API requests in the backend.
// It interacts with the `Order` model to perform CRUD operations and manage order data.

const Order = require("../../models/Order"); // Importing the `Order` model for database interactions.

// Controller to Fetch All Orders of All Users
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({}); // Fetches all orders from the database.
    if (!orders.length) {
      // Checks if no orders are found.
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

// Controller to Fetch Details of a Specific Order for Admin
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the order ID from the request parameters.
    const order = await Order.findById(id); // Fetches the order by its ID from the database.
    if (!order) {
      // Checks if the order does not exist.
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

// Controller to Update the Status of a Specific Order
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the order ID from the request parameters.
    const { orderStatus } = req.body; // Extracts the new order status from the request body.
    const order = await Order.findById(id); // Fetches the order by its ID from the database.
    if (!order) {
      // Checks if the order does not exist.
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }
    await Order.findByIdAndUpdate(id, { orderStatus }); // Updates the order status in the database.
    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!", // Confirms the successful update.
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
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};

/* 
  Summary of the File's Purpose:
  This file defines controller functions for handling order-related API requests in the backend. Key features include:
  1. **Fetch All Orders**: Retrieves all orders from the database and handles cases where no orders are found.
  2. **Fetch Order Details**: Retrieves detailed information about a specific order using its ID.
  3. **Update Order Status**: Updates the status of a specific order based on the provided ID and new status.
  4. **Error Handling**: Includes robust error handling to log errors and return appropriate responses to the client.
  5. **Integration with Database**: Uses the `Order` model to interact with the database for fetching and updating order data.
*/