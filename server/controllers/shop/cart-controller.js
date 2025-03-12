const Cart = require("../../models/Cart"); // Import the Cart model for database operations
const Product = require("../../models/Product"); // Import the Product model for database operations

/**
 * Controller: addToCart
 * Adds a product to the user's cart or updates its quantity if it already exists.
 *
 * @param {Object} req - The request object containing userId, productId, and quantity in `req.body`
 * @param {Object} res - The response object used to send back the result
 */
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      // Add the product to the cart if it's not already present
      cart.items.push({ productId, quantity });
    } else {
      // Update the quantity if the product is already in the cart
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    // Save the updated cart to the database
    await cart.save();

    // Respond with success and the updated cart
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

/**
 * Controller: fetchCartItems
 * Fetches all items in the user's cart, including product details like image, title, price, and sale price.
 *
 * @param {Object} req - The request object containing userId in `req.params`
 * @param {Object} res - The response object used to send back the list of cart items
 */
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input data
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    // Fetch the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Handle cases where the cart is not found
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Filter out invalid items (e.g., products that no longer exist)
    const validItems = cart.items.filter((productItem) => productItem.productId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // Map cart items to include only relevant product details
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    // Respond with success and the populated cart items
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

/**
 * Controller: updateCartItemQty
 * Updates the quantity of a specific item in the user's cart.
 *
 * @param {Object} req - The request object containing userId, productId, and quantity in `req.body`
 * @param {Object} res - The response object used to send back the result
 */
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Fetch the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Find the index of the product in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Handle cases where the product is not found in the cart
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!",
      });
    }

    // Update the quantity of the product
    cart.items[findCurrentProductIndex].quantity = quantity;

    // Save the updated cart and populate product details
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Map cart items to include only relevant product details
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    // Respond with success and the updated cart
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

/**
 * Controller: deleteCartItem
 * Deletes a specific item from the user's cart.
 *
 * @param {Object} req - The request object containing userId and productId in `req.params`
 * @param {Object} res - The response object used to send back the result
 */
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate input data
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Fetch the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Handle cases where the cart is not found
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Remove the specified product from the cart
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    // Save the updated cart and populate product details
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Map cart items to include only relevant product details
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    // Respond with success and the updated cart
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Export all controller functions for use in routes
module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};

/**
 * Explanation of the Code:
 * This module contains a set of controller functions for managing a user's shopping cart. It provides functionality for
 * adding products to the cart, fetching cart items, updating item quantities, and deleting items. Below is a detailed
 * explanation of each function:
 *
 * 1. **addToCart:**
 *    - Validates input data (userId, productId, and quantity).
 *    - Checks if the product exists in the database.
 *    - Finds or creates the user's cart.
 *    - Adds the product to the cart or updates its quantity if it already exists.
 *    - Saves the updated cart and responds with the result.
 *
 * 2. **fetchCartItems:**
 *    - Validates input data (userId).
 *    - Fetches the user's cart and populates product details (image, title, price, sale price).
 *    - Filters out invalid items (e.g., products that no longer exist).
 *    - Maps cart items to include only relevant product details.
 *    - Responds with the populated cart items.
 *
 * 3. **updateCartItemQty:**
 *    - Validates input data (userId, productId, and quantity).
 *    - Fetches the user's cart and finds the specified product.
 *    - Updates the quantity of the product in the cart.
 *    - Saves the updated cart and populates product details.
 *    - Responds with the updated cart.
 *
 * 4. **deleteCartItem:**
 *    - Validates input data (userId and productId).
 *    - Fetches the user's cart and removes the specified product.
 *    - Saves the updated cart and populates product details.
 *    - Responds with the updated cart.
 *
 * Usage:
 * These controller functions are typically used in an Express.js backend to handle CRUD operations for a shopping cart. They
 * integrate seamlessly with MongoDB (via Mongoose) and can be mapped to API endpoints in your routes file. For example:
 *
 * ```javascript
 * const express = require("express");
 * const router = express.Router();
 * const cartController = require("./controllers/cartController");
 *
 * router.post("/cart/add", cartController.addToCart);
 * router.get("/cart/:userId", cartController.fetchCartItems);
 * router.put("/cart/update", cartController.updateCartItemQty);
 * router.delete("/cart/delete/:userId/:productId", cartController.deleteCartItem);
 *
 * module.exports = router;
 * ```
 *
 * Customization:
 * You can customize these functions based on your application's requirements:
 * - Add additional validation for input data.
 * - Implement error handling for edge cases (e.g., insufficient stock).
 * - Extend the functionality to include features like discounts or promotions.
 *
 * This module provides a robust foundation for managing a shopping cart in an e-commerce application, ensuring scalability
 * and maintainability.
 */