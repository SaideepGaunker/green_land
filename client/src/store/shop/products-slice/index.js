// Importing necessary utilities from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices
import axios from "axios"; // HTTP client for making API requests

// Initial state for the shopping product slice
const initialState = {
  isLoading: false, // Tracks the loading state during asynchronous operations
  productList: [], // Stores the list of products fetched from the backend
  productDetails: null, // Stores detailed information about a specific product
};

/**
 * Async Thunk: fetchAllFilteredProducts
 * Fetches a filtered and sorted list of products based on the provided filter and sort parameters.
 *
 * @param {Object} payload - Contains the filter and sort parameters
 * @param {Object} payload.filterParams - The filter criteria (e.g., category, price range)
 * @param {String} payload.sortParams - The sorting criteria (e.g., price-lowtohigh, price-hightolow)
 */
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    console.log(result);
    return result?.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: fetchProductDetails
 * Fetches detailed information about a specific product by its ID.
 *
 * @param {String} id - The ID of the product to fetch details for
 */
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );
    return result?.data; // Return the data from the API response
  }
);

/**
 * Slice: shoppingProductSlice
 * Manages the state related to products in the shopping section, including fetching filtered products and product details.
 */
const shoppingProductSlice = createSlice({
  name: "shoppingProducts", // Name of the slice
  initialState, // Initial state
  reducers: {
    /**
     * Reducer: setProductDetails
     * Resets the product details state to `null`.
     */
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching filtered products
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.productList = action.payload.data; // Update the list of products
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.productList = []; // Clear the list of products in case of an error
      })

      // Handle fetching product details
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.productDetails = action.payload.data; // Update the product details
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.productDetails = null; // Clear the product details in case of an error
      });
  },
});

// Export actions and reducer
export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to products in the shopping section of an application. It provides functionality
 * for fetching a filtered and sorted list of products, as well as detailed information about a specific product. The
 * slice uses Redux Toolkit's `createAsyncThunk` for handling asynchronous API calls and `createSlice` for managing
 * state and reducers.
 *
 * Key Features:
 * - **Fetching Filtered Products:** Retrieves a list of products based on filter and sort parameters and updates the state.
 * - **Fetching Product Details:** Retrieves detailed information about a specific product and updates the state.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 * - **Resetting Product Details:** Provides a `setProductDetails` action to reset the product details state to `null`.
 *
 * How It Works:
 * 1. The `fetchAllFilteredProducts` thunk is dispatched to fetch a filtered and sorted list of products. The fetched data
 *    is stored in the `productList` state.
 * 2. The `fetchProductDetails` thunk is dispatched to fetch detailed information about a specific product. The fetched
 *    data is stored in the `productDetails` state.
 * 3. The `setProductDetails` action is used to reset the `productDetails` state to `null` when needed.
 * 4. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an e-commerce application to manage the display of products and their details. It
 * ensures that the application has access to the latest list of products and detailed information, providing a seamless
 * user experience while maintaining robust state management.
 */