// Importing necessary utilities from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices
import axios from "axios"; // HTTP client for making API requests

// Initial state for the admin order slice
const initialState = {
  orderList: [], // List of all orders fetched for the admin
  orderDetails: null, // Detailed information about a specific order
  isLoading: false, // Loading state for asynchronous operations
};

/**
 * Async Thunk: getAllOrdersForAdmin
 * Fetches all orders for the admin from the backend API.
 */
export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: getOrderDetailsForAdmin
 * Fetches detailed information about a specific order for the admin.
 *
 * @param {String} id - The ID of the order to fetch details for
 */
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: updateOrderStatus
 * Updates the status of a specific order in the backend.
 *
 * @param {Object} payload - Contains the order ID and the new status
 * @param {String} payload.id - The ID of the order to update
 * @param {String} payload.orderStatus - The new status for the order
 */
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Slice: adminOrderSlice
 * Manages the state related to admin orders, including fetching orders, fetching order details,
 * and updating order statuses.
 */
const adminOrderSlice = createSlice({
  name: "adminOrderSlice", // Name of the slice
  initialState, // Initial state
  reducers: {
    /**
     * Reducer: resetOrderDetails
     * Resets the order details state to `null`.
     */
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching all orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.orderList = action.payload.data; // Update the order list with the fetched data
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.orderList = []; // Clear the order list in case of an error
      })

      // Handle fetching order details
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.orderDetails = action.payload.data; // Update the order details with the fetched data
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.orderDetails = null; // Clear the order details in case of an error
      });
  },
});

// Export actions and reducer
export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to admin orders in an e-commerce application. It provides functionality
 * to fetch all orders, fetch detailed information about a specific order, and update the status of an order.
 * The slice uses Redux Toolkit's `createAsyncThunk` for handling asynchronous API calls and `createSlice` for
 * managing state and reducers.
 *
 * Key Features:
 * - **Fetching All Orders:** The `getAllOrdersForAdmin` thunk fetches all orders for the admin and updates the
 *   `orderList` state.
 * - **Fetching Order Details:** The `getOrderDetailsForAdmin` thunk fetches detailed information about a specific
 *   order and updates the `orderDetails` state.
 * - **Updating Order Status:** The `updateOrderStatus` thunk updates the status of a specific order in the backend.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 * - **Resetting Order Details:** Provides a `resetOrderDetails` action to clear the `orderDetails` state when needed.
 *
 * How It Works:
 * 1. The `getAllOrdersForAdmin` thunk is dispatched to fetch all orders for the admin. The fetched data is stored
 *    in the `orderList` state.
 * 2. The `getOrderDetailsForAdmin` thunk is dispatched to fetch detailed information about a specific order. The
 *    fetched data is stored in the `orderDetails` state.
 * 3. The `updateOrderStatus` thunk is dispatched to update the status of a specific order in the backend.
 * 4. The `resetOrderDetails` action is used to reset the `orderDetails` state to `null` when needed.
 * 5. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an admin dashboard to manage orders. It ensures that the admin has access to
 * all orders, can view detailed information about specific orders, and can update the status of orders. It
 * integrates seamlessly with Redux for state management and Axios for API communication.
 */