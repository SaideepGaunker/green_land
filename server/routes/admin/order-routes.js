// This file defines the routes for handling order-related operations in the admin section of the application.
// It uses Express Router to define endpoints and links them to their respective controller functions.

const express = require("express"); // Importing Express for creating the router.
const {
  getAllOrdersOfAllUsers, // Controller to fetch all orders of all users.
  getOrderDetailsForAdmin, // Controller to fetch details of a specific order for admin.
  updateOrderStatus, // Controller to update the status of a specific order.
} = require("../../controllers/admin/order-controller"); // Importing controller functions for order management.

const router = express.Router(); // Creating an instance of Express Router.

// Route to Fetch All Orders of All Users
router.get("/get", getAllOrdersOfAllUsers);

// Route to Fetch Details of a Specific Order (Admin)
router.get("/details/:id", getOrderDetailsForAdmin);

// Route to Update the Status of a Specific Order
router.put("/update/:id", updateOrderStatus);

// Exporting the Router
module.exports = router;

/* 
  Summary of the File's Purpose:
  This file defines the routes for managing orders in the admin section of the application. Key features include:
  1. **Route Definitions**: 
     - `GET /get`: Fetches all orders of all users.
     - `GET /details/:id`: Fetches detailed information about a specific order using its ID.
     - `PUT /update/:id`: Updates the status of a specific order using its ID.
  2. **Controller Integration**: Links each route to its corresponding controller function for handling business logic.
  3. **Express Router**: Uses Express Router to modularize and organize the routes, making the codebase cleaner and more maintainable.
  4. **Reusability**: The exported router can be mounted in the main application to handle admin-specific order-related requests.
*/