// This file defines the `AdminProductsSlice`, which manages the state and actions related to products in the admin dashboard.
// It uses Redux Toolkit's `createAsyncThunk` for asynchronous API calls and `createSlice` for state management.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing Redux Toolkit utilities.
import axios from "axios"; // Importing Axios for making HTTP requests.

// Initial State
const initialState = {
  isLoading: false, // Tracks whether an API call is in progress.
  productList: [], // Stores the list of products fetched from the server.
};

// Async Thunk for Adding a New Product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct", // Action type prefix.
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add", // Endpoint for adding a product.
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Specifies JSON content type.
        },
      }
    );
    return result?.data; // Returns the response data from the server.
  }
);

// Async Thunk for Fetching All Products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts", // Action type prefix.
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get" // Endpoint for fetching all products.
    );
    return result?.data; // Returns the response data from the server.
  }
);

// Async Thunk for Editing a Product
export const editProduct = createAsyncThunk(
  "/products/editProduct", // Action type prefix.
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`, // Endpoint for editing a product by ID.
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Specifies JSON content type.
        },
      }
    );
    return result?.data; // Returns the response data from the server.
  }
);

// Async Thunk for Deleting a Product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct", // Action type prefix.
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}` // Endpoint for deleting a product by ID.
    );
    return result?.data; // Returns the response data from the server.
  }
);

// Slice Definition
const AdminProductsSlice = createSlice({
  name: "adminProducts", // Slice name.
  initialState, // Initial state.
  reducers: {}, // No additional reducers defined here.
  extraReducers: (builder) => {
    // Handles asynchronous actions using `extraReducers`.
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        // When fetching products starts.
        state.isLoading = true; // Sets loading state to true.
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        // When fetching products succeeds.
        state.isLoading = false; // Sets loading state to false.
        state.productList = action.payload.data; // Updates the product list with the fetched data.
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        // When fetching products fails.
        state.isLoading = false; // Sets loading state to false.
        state.productList = []; // Resets the product list to an empty array.
      });
  },
});

export default AdminProductsSlice.reducer;

/* 
  Summary of the File's Purpose:
  This file defines the `AdminProductsSlice`, which manages the state and actions related to products in the admin dashboard. Key features include:
  1. **State Management**: Manages the loading state and product list using Redux Toolkit's `createSlice`.
  2. **Asynchronous Actions**:
     - `addNewProduct`: Adds a new product via a POST request.
     - `fetchAllProducts`: Fetches all products via a GET request.
     - `editProduct`: Edits an existing product via a PUT request.
     - `deleteProduct`: Deletes a product via a DELETE request.
  3. **API Integration**: Uses Axios to interact with the backend API for CRUD operations on products.
  4. **Loading State**: Tracks the loading state during API calls to provide feedback to the user.
  5. **Error Handling**: Resets the product list if fetching products fails.
  6. **Scalability**: The use of `createAsyncThunk` ensures that asynchronous logic is cleanly separated from the reducer logic.
*/