// This file defines the routes for handling product-related operations in the shop section of the application.
// It uses Express Router to define endpoints and links them to their respective controller functions.

const express = require("express"); // Importing Express for creating the router.
const {
  getFilteredProducts, // Controller to fetch filtered products based on query parameters.
  getProductDetails, // Controller to fetch detailed information about a specific product.
} = require("../../controllers/shop/products-controller"); // Importing controller functions for product management.

const router = express.Router(); // Creating an instance of Express Router.

// Route to Fetch Filtered Products
router.get("/get", getFilteredProducts);

// Route to Fetch Details of a Specific Product
router.get("/get/:id", getProductDetails);

// Exporting the Router
module.exports = router;

/* 
  Summary of the File's Purpose:
  This file defines the routes for managing product-related operations in the shop section of the application. Key features include:
  1. **Route Definitions**:
     - `GET /get`: Fetches filtered products based on query parameters such as category, need, and sort order.
     - `GET /get/:id`: Fetches detailed information about a specific product using its ID.
  2. **Controller Integration**: Links each route to its corresponding controller function for handling business logic.
  3. **Express Router**: Uses Express Router to modularize and organize the routes, making the codebase cleaner and more maintainable.
  4. **Reusability**: The exported router can be mounted in the main application to handle shop-specific product-related requests.
*/