const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");
const router = express.Router();

/**
 * Route: POST /create
 * Creates a new order by invoking the `createOrder` controller function.
 */
router.post("/create", createOrder);

/**
 * Route: POST /capture
 * Captures payment for an order by invoking the `capturePayment` controller function.
 */
router.post("/capture", capturePayment);

/**
 * Route: GET /list/:userId
 * Fetches all orders for a specific user by invoking the `getAllOrdersByUser` controller function.
 */
router.get("/list/:userId", getAllOrdersByUser);

/**
 * Route: GET /details/:id
 * Fetches detailed information about a specific order by invoking the `getOrderDetails` controller function.
 */
router.get("/details/:id", getOrderDetails);

module.exports = router;

/**
 * Explanation of the Code:
 * This module defines the routes for managing orders in an Express.js application. It uses the `express.Router`
 * to organize and manage these routes. Below is a detailed explanation of each route:
 *
 * 1. **POST /create:**
 *    - Invokes the `createOrder` controller function to handle the creation of a new order.
 *    - This route is used when a user completes a purchase, creating an order record in the database.
 *
 * 2. **POST /capture:**
 *    - Invokes the `capturePayment` controller function to handle the payment capture process.
 *    - This route is used to finalize or confirm the payment for an order, often integrating with payment gateways.
 *
 * 3. **GET /list/:userId:**
 *    - Invokes the `getAllOrdersByUser` controller function to fetch all orders associated with a specific user.
 *    - The `userId` parameter in the URL specifies the user whose orders are being retrieved.
 *    - This route is useful for displaying a user's order history.
 *
 * 4. **GET /details/:id:**
 *    - Invokes the `getOrderDetails` controller function to fetch detailed information about a specific order.
 *    - The `id` parameter in the URL specifies the order whose details are being retrieved.
 *    - This route is useful for viewing comprehensive details of an individual order, such as items, status, and payment information.
 *
 * The routes are designed to provide a modular and efficient way to manage orders, ensuring that operations such as
 * creating orders, capturing payments, listing orders, and fetching order details are handled seamlessly.
 */