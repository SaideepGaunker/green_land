const mongoose = require("mongoose");

/**
 * Schema: ProductReviewSchema
 * Defines the structure of the ProductReview model in the database.
 * Each review is associated with a product and a user, and includes details such as the review message and rating value.
 */
const ProductReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String, // ID of the product being reviewed
      required: true, // Ensures that every review must reference a valid product
    },
    userId: {
      type: String, // ID of the user who wrote the review
      required: true, // Ensures that every review must be associated with a valid user
    },
    userName: {
      type: String, // Name of the user who wrote the review
      required: true, // Ensures that the user's name is provided
    },
    reviewMessage: {
      type: String, // The content or message of the review
      default: "", // Optional field with a default value of an empty string
    },
    reviewValue: {
      type: Number, // The rating value given by the user (e.g., 1 to 5 stars)
      required: true, // Ensures that every review must have a rating value
      min: 1, // Ensures that the minimum rating value is 1
      max: 5, // Ensures that the maximum rating value is 5
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields to track when the review was created and last updated
);

/**
 * Model: ProductReview
 * Represents the ProductReview collection in the database. It allows for CRUD operations on product review data.
 */
module.exports = mongoose.model("ProductReview", ProductReviewSchema);

/**
 * Explanation of the Code:
 * This module defines the schema and model for the ProductReview collection in a MongoDB database using Mongoose. Below is a detailed
 * explanation of the schema and its components:
 *
 * 1. **productId Field:**
 *    - Type: String
 *    - Required: Ensures that every review must reference a valid product.
 *
 * 2. **userId Field:**
 *    - Type: String
 *    - Required: Ensures that every review must be associated with a valid user.
 *
 * 3. **userName Field:**
 *    - Type: String
 *    - Required: Ensures that the name of the user who wrote the review is provided.
 *
 * 4. **reviewMessage Field:**
 *    - Type: String
 *    - Default: Defaults to an empty string if no review message is provided.
 *
 * 5. **reviewValue Field:**
 *    - Type: Number
 *    - Required: Ensures that every review must have a rating value.
 *    - Min: Ensures that the minimum rating value is 1.
 *    - Max: Ensures that the maximum rating value is 5.
 *
 * 6. **timestamps Option:**
 *    - Automatically adds `createdAt` and `updatedAt` fields to each document in the ProductReview collection.
 *    - These fields are useful for tracking when the review was created and last modified.
 *
 * Usage:
 * This schema is used to define the structure of the ProductReview model, which can then be used to perform database operations such as:
 * - Creating a new review for a product.
 * - Fetching all reviews for a specific product.
 * - Calculating the average rating for a product based on all reviews.
 *
 * Example Usage in an Express.js Application:
 * ```javascript
 * const express = require("express");
 * const router = express.Router();
 * const ProductReview = require("./models/ProductReview");
 *
 * // Add a new product review
 * router.post("/review/add", async (req, res) => {
 *   try {
 *     const { productId, userId, userName, reviewMessage, reviewValue } = req.body;
 *     const newReview = new ProductReview({
 *       productId,
 *       userId,
 *       userName,
 *       reviewMessage,
 *       reviewValue,
 *     });
 *     await newReview.save();
 *     res.status(201).json({ success: true, data: newReview });
 *   } catch (error) {
 *     res.status(500).json({ success: false, message: "Error" });
 *   }
 * });
 *
 * // Fetch all reviews for a specific product
 * router.get("/review/:productId", async (req, res) => {
 *   try {
 *     const { productId } = req.params;
 *     const reviews = await ProductReview.find({ productId });
 *     res.status(200).json({ success: true, data: reviews });
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
 * - Add additional fields such as upvotes/downvotes or helpfulness ratings.
 * - Implement validation for specific review lengths or formats.
 * - Add methods to calculate the average rating dynamically.
 *
 * This schema provides a robust foundation for managing product reviews in an e-commerce application, ensuring scalability
 * and maintainability.
 */