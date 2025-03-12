// This file defines the routes for handling address-related operations in the shop section of the application.
// It uses Express Router to define endpoints and links them to their respective controller functions.

const express = require("express"); // Importing Express for creating the router.
const {
  addAddress, // Controller to add a new address.
  fetchAllAddress, // Controller to fetch all addresses for a specific user.
  editAddress, // Controller to edit an existing address.
  deleteAddress, // Controller to delete an address.
} = require("../../controllers/shop/address-controller"); // Importing controller functions for address management.

const router = express.Router(); // Creating an instance of Express Router.

// Route to Add a New Address
router.post("/add", addAddress);

// Route to Fetch All Addresses for a Specific User
router.get("/get/:userId", fetchAllAddress);

// Route to Delete an Address
router.delete("/delete/:userId/:addressId", deleteAddress);

// Route to Edit an Existing Address
router.put("/update/:userId/:addressId", editAddress);

// Exporting the Router
module.exports = router;

/* 
  Summary of the File's Purpose:
  This file defines the routes for managing addresses in the shop section of the application. Key features include:
  1. **Route Definitions**:
     - `POST /add`: Adds a new address to the database.
     - `GET /get/:userId`: Fetches all addresses associated with a specific user using their `userId`.
     - `DELETE /delete/:userId/:addressId`: Deletes an address using both `userId` and `addressId`.
     - `PUT /update/:userId/:addressId`: Updates an existing address using both `userId` and `addressId`.
  2. **Controller Integration**: Links each route to its corresponding controller function for handling business logic.
  3. **Express Router**: Uses Express Router to modularize and organize the routes, making the codebase cleaner and more maintainable.
  4. **Reusability**: The exported router can be mounted in the main application to handle shop-specific address-related requests.
*/