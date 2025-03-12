// This file defines the routes for handling cart-related operations in the shop section of the application.
// It uses Express Router to define endpoints and links them to their respective controller functions.

const express = require("express"); // Importing Express for creating the router.
const {
  addToCart, // Controller to add a product to the cart.
  fetchCartItems, // Controller to fetch all cart items for a specific user.
  deleteCartItem, // Controller to delete a product from the cart.
  updateCartItemQty, // Controller to update the quantity of a product in the cart.
} = require("../../controllers/shop/cart-controller"); // Importing controller functions for cart management.

const router = express.Router(); // Creating an instance of Express Router.

// Route to Add a Product to the Cart
router.post("/add", addToCart);

// Route to Fetch All Cart Items for a Specific User
router.get("/get/:userId", fetchCartItems);

// Route to Update the Quantity of a Product in the Cart
router.put("/update-cart", updateCartItemQty);

// Route to Delete a Product from the Cart
router.delete("/:userId/:productId", deleteCartItem);

// Exporting the Router
module.exports = router;

/* 
  Summary of the File's Purpose:
  This file defines the routes for managing cart-related operations in the shop section of the application. Key features include:
  1. **Route Definitions**:
     - `POST /add`: Adds a product to the cart.
     - `GET /get/:userId`: Fetches all cart items associated with a specific user using their `userId`.
     - `PUT /update-cart`: Updates the quantity of a product in the cart.
     - `DELETE /:userId/:productId`: Deletes a product from the cart using both `userId` and `productId`.
  2. **Controller Integration**: Links each route to its corresponding controller function for handling business logic.
  3. **Express Router**: Uses Express Router to modularize and organize the routes, making the codebase cleaner and more maintainable.
  4. **Reusability**: The exported router can be mounted in the main application to handle shop-specific cart-related requests.
*/