// Importing necessary utilities from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices
import axios from "axios"; // HTTP client for making API requests

// Initial state for the search slice
const initialState = {
  isLoading: false, // Tracks the loading state during asynchronous operations
  searchResults: [], // Stores the list of search results
};

/**
 * Async Thunk: getSearchResults
 * Fetches search results based on the provided keyword by sending a request to the backend.
 *
 * @param {String} keyword - The search keyword entered by the user
 */
export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/search/${keyword}`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Slice: searchSlice
 * Manages the state related to search functionality, including fetching search results and resetting them.
 */
const searchSlice = createSlice({
  name: "searchSlice", // Name of the slice
  initialState, // Initial state
  reducers: {
    /**
     * Reducer: resetSearchResults
     * Resets the search results state to an empty array.
     */
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching search results
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.searchResults = action.payload.data; // Update the search results
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.searchResults = []; // Clear the search results in case of an error
      });
  },
});

// Export actions and reducer
export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to search functionality in an application. It provides functionality for
 * fetching search results based on a keyword and resetting the search results. The slice uses Redux Toolkit's
 * `createAsyncThunk` for handling asynchronous API calls and `createSlice` for managing state and reducers.
 *
 * Key Features:
 * - **Fetching Search Results:** Retrieves search results based on the provided keyword and updates the state.
 * - **Resetting Search Results:** Provides a `resetSearchResults` action to clear the search results when needed.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 *
 * How It Works:
 * 1. The `getSearchResults` thunk is dispatched to fetch search results based on the provided keyword. The fetched
 *    data is stored in the `searchResults` state.
 * 2. The `resetSearchResults` action is used to reset the `searchResults` state to an empty array when needed.
 * 3. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an e-commerce or content management system to manage search functionality. It
 * ensures that the application has access to the latest search results and provides seamless integration with the
 * backend for fetching and resetting search results.
 */