const express = require("express");
const { searchProducts } = require("../../controllers/shop/search-controller");
const router = express.Router();

/**
 * Route: GET /:keyword
 * Searches for products based on the provided keyword by invoking the `searchProducts` controller function.
 */
router.get("/:keyword", searchProducts);

module.exports = router;

/**
 * Explanation of the Code:
 * This module defines a route for searching products in an Express.js application. It uses the `express.Router`
 * to organize and manage the route. Below is a detailed explanation of the route:
 *
 * 1. **GET /:keyword:**
 *    - Invokes the `searchProducts` controller function to handle the search operation.
 *    - The `:keyword` parameter in the URL represents the search term entered by the user.
 *    - This route is used to fetch products that match the provided keyword, enabling features like product search or filtering.
 *
 * The route is designed to be simple yet effective, allowing users to search for products dynamically based on their input.
 * It integrates seamlessly with the `searchProducts` controller function, ensuring efficient handling of search queries.
 */