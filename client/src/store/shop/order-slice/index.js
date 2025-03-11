// This file defines the `shoppingOrderSlice`, which manages the state and actions related to orders in the shopping application.
// It uses Redux Toolkit's `createAsyncThunk` for asynchronous API calls and `createSlice` for state management.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing Redux Toolkit utilities.
import axios from "axios"; // Importing Axios for making HTTP requests.

// Initial State
const initialState = {
  approvalURL: null, // Stores the PayPal approval URL for payment redirection.
  isLoading: false, // Tracks whether an API call is in progress.
  orderId: null, // Stores the ID of the created order.
  orderList: [], // Stores the list of orders fetched for a user.
  orderDetails: null, // Stores detailed information about a specific order.
};

// Async Thunk for Creating a New Order
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder", // Action type prefix.
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create", // Endpoint for creating a new order.
      orderData
    );
    return response.data; // Returns the response data from the server.
  }
);

// Async Thunk for Capturing Payment
export const capturePayment = createAsyncThunk(
  "/order/capturePayment", // Action type prefix.
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/capture", // Endpoint for capturing payment.
      {
        paymentId,
        payerId,
        orderId,
      }
    );
    return response.data; // Returns the response data from the server.
  }
);

// Async Thunk for Fetching All Orders by User ID
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId", // Action type prefix.
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/list/${userId}` // Endpoint for fetching all orders for a specific user.
    );
    return response.data; // Returns the response data from the server.
  }
);

// Async Thunk for Fetching Order Details by ID
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails", // Action type prefix.
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/details/${id}` // Endpoint for fetching details of a specific order.
    );
    return response.data; // Returns the response data from the server.
  }
);

// Slice Definition
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice", // Slice name.
  initialState, // Initial state.
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null; // Resets the order details to null.
    },
  },
  extraReducers: (builder) => {
    // Handles asynchronous actions using `extraReducers`.
    builder
      // Create New Order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true; // Sets loading state to true.
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false; // Sets loading state to false.
        state.approvalURL = action.payload.approvalURL; // Stores the PayPal approval URL.
        state.orderId = action.payload.orderId; // Stores the created order ID.
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        ); // Saves the order ID in session storage.
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false; // Sets loading state to false.
        state.approvalURL = null; // Resets the approval URL.
        state.orderId = null; // Resets the order ID.
      })

      // Get All Orders by User ID
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true; // Sets loading state to true.
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false; // Sets loading state to false.
        state.orderList = action.payload.data; // Updates the order list with the fetched data.
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false; // Sets loading state to false.
        state.orderList = []; // Resets the order list to an empty array.
      })

      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true; // Sets loading state to true.
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false; // Sets loading state to false.
        state.orderDetails = action.payload.data; // Updates the order details with the fetched data.
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false; // Sets loading state to false.
        state.orderDetails = null; // Resets the order details to null.
      });
  },
});

// Export Actions
export const { resetOrderDetails } = shoppingOrderSlice.actions;

// Export Reducer
export default shoppingOrderSlice.reducer;

/* 
  Summary of the File's Purpose:
  This file defines the `shoppingOrderSlice`, which manages the state and actions related to orders in the shopping application. Key features include:
  1. **State Management**: Manages the loading state, approval URL, order ID, order list, and order details using Redux Toolkit's `createSlice`.
  2. **Asynchronous Actions**:
     - `createNewOrder`: Creates a new order via a POST request.
     - `capturePayment`: Captures payment for an order via a POST request.
     - `getAllOrdersByUserId`: Fetches all orders for a specific user via a GET request.
     - `getOrderDetails`: Fetches detailed information about a specific order via a GET request.
  3. **API Integration**: Uses Axios to interact with the backend API for CRUD operations on orders.
  4. **Loading State**: Tracks the loading state during API calls to provide feedback to the user.
  5. **Error Handling**: Resets relevant state properties if an API call fails.
  6. **Session Storage**: Saves the order ID in session storage after creating a new order for persistence.
  7. **Scalability**: The use of `createAsyncThunk` ensures that asynchronous logic is cleanly separated from the reducer logic.
*/