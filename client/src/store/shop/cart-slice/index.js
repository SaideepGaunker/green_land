// Importing necessary utilities from Redux Toolkit and Axios
import axios from "axios"; // HTTP client for making API requests
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices

// Initial state for the shopping cart slice
const initialState = {
  cartItems: [], // Stores the list of items in the cart
  isLoading: false, // Tracks the loading state during asynchronous operations
};

/**
 * Async Thunk: addToCart
 * Adds a product to the user's cart by sending the product details to the backend.
 *
 * @param {Object} payload - Contains the user ID, product ID, and quantity
 * @param {String} payload.userId - The ID of the user
 * @param {String} payload.productId - The ID of the product to be added
 * @param {Number} payload.quantity - The quantity of the product to be added
 */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: fetchCartItems
 * Fetches all items in the user's cart from the backend.
 *
 * @param {String} userId - The ID of the user whose cart is to be fetched
 */
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: deleteCartItem
 * Deletes a specific item from the user's cart by sending its ID to the backend.
 *
 * @param {Object} payload - Contains the user ID and product ID
 * @param {String} payload.userId - The ID of the user
 * @param {String} payload.productId - The ID of the product to be deleted
 */
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: updateCartQuantity
 * Updates the quantity of a specific item in the user's cart by sending the updated details to the backend.
 *
 * @param {Object} payload - Contains the user ID, product ID, and updated quantity
 * @param {String} payload.userId - The ID of the user
 * @param {String} payload.productId - The ID of the product to be updated
 * @param {Number} payload.quantity - The updated quantity of the product
 */
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Slice: shoppingCartSlice
 * Manages the state related to the shopping cart, including adding, fetching, updating, and deleting cart items.
 */
const shoppingCartSlice = createSlice({
  name: "shoppingCart", // Name of the slice
  initialState, // Initial state
  reducers: {}, // No additional reducers defined here
  extraReducers: (builder) => {
    builder
      // Handle adding an item to the cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true; // Set loading state to true while adding
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after adding
        state.cartItems = action.payload.data; // Update the list of cart items
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if adding fails
        state.cartItems = []; // Clear the list of cart items in case of an error
      })

      // Handle fetching cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.cartItems = action.payload.data; // Update the list of cart items
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.cartItems = []; // Clear the list of cart items in case of an error
      })

      // Handle updating the quantity of a cart item
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true; // Set loading state to true while updating
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after updating
        state.cartItems = action.payload.data; // Update the list of cart items
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if updating fails
        state.cartItems = []; // Clear the list of cart items in case of an error
      })

      // Handle deleting a cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true; // Set loading state to true while deleting
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after deleting
        state.cartItems = action.payload.data; // Update the list of cart items
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if deleting fails
        state.cartItems = []; // Clear the list of cart items in case of an error
      });
  },
});

// Export the reducer
export default shoppingCartSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to the shopping cart in an application. It provides functionality for
 * adding products to the cart, fetching the cart items, updating the quantity of items, and deleting items.
 * The slice uses Redux Toolkit's `createAsyncThunk` for handling asynchronous API calls and `createSlice` for
 * managing state and reducers.
 *
 * Key Features:
 * - **Adding Items:** Sends the details of a product to the backend to add it to the cart.
 * - **Fetching Items:** Retrieves all items in the user's cart from the backend and updates the state.
 * - **Updating Quantity:** Sends updated details of a product to the backend to modify its quantity in the cart.
 * - **Deleting Items:** Sends the ID of a product to the backend to remove it from the cart.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 *
 * How It Works:
 * 1. The `addToCart` thunk is dispatched to add a product to the cart. The backend processes the request and returns
 *    the updated list of cart items, which is stored in the state.
 * 2. The `fetchCartItems` thunk is dispatched to fetch all items in the user's cart. The fetched data is stored in
 *    the `cartItems` state.
 * 3. The `updateCartQuantity` thunk is dispatched to update the quantity of a specific item in the cart. The backend
 *    processes the request and returns the updated list of cart items.
 * 4. The `deleteCartItem` thunk is dispatched to delete a specific item from the cart. The backend processes the
 *    request and returns the updated list of cart items.
 * 5. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an e-commerce application to manage the shopping cart. It ensures that the
 * application has access to the latest list of cart items and provides seamless integration with the backend for
 * adding, updating, and deleting items.
 */