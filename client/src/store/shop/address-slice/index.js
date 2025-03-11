// Importing necessary utilities from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices
import axios from "axios"; // HTTP client for making API requests

// Initial state for the address slice
const initialState = {
  isLoading: false, // Tracks the loading state during asynchronous operations
  addressList: [], // Stores the list of addresses
};

/**
 * Async Thunk: addNewAddress
 * Adds a new address by sending the form data to the backend.
 *
 * @param {Object} formData - The details of the new address to be added
 */
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: fetchAllAddresses
 * Fetches all addresses associated with a specific user from the backend.
 *
 * @param {String} userId - The ID of the user whose addresses are to be fetched
 */
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: editaAddress
 * Updates an existing address by sending the updated form data to the backend.
 *
 * @param {Object} payload - Contains the user ID, address ID, and updated form data
 * @param {String} payload.userId - The ID of the user
 * @param {String} payload.addressId - The ID of the address to be updated
 * @param {Object} payload.formData - The updated details of the address
 */
export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: deleteAddress
 * Deletes an existing address by sending its ID to the backend.
 *
 * @param {Object} payload - Contains the user ID and address ID
 * @param {String} payload.userId - The ID of the user
 * @param {String} payload.addressId - The ID of the address to be deleted
 */
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Slice: addressSlice
 * Manages the state related to user addresses, including fetching, adding, editing, and deleting addresses.
 */
const addressSlice = createSlice({
  name: "address", // Name of the slice
  initialState, // Initial state
  reducers: {}, // No additional reducers defined here
  extraReducers: (builder) => {
    builder
      // Handle adding a new address
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true; // Set loading state to true while adding
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after adding
        // Optionally, you can update the address list here if needed
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if adding fails
      })

      // Handle fetching all addresses
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.addressList = action.payload.data; // Update the list of addresses
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.addressList = []; // Clear the list of addresses in case of an error
      });
  },
});

// Export the reducer
export default addressSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to user addresses in an application. It provides functionality for
 * fetching, adding, editing, and deleting addresses. The slice uses Redux Toolkit's `createAsyncThunk` for
 * handling asynchronous API calls and `createSlice` for managing state and reducers.
 *
 * Key Features:
 * - **Fetching Addresses:** Retrieves all addresses associated with a specific user from the backend and updates the state.
 * - **Adding Addresses:** Sends the details of a new address to the backend and updates the state upon successful addition.
 * - **Editing Addresses:** Sends updated details of an existing address to the backend for modification.
 * - **Deleting Addresses:** Sends the ID of an address to the backend for deletion.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 *
 * How It Works:
 * 1. The `fetchAllAddresses` thunk is dispatched to fetch all addresses for a specific user. The fetched data is stored
 *    in the `addressList` state.
 * 2. The `addNewAddress` thunk is dispatched to add a new address. The loading state is updated accordingly.
 * 3. The `editaAddress` thunk is dispatched to update an existing address. The backend processes the update request.
 * 4. The `deleteAddress` thunk is dispatched to delete an existing address. The backend processes the deletion request.
 * 5. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an e-commerce or user profile management system to manage user addresses. It ensures
 * that the application has access to the latest list of addresses and provides seamless integration with the backend
 * for adding, editing, and deleting addresses.
 */