const mongoose = require("mongoose");

/**
 * Schema: CartSchema
 * Defines the structure of the Cart model in the database.
 * Each cart is associated with a user and contains a list of items, where each item includes a product ID and its quantity.
 */
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User", // Links the cart to a specific user
      required: true, // Ensures that every cart must be associated with a user
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
          ref: "Product", // Links each item to a specific product
          required: true, // Ensures that every cart item must have a product ID
        },
        quantity: {
          type: Number, // The quantity of the product in the cart
          required: true, // Ensures that every cart item must have a quantity
          min: 1, // Ensures that the quantity is at least 1
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields to track when the cart was created and last updated
  }
);

/**
 * Model: Cart
 * Represents the Cart collection in the database. It allows for CRUD operations on cart data.
 */
module.exports = mongoose.model("Cart", CartSchema);

/**
 * Explanation of the Code:
 * This module defines the schema and model for the Cart collection in a MongoDB database using Mongoose. Below is a detailed
 * explanation of the schema and its components:
 *
 * 1. **userId Field:**
 *    - Type: `mongoose.Schema.Types.ObjectId`
 *    - Reference: Links the cart to a specific user via the `User` model.
 *    - Required: Ensures that every cart must be associated with a valid user.
 *
 * 2. **items Field:**
 *    - Type: Array of objects, where each object represents a product in the cart.
 *    - productId:
 *      - Type: `mongoose.Schema.Types.ObjectId`
 *      - Reference: Links each item to a specific product via the `Product` model.
 *      - Required: Ensures that every cart item must reference a valid product.
 *    - quantity:
 *      - Type: Number
 *      - Required: Ensures that every cart item must have a quantity.
 *      - Min: Ensures that the quantity is at least 1 (no zero or negative quantities).
 *
 * 3. **timestamps Option:**
 *    - Automatically adds `createdAt` and `updatedAt` fields to each document in the Cart collection.
 *    - These fields are useful for tracking when the cart was created and last modified.
 *
 * Usage:
 * This schema is used to define the structure of the Cart model, which can then be used to perform database operations such as:
 * - Creating a new cart for a user.
 * - Adding, updating, or removing items from the cart.
 * - Fetching the cart and its associated products for a specific user.
 *
 * Example Usage in an Express.js Application:
 * ```javascript
 * const express = require("express");
 * const router = express.Router();
 * const Cart = require("./models/Cart");
 *
 * // Add a product to the cart
 * router.post("/cart/add", async (req, res) => {
 *   const { userId, productId, quantity } = req.body;
 *   try {
 *     let cart = await Cart.findOne({ userId });
 *     if (!cart) {
 *       cart = new Cart({ userId, items: [] });
 *     }
 *     cart.items.push({ productId, quantity });
 *     await cart.save();
 *     res.status(201).json({ success: true, data: cart });
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
 * - Add additional fields such as discounts, shipping details, or total price.
 * - Implement validation for maximum cart size or total quantity limits.
 * - Add methods to calculate the total price of the cart dynamically.
 *
 * This schema provides a robust foundation for managing shopping carts in an e-commerce application, ensuring scalability
 * and maintainability.
 */