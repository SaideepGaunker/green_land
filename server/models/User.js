// This file defines the `User` model using Mongoose, which represents the schema and structure of user data in the database.

const mongoose = require("mongoose"); // Importing Mongoose for MongoDB object modeling.

// Defining the User Schema
const UserSchema = new mongoose.Schema({
  userName: {
    type: String, // Stores the username of the user.
    required: true, // Ensures the username is mandatory.
    unique: true, // Ensures the username is unique across all users.
  },
  email: {
    type: String, // Stores the email address of the user.
    required: true, // Ensures the email is mandatory.
    unique: true, // Ensures the email is unique across all users.
  },
  password: {
    type: String, // Stores the hashed password of the user.
    required: true, // Ensures the password is mandatory.
  },
  role: {
    type: String, // Stores the role of the user (e.g., "user", "admin").
    default: "user", // Sets the default role to "user" if not provided.
  },
});

// Creating the User Model
const User = mongoose.model("User", UserSchema);

// Exporting the User Model
module.exports = User;

/* 
  Summary of the File's Purpose:
  This file defines the `User` model, which is used to manage user-related data in the database. Key features include:
  1. **Schema Definition**: Specifies the structure of user data, including fields like `userName`, `email`, `password`, and `role`.
     - `userName`: A unique and required field for the user's username.
     - `email`: A unique and required field for the user's email address.
     - `password`: A required field for storing the user's hashed password.
     - `role`: An optional field with a default value of "user" to define the user's role (e.g., "user" or "admin").
  2. **Validation**: Ensures that critical fields (`userName`, `email`, `password`) are mandatory and unique where applicable.
  3. **Integration with MongoDB**: Uses Mongoose to define the schema and create a model that interacts with the MongoDB database.
  4. **Reusability**: The exported model can be reused across the application for CRUD operations related to users.
*/