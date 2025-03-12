// This file defines the `Product` model using Mongoose, which represents the schema and structure of product data in the database.

const mongoose = require("mongoose"); // Importing Mongoose for MongoDB object modeling.

// Defining the Product Schema
const ProductSchema = new mongoose.Schema(
  {
    image: String, // Stores the URL or path of the product image.
    title: String, // Stores the name or title of the product.
    description: String, // Stores a detailed description of the product.
    category: String, // Stores the category to which the product belongs (e.g., "Electronics", "Clothing").
    need: String, // Stores the specific need or use case for the product (e.g., "Home Decor", "Outdoor").
    price: Number, // Stores the original price of the product.
    salePrice: Number, // Stores the discounted price of the product, if applicable.
    totalStock: Number, // Stores the total available stock of the product.
    averageReview: Number, // Stores the average review rating of the product.
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields to track when the document was created and last updated.
);

// Exporting the Product Model
module.exports = mongoose.model("Product", ProductSchema);

/* 
  Summary of the File's Purpose:
  This file defines the `Product` model, which is used to manage product-related data in the database. Key features include:
  1. **Schema Definition**: Specifies the structure of product data, including fields like `image`, `title`, `description`, `category`, `need`, `price`, `salePrice`, `totalStock`, and `averageReview`.
  2. **Timestamps**: Automatically adds `createdAt` and `updatedAt` fields to each document for tracking creation and modification times.
  3. **Integration with MongoDB**: Uses Mongoose to define the schema and create a model that interacts with the MongoDB database.
  4. **Reusability**: The exported model can be reused across the application for CRUD operations related to products.
*/