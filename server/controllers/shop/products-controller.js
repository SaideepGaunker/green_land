// This file defines controller functions for managing product-related operations in the backend.
// It interacts with the `Product` model to fetch filtered products and retrieve detailed information about a specific product.

const Product = require("../../models/Product"); // Importing the `Product` model for database interactions.

// Controller to Fetch Filtered Products
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], need = [], sortBy = "price-lowtohigh" } = req.query; // Extracts query parameters for filtering and sorting.
    let filters = {}; // Initializes an empty filter object.

    // Applying category filter if provided
    if (category.length) {
      filters.category = { $in: category.split(",") }; // Filters products by category using MongoDB's `$in` operator.
    }

    // Applying need filter if provided
    if (need.length) {
      filters.need = { $in: need.split(",") }; // Filters products by need using MongoDB's `$in` operator.
    }

    // Defining sort order based on the `sortBy` parameter
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1; // Sorts products by price in ascending order.
        break;
      case "price-hightolow":
        sort.price = -1; // Sorts products by price in descending order.
        break;
      case "title-atoz":
        sort.title = 1; // Sorts products by title in ascending order (A-Z).
        break;
      case "title-ztoa":
        sort.title = -1; // Sorts products by title in descending order (Z-A).
        break;
      default:
        sort.price = 1; // Default sorting by price in ascending order.
        break;
    }

    // Fetching products from the database based on filters and sort order
    const products = await Product.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: products, // Returns the list of filtered and sorted products.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Controller to Fetch Details of a Specific Product
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the product ID from the request parameters.
    const product = await Product.findById(id); // Fetches the product by its ID from the database.
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!", // Returns a 404 response if the product does not exist.
      });
    res.status(200).json({
      success: true,
      data: product, // Returns the product details.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Exporting the Controller Functions
module.exports = { getFilteredProducts, getProductDetails };

/* 
  Summary of the File's Purpose:
  This file defines controller functions for managing product-related operations in the backend. Key features include:
  1. **Fetch Filtered Products**: Retrieves products based on filters (category, need) and sorts them according to the specified criteria (price, title).
  2. **Fetch Product Details**: Retrieves detailed information about a specific product using its ID.
  3. **Filtering and Sorting**: Supports dynamic filtering by category and need, as well as sorting by price or title in ascending or descending order.
  4. **Error Handling**: Includes robust error handling to log errors and return appropriate responses to the client.
  5. **Integration with Database**: Uses the `Product` model to interact with the database for fetching filtered and detailed product data.
*/