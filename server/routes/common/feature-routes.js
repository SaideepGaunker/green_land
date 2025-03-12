const express = require("express");
const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage, // Import the deleteFeatureImage function
} = require("../../controllers/common/feature-controller");
const router = express.Router();

/**
 * Route: POST /add
 * Adds a new featured image by invoking the `addFeatureImage` controller function.
 */
router.post("/add", addFeatureImage);

/**
 * Route: GET /get
 * Fetches all featured images by invoking the `getFeatureImages` controller function.
 */
router.get("/get", getFeatureImages);

/**
 * Route: DELETE /delete/:id
 * Deletes a specific featured image by its ID by invoking the `deleteFeatureImage` controller function.
 */
router.delete("/delete/:id", deleteFeatureImage);

module.exports = router;

/**
 * Explanation of the Code:
 * This module defines the routes for managing featured images in an Express.js application. It uses the `express.Router`
 * to organize and manage these routes. Below is a detailed explanation of each route:
 *
 * 1. **POST /add:**
 *    - Invokes the `addFeatureImage` controller function to handle the addition of a new featured image.
 *    - This route is used to upload or save a new featured image to the database.
 *
 * 2. **GET /get:**
 *    - Invokes the `getFeatureImages` controller function to fetch all featured images.
 *    - This route is used to retrieve the list of all featured images stored in the database.
 *
 * 3. **DELETE /delete/:id:**
 *    - Invokes the `deleteFeatureImage` controller function to delete a specific featured image by its ID.
 *    - This route is used to remove a featured image from the database based on the provided ID in the URL parameter.
 *
 * The routes are designed to provide a clear and modular structure for managing featured images, ensuring that operations
 * such as adding, fetching, and deleting images are handled efficiently and securely.
 */