// This file defines the `reviewSlice`, which manages the state and actions related to product reviews in the shopping application.
// It uses Redux Toolkit's `createAsyncThunk` for asynchronous API calls and `createSlice` for state management.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importing Redux Toolkit utilities.
import axios from "axios"; // Importing Axios for making HTTP requests.

// Initial State
const initialState = {
  isLoading: false, // Tracks whether an API call is in progress.
  reviews: [], // Stores the list of reviews fetched for a product.
};

// Async Thunk for Adding a New Review
export const addReview = createAsyncThunk(
  "/order/addReview", // Action type prefix.
  async (formData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`, // Endpoint for adding a new review.
      formData
    );
    return response.data; // Returns the response data from the server.
  }
);

// Async Thunk for Fetching Reviews by Product ID
export const getReviews = createAsyncThunk(
  "/order/getReviews", // Action type prefix.
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}` // Endpoint for fetching reviews for a specific product.
    );
    return response.data; // Returns the response data from the server.
  }
);

// Slice Definition
const reviewSlice = createSlice({
  name: "reviewSlice", // Slice name.
  initialState, // Initial state.
  reducers: {}, // No additional reducers defined here.
  extraReducers: (builder) => {
    // Handles asynchronous actions using `extraReducers`.
    builder
      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true; // Sets loading state to true.
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false; // Sets loading state to false.
        state.reviews = action.payload.data; // Updates the reviews list with the fetched data.
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false; // Sets loading state to false.
        state.reviews = []; // Resets the reviews list to an empty array.
      });
  },
});

// Export Reducer
export default reviewSlice.reducer;

/* 
  Summary of the File's Purpose:
  This file defines the `reviewSlice`, which manages the state and actions related to product reviews in the shopping application. Key features include:
  1. **State Management**: Manages the loading state and reviews list using Redux Toolkit's `createSlice`.
  2. **Asynchronous Actions**:
     - `addReview`: Adds a new review via a POST request.
     - `getReviews`: Fetches reviews for a specific product via a GET request.
  3. **API Integration**: Uses Axios to interact with the backend API for CRUD operations on reviews.
  4. **Loading State**: Tracks the loading state during API calls to provide feedback to the user.
  5. **Error Handling**: Resets the reviews list if fetching reviews fails.
  6. **Scalability**: The use of `createAsyncThunk` ensures that asynchronous logic is cleanly separated from the reducer logic.
*/