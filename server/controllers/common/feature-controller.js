const Feature = require("../../models/Feature"); // Import the Feature model for database operations

/**
 * Controller: addFeatureImage
 * Adds a new featured image to the database.
 *
 * @param {Object} req - The request object containing the image URL in `req.body.image`
 * @param {Object} res - The response object used to send back the result
 */
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body; // Extract the image URL from the request body
    console.log(image, "image"); // Log the image URL for debugging purposes

    // Create a new Feature document with the provided image URL
    const featureImages = new Feature({
      image,
    });

    // Save the new feature image to the database
    await featureImages.save();

    // Respond with success and the newly created feature image
    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * Controller: getFeatureImages
 * Fetches all featured images from the database.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to send back the list of featured images
 */
const getFeatureImages = async (req, res) => {
  try {
    // Fetch all featured images from the database
    const images = await Feature.find({});

    // Respond with success and the list of featured images
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * Controller: deleteFeatureImage
 * Deletes a specific featured image from the database by its ID.
 *
 * @param {Object} req - The request object containing the image ID in `req.params.id`
 * @param {Object} res - The response object used to send back the result
 */
const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params; // Extract the image ID from the request parameters

    // Find and delete the feature image by its ID
    const feature = await Feature.findByIdAndDelete(id);

    // If the feature image is not found, return a 404 error
    if (!feature) {
      return res.status(404).json({ success: false, message: 'Feature not found' });
    }

    // Respond with success and a confirmation message
    res.json({ success: true, message: 'Feature deleted successfully' });
  } catch (e) {
    console.log(e); // Log any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Export all controller functions for use in routes
module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };

/**
 * Explanation of the Code:
 * This module contains a set of controller functions for managing featured images in an application. It provides functionality
 * for adding new featured images, fetching all featured images, and deleting specific featured images. Below is a detailed
 * explanation of each function:
 *
 * 1. **addFeatureImage:**
 *    - Accepts an image URL from the request body.
 *    - Creates a new `Feature` document using the provided image URL and saves it to the database.
 *    - Responds with the newly created feature image and a success status.
 *    - Logs any errors and responds with a 500 status if an error occurs.
 *
 * 2. **getFeatureImages:**
 *    - Fetches all featured images from the database using the `Feature.find()` method.
 *    - Responds with the list of featured images and a success status.
 *    - Logs any errors and responds with a 500 status if an error occurs.
 *
 * 3. **deleteFeatureImage:**
 *    - Accepts the ID of the feature image to be deleted from the request parameters.
 *    - Finds and deletes the feature image by its ID using the `Feature.findByIdAndDelete()` method.
 *    - If the feature image is not found, responds with a 404 status and an appropriate message.
 *    - Responds with a success status and a confirmation message if the deletion is successful.
 *    - Logs any errors and responds with a 500 status if an error occurs.
 *
 * Usage:
 * These controller functions are typically used in an Express.js backend to handle CRUD operations for featured images. They
 * integrate seamlessly with MongoDB (via Mongoose) and can be mapped to API endpoints in your routes file. For example:
 *
 * ```javascript
 * const express = require("express");
 * const router = express.Router();
 * const featureController = require("./controllers/featureController");
 *
 * router.post("/feature/add", featureController.addFeatureImage);
 * router.get("/feature/get", featureController.getFeatureImages);
 * router.delete("/feature/delete/:id", featureController.deleteFeatureImage);
 *
 * module.exports = router;
 * ```
 *
 * Customization:
 * You can customize these functions based on your application's requirements:
 * - Add validation for incoming data to ensure consistency and prevent errors.
 * - Implement pagination or filtering in the `getFeatureImages` function for large datasets.
 * - Extend the `deleteFeatureImage` function to handle additional business logic, such as checking permissions.
 *
 * This module provides a robust foundation for managing featured images in an application, ensuring scalability and maintainability.
 */