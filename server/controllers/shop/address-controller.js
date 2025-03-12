// This file defines controller functions for managing user addresses in the backend.
// It interacts with the `Address` model to perform CRUD operations on address data.

const Address = require("../../models/Address"); // Importing the `Address` model for database interactions.

// Controller to Add a New Address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body; // Extracts address details from the request body.
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newlyCreatedAddress.save(); // Saves the new address to the database.
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress, // Returns the newly created address.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Controller to Fetch All Addresses for a User
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params; // Extracts the user ID from the request parameters.
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required!",
      });
    }
    const addressList = await Address.find({ userId }); // Fetches all addresses associated with the user ID.
    res.status(200).json({
      success: true,
      data: addressList, // Returns the list of addresses.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Controller to Edit an Existing Address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // Extracts the user ID and address ID from the request parameters.
    const formData = req.body; // Extracts updated address details from the request body.
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address ID are required!",
      });
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true } // Ensures the updated address is returned.
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      data: address, // Returns the updated address.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Controller to Delete an Address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // Extracts the user ID and address ID from the request parameters.
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address ID are required!",
      });
    }
    const address = await Address.findOneAndDelete({ _id: addressId, userId }); // Deletes the address associated with the user ID and address ID.
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully", // Confirms the successful deletion.
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Exporting the Controller Functions
module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };

/* 
  Summary of the File's Purpose:
  This file defines controller functions for managing user addresses in the backend. Key features include:
  1. **Add Address**: Allows users to add a new address by validating input and saving it to the database.
  2. **Fetch All Addresses**: Retrieves all addresses associated with a specific user.
  3. **Edit Address**: Updates an existing address based on the provided user ID and address ID.
  4. **Delete Address**: Deletes an address based on the provided user ID and address ID.
  5. **Validation**: Includes checks to ensure required fields are provided and handles invalid or missing data gracefully.
  6. **Error Handling**: Provides robust error handling to log errors and return appropriate responses to the client.
*/