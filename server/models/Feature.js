// This file defines the `Feature` model using Mongoose, which represents the schema and structure of featured image data in the database.

const mongoose = require("mongoose"); // Importing Mongoose for MongoDB object modeling.

// Defining the Feature Schema
const FeatureSchema = new mongoose.Schema(
  {
    image: String, // Stores the URL or path of the featured image.
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields to track when the document was created and last updated.
);

// Exporting the Feature Model
module.exports = mongoose.model("Feature", FeatureSchema);

/* 
  Summary of the File's Purpose:
  This file defines the `Feature` model, which is used to manage featured image data in the database. Key features include:
  1. **Schema Definition**: Specifies the structure of featured image data, with a single field `image` to store the URL or path of the image.
  2. **Timestamps**: Automatically adds `createdAt` and `updatedAt` fields to each document for tracking creation and modification times.
  3. **Integration with MongoDB**: Uses Mongoose to define the schema and create a model that interacts with the MongoDB database.
  4. **Reusability**: The exported model can be reused across the application for CRUD operations related to featured images.
*/