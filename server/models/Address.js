// This file defines the `Address` model using Mongoose, which represents the schema and structure of address data in the database.

const mongoose = require("mongoose"); // Importing Mongoose for MongoDB object modeling.

// Defining the Address Schema
const AddressSchema = new mongoose.Schema(
  {
    userId: String, // Stores the ID of the user associated with the address.
    address: String, // Stores the detailed address (e.g., street, apartment number).
    city: String, // Stores the city name.
    pincode: String, // Stores the postal or zip code.
    phone: String, // Stores the contact phone number.
    notes: String, // Stores additional notes or instructions for the address.
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields to track when the document was created and last updated.
);

// Exporting the Address Model
module.exports = mongoose.model("Address", AddressSchema);

/* 
  Summary of the File's Purpose:
  This file defines the `Address` model, which is used to manage address-related data in the database. Key features include:
  1. **Schema Definition**: Specifies the structure of address data, including fields like `userId`, `address`, `city`, `pincode`, `phone`, and `notes`.
  2. **Timestamps**: Automatically adds `createdAt` and `updatedAt` fields to each document for tracking creation and modification times.
  3. **Integration with MongoDB**: Uses Mongoose to define the schema and create a model that interacts with the MongoDB database.
  4. **Reusability**: The exported model can be reused across the application for CRUD operations related to addresses.
*/