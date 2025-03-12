const mongoose = require("mongoose");

/**
 * Schema: OrderSchema
 * Defines the structure of the Order model in the database.
 * Each order is associated with a user, contains cart items, address information, payment details, and order status.
 */
const OrderSchema = new mongoose.Schema({
  userId: {
    type: String, // ID of the user who placed the order
    required: true, // Ensures that every order must be associated with a user
  },
  cartId: {
    type: String, // ID of the cart from which the order was created
    required: true, // Ensures that every order must reference a cart
  },
  cartItems: [
    {
      productId: {
        type: String, // ID of the product in the order
        required: true, // Ensures that every cart item must have a product ID
      },
      title: {
        type: String, // Name or title of the product
        required: true, // Ensures that every cart item must have a title
      },
      image: {
        type: String, // URL or path to the product image
        required: true, // Ensures that every cart item must have an image
      },
      price: {
        type: String, // Price of the product (stored as a string for flexibility)
        required: true, // Ensures that every cart item must have a price
      },
      quantity: {
        type: Number, // Quantity of the product in the order
        required: true, // Ensures that every cart item must have a quantity
        min: 1, // Ensures that the quantity is at least 1
      },
    },
  ],
  addressInfo: {
    addressId: {
      type: String, // ID of the saved address
      required: true, // Ensures that the address ID is provided
    },
    address: {
      type: String, // Full address (e.g., street, building)
      required: true, // Ensures that the address is provided
    },
    city: {
      type: String, // City name
      required: true, // Ensures that the city is provided
    },
    pincode: {
      type: String, // Postal code or ZIP code
      required: true, // Ensures that the pincode is provided
    },
    phone: {
      type: String, // Contact phone number
      required: true, // Ensures that the phone number is provided
    },
    notes: {
      type: String, // Additional delivery instructions or notes
      default: "", // Optional field with a default value of an empty string
    },
  },
  orderStatus: {
    type: String, // Current status of the order (e.g., "pending", "confirmed", "shipped", "delivered")
    required: true, // Ensures that the order status is provided
  },
  paymentMethod: {
    type: String, // Payment method used (e.g., "credit card", "PayPal", "COD")
    required: true, // Ensures that the payment method is provided
  },
  paymentStatus: {
    type: String, // Payment status (e.g., "paid", "unpaid", "failed")
    required: true, // Ensures that the payment status is provided
  },
  totalAmount: {
    type: Number, // Total amount of the order
    required: true, // Ensures that the total amount is provided
    min: 0, // Ensures that the total amount is non-negative
  },
  orderDate: {
    type: Date, // Date and time when the order was placed
    default: Date.now, // Defaults to the current date and time if not provided
  },
  orderUpdateDate: {
    type: Date, // Date and time when the order was last updated
    default: Date.now, // Defaults to the current date and time if not provided
  },
  paymentId: {
    type: String, // ID of the payment transaction (if applicable)
    default: "", // Optional field with a default value of an empty string
  },
  payerId: {
    type: String, // ID of the payer (if applicable, e.g., PayPal payer ID)
    default: "", // Optional field with a default value of an empty string
  },
});

/**
 * Model: Order
 * Represents the Order collection in the database. It allows for CRUD operations on order data.
 */
module.exports = mongoose.model("Order", OrderSchema);

/**
 * Explanation of the Code:
 * This module defines the schema and model for the Order collection in a MongoDB database using Mongoose. Below is a detailed
 * explanation of the schema and its components:
 *
 * 1. **userId Field:**
 *    - Type: String
 *    - Required: Ensures that every order must be associated with a valid user.
 *
 * 2. **cartId Field:**
 *    - Type: String
 *    - Required: Ensures that every order must reference a valid cart.
 *
 * 3. **cartItems Field:**
 *    - Type: Array of objects, where each object represents a product in the order.
 *    - productId:
 *      - Type: String
 *      - Required: Ensures that every cart item must reference a valid product.
 *    - title:
 *      - Type: String
 *      - Required: Ensures that every cart item must have a title.
 *    - image:
 *      - Type: String
 *      - Required: Ensures that every cart item must have an image.
 *    - price:
 *      - Type: String
 *      - Required: Ensures that every cart item must have a price.
 *    - quantity:
 *      - Type: Number
 *      - Required: Ensures that every cart item must have a quantity.
 *      - Min: Ensures that the quantity is at least 1.
 *
 * 4. **addressInfo Field:**
 *    - Contains details about the delivery address.
 *    - addressId, address, city, pincode, and phone are required fields.
 *    - notes is optional and defaults to an empty string.
 *
 * 5. **orderStatus, paymentMethod, and paymentStatus Fields:**
 *    - Type: String
 *    - Required: Ensures that these fields are provided for every order.
 *
 * 6. **totalAmount Field:**
 *    - Type: Number
 *    - Required: Ensures that the total amount is provided.
 *    - Min: Ensures that the total amount is non-negative.
 *
 * 7. **orderDate and orderUpdateDate Fields:**
 *    - Type: Date
 *    - Default: Automatically set to the current date and time if not provided.
 *
 * 8. **paymentId and payerId Fields:**
 *    - Type: String
 *    - Optional: Defaults to an empty string if not provided.
 *
 * Usage:
 * This schema is used to define the structure of the Order model, which can then be used to perform database operations such as:
 * - Creating a new order when a user completes a purchase.
 * - Fetching order details for a specific user.
 * - Updating the status of an order (e.g., "shipped", "delivered").
 * - Tracking payment details and updating payment status.
 *
 * Example Usage in an Express.js Application:
 * ```javascript
 * const express = require("express");
 * const router = express.Router();
 * const Order = require("./models/Order");
 *
 * // Create a new order
 * router.post("/order/create", async (req, res) => {
 *   try {
 *     const { userId, cartId, cartItems, addressInfo, paymentMethod } = req.body;
 *     const newOrder = new Order({
 *       userId,
 *       cartId,
 *       cartItems,
 *       addressInfo,
 *       paymentMethod,
 *       paymentStatus: "unpaid",
 *       orderStatus: "pending",
 *       totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
 *     });
 *     await newOrder.save();
 *     res.status(201).json({ success: true, data: newOrder });
 *   } catch (error) {
 *     res.status(500).json({ success: false, message: "Error" });
 *   }
 * });
 *
 * module.exports = router;
 * ```
 *
 * Customization:
 * You can extend this schema based on your application's requirements:
 * - Add additional fields such as shipping costs, taxes, or discounts.
 * - Implement methods to calculate the total amount dynamically.
 * - Add validation for specific order statuses or payment methods.
 *
 * This schema provides a robust foundation for managing orders in an e-commerce application, ensuring scalability
 * and maintainability.
 */