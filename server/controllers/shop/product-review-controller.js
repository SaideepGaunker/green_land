const Order = require("../../models/Order"); // Import the Order model for database operations
const Product = require("../../models/Product"); // Import the Product model for database operations
const ProductReview = require("../../models/Review"); // Import the Review model for database operations

/**
 * Controller: addProductReview
 * Adds a review for a product after verifying that the user has purchased the product.
 *
 * @param {Object} req - The request object containing productId, userId, userName, reviewMessage, and reviewValue in `req.body`
 * @param {Object} res - The response object used to send back the result
 */
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Check if the user has purchased the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      // Uncomment the line below to restrict reviews to confirmed or delivered orders only
      // orderStatus: { $in: ["confirmed", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase the product to review it.",
      });
    }

    // Check if the user has already reviewed the product
    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product!",
      });
    }

    // Create a new review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    // Save the new review to the database
    await newReview.save();

    // Calculate the average review for the product
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    // Update the product's average review in the database
    await Product.findByIdAndUpdate(productId, { averageReview });

    // Respond with success and the newly created review
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log(e); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

/**
 * Controller: getProductReviews
 * Fetches all reviews for a specific product.
 *
 * @param {Object} req - The request object containing productId in `req.params`
 * @param {Object} res - The response object used to send back the list of reviews
 */
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch all reviews for the specified product
    const reviews = await ProductReview.find({ productId });

    // Respond with success and the list of reviews
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Export all controller functions for use in routes
module.exports = { addProductReview, getProductReviews };

/**
 * Explanation of the Code:
 * This module contains two controller functions for managing product reviews in an e-commerce application. It ensures that
 * users can only review products they have purchased and calculates the average review score for each product. Below is a
 * detailed explanation of each function:
 *
 * 1. **addProductReview:**
 *    - Validates that the user has purchased the product by checking their order history.
 *    - Ensures that the user has not already reviewed the product.
 *    - Creates a new review and saves it to the database.
 *    - Calculates the average review score for the product based on all existing reviews.
 *    - Updates the product's average review score in the database.
 *    - Responds with the newly created review and a success status.
 *
 * 2. **getProductReviews:**
 *    - Fetches all reviews for a specific product from the database.
 *    - Responds with the list of reviews and a success status.
 *
 * Usage:
 * These controller functions are typically used in an Express.js backend to handle CRUD operations for product reviews. They
 * integrate seamlessly with MongoDB (via Mongoose) and can be mapped to API endpoints in your routes file. For example:
 *
 * ```javascript
 * const express = require("express");
 * const router = express.Router();
 * const reviewController = require("./controllers/reviewController");
 *
 * router.post("/review/add", reviewController.addProductReview);
 * router.get("/review/:productId", reviewController.getProductReviews);
 *
 * module.exports = router;
 * ```
 *
 * Customization:
 * You can customize these functions based on your application's requirements:
 * - Add additional validation for input data (e.g., ensuring reviewValue is within a valid range).
 * - Implement pagination for fetching reviews to handle large datasets.
 * - Extend the functionality to include features like upvoting/downvoting reviews or filtering reviews by rating.
 *
 * This module provides a robust foundation for managing product reviews in an e-commerce application, ensuring scalability
 * and maintainability.
 */