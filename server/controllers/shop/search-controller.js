// This file defines a controller function for searching products in the backend.
// It interacts with the `Product` model to fetch products based on a search keyword.

const Product = require("../../models/Product"); // Importing the `Product` model for database interactions.

// Controller to Search Products
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params; // Extracts the search keyword from the request parameters.

    // Validation: Ensures the keyword is provided and is a string
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Creating a case-insensitive regular expression for the search keyword
    const regEx = new RegExp(keyword, "i");

    // Defining the search query to match the keyword in multiple fields
    const createSearchQuery = {
      $or: [
        { title: regEx }, // Matches the keyword in the product title.
        { description: regEx }, // Matches the keyword in the product description.
        { category: regEx }, // Matches the keyword in the product category.
        { need: regEx }, // Matches the keyword in the product need.
      ],
    };

    // Fetching products that match the search query
    const searchResults = await Product.find(createSearchQuery);

    // Returning the search results
    res.status(200).json({
      success: true,
      data: searchResults, // Returns the list of products matching the search criteria.
    });
  } catch (error) {
    console.log(error); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Exporting the Controller Function
module.exports = { searchProducts };

/* 
  Summary of the File's Purpose:
  This file defines a controller function for searching products in the backend. Key features include:
  1. **Search by Keyword**: Allows users to search for products by providing a keyword.
  2. **Case-Insensitive Matching**: Uses a regular expression to perform case-insensitive matching of the keyword across multiple fields (title, description, category, need).
  3. **Validation**: Ensures the search keyword is provided and is in string format before proceeding with the search.
  4. **Error Handling**: Includes robust error handling to log errors and return appropriate responses to the client.
  5. **Integration with Database**: Uses the `Product` model to interact with the database and fetch products matching the search criteria.
*/