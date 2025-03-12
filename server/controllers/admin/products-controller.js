const { imageUploadUtil } = require("../../helpers/cloudinary"); // Utility for uploading images to Cloudinary
const Product = require("../../models/Product"); // Mongoose model for the Product schema

/**
 * Controller: handleImageUpload
 * Handles the upload of an image file to Cloudinary and returns the uploaded image's URL.
 *
 * @param {Object} req - The request object containing the file in `req.file`
 * @param {Object} res - The response object used to send back the result
 */
const handleImageUpload = async (req, res) => {
  try {
    // Convert the file buffer to a base64 string
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload the image to Cloudinary using the helper function
    const result = await imageUploadUtil(url);

    // Respond with success and the result from Cloudinary
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

/**
 * Controller: addProduct
 * Adds a new product to the database.
 *
 * @param {Object} req - The request object containing product details in `req.body`
 * @param {Object} res - The response object used to send back the result
 */
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      need,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    // Create a new product instance
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      need,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    // Save the product to the database
    await newlyCreatedProduct.save();

    // Respond with success and the newly created product
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

/**
 * Controller: fetchAllProducts
 * Fetches all products from the database.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to send back the list of products
 */
const fetchAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const listOfProducts = await Product.find({});

    // Respond with success and the list of products
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

/**
 * Controller: editProduct
 * Edits an existing product in the database.
 *
 * @param {Object} req - The request object containing the product ID in `req.params` and updated details in `req.body`
 * @param {Object} res - The response object used to send back the result
 */
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      need,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Find the product by ID
    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Update the product fields if provided, otherwise keep the existing values
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.need = need || findProduct.need;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Save the updated product to the database
    await findProduct.save();

    // Respond with success and the updated product
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

/**
 * Controller: deleteProduct
 * Deletes a product from the database.
 *
 * @param {Object} req - The request object containing the product ID in `req.params`
 * @param {Object} res - The response object used to send back the result
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Respond with success and a confirmation message
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Export all controller functions
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};


// Explanation of the Code:
// This module contains a set of controller functions for managing products in an e-commerce application. It includes functionality for handling image uploads, adding new products, fetching all products, editing existing products, and deleting products. Below is a breakdown of each function and its purpose:

// Key Features:
// handleImageUpload:
// Converts an uploaded file into a base64 string and uploads it to Cloudinary using the imageUploadUtil helper.
// Returns the uploaded image's URL in the response.
// addProduct:
// Creates a new product in the database using the Product model.
// Accepts product details (e.g., image, title, price) from the request body and saves them to the database.
// fetchAllProducts:
// Fetches all products from the database using the Product.find() method.
// Returns the list of products in the response.
// editProduct:
// Updates an existing product in the database.
// Accepts the product ID from the request parameters and updated details from the request body.
// Ensures that only provided fields are updated, while others retain their existing values.
// deleteProduct:
// Deletes a product from the database using the Product.findByIdAndDelete() method.
// Returns a success message if the deletion is successful.
// How It Works:
// Image Upload:
// The handleImageUpload function processes the uploaded file, converts it to base64, and uploads it to Cloudinary.
// The resulting URL is returned to the client for use in the product details.
// Adding Products:
// The addProduct function creates a new product document in the database using the Product model.
// It validates and saves the product details provided in the request body.
// Fetching Products:
// The fetchAllProducts function retrieves all products from the database and sends them back as a JSON response.
// Editing Products:
// The editProduct function finds the product by its ID and updates its fields based on the provided data.
// If a field is not provided, it retains its existing value.
// Deleting Products:
// The deleteProduct function deletes the product with the specified ID from the database.
// If the product is not found, it responds with a 404 error