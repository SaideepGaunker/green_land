// This file defines the routes for handling product-related operations in the admin section of the application.
// It uses Express Router to define endpoints and links them to their respective controller functions.

const express = require("express"); // Importing Express for creating the router.
const {
  handleImageUpload, // Controller to handle image uploads.
  addProduct, // Controller to add a new product.
  editProduct, // Controller to edit an existing product.
  fetchAllProducts, // Controller to fetch all products.
  deleteProduct, // Controller to delete a product.
} = require("../../controllers/admin/products-controller"); // Importing controller functions for product management.

const { upload } = require("../../helpers/cloudinary"); // Importing the Cloudinary upload middleware for handling image uploads.

const router = express.Router(); // Creating an instance of Express Router.

// Route to Upload an Image
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Route to Add a New Product
router.post("/add", addProduct);

// Route to Edit an Existing Product
router.put("/edit/:id", editProduct);

// Route to Delete a Product
router.delete("/delete/:id", deleteProduct);

// Route to Fetch All Products
router.get("/get", fetchAllProducts);

// Exporting the Router
module.exports = router;

/* 
  Summary of the File's Purpose:
  This file defines the routes for managing products in the admin section of the application. Key features include:
  1. **Route Definitions**:
     - `POST /upload-image`: Handles image uploads using Cloudinary middleware.
     - `POST /add`: Adds a new product to the database.
     - `PUT /edit/:id`: Edits an existing product using its ID.
     - `DELETE /delete/:id`: Deletes a product using its ID.
     - `GET /get`: Fetches all products from the database.
  2. **Controller Integration**: Links each route to its corresponding controller function for handling business logic.
  3. **Cloudinary Integration**: Uses the `upload.single("my_file")` middleware from Cloudinary to handle single-file image uploads.
  4. **Express Router**: Uses Express Router to modularize and organize the routes, making the codebase cleaner and more maintainable.
  5. **Reusability**: The exported router can be mounted in the main application to handle admin-specific product-related requests.
*/