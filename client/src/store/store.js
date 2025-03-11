// This file defines the Redux store for the application using Redux Toolkit's `configureStore`.
// It combines all the reducers from different slices to manage the global state of the application.

import { configureStore } from "@reduxjs/toolkit"; // Importing `configureStore` from Redux Toolkit.
import authReducer from "./auth-slice"; // Importing the reducer for authentication-related state.
import adminProductsSlice from "./admin/products-slice"; // Importing the reducer for admin product management.
import adminOrderSlice from "./admin/order-slice"; // Importing the reducer for admin order management.
import shopProductsSlice from "./shop/products-slice"; // Importing the reducer for shop product management.
import shopCartSlice from "./shop/cart-slice"; // Importing the reducer for shopping cart management.
import shopAddressSlice from "./shop/address-slice"; // Importing the reducer for user address management.
import shopOrderSlice from "./shop/order-slice"; // Importing the reducer for shop order management.
import shopSearchSlice from "./shop/search-slice"; // Importing the reducer for search functionality.
import shopReviewSlice from "./shop/review-slice"; // Importing the reducer for product reviews.
import commonFeatureSlice from "./common-slice"; // Importing the reducer for common features like featured images.

// Configuring the Redux Store
const store = configureStore({
  reducer: {
    auth: authReducer, // Manages authentication-related state.
    adminProducts: adminProductsSlice, // Manages admin product-related state.
    adminOrder: adminOrderSlice, // Manages admin order-related state.
    shopProducts: shopProductsSlice, // Manages shop product-related state.
    shopCart: shopCartSlice, // Manages shopping cart-related state.
    shopAddress: shopAddressSlice, // Manages user address-related state.
    shopOrder: shopOrderSlice, // Manages shop order-related state.
    shopSearch: shopSearchSlice, // Manages search-related state.
    shopReview: shopReviewSlice, // Manages product review-related state.
    commonFeature: commonFeatureSlice, // Manages common feature-related state (e.g., featured images).
  },
});

// Export the configured Redux store
export default store;

/* 
  Summary of the File's Purpose:
  This file defines the Redux store for the application, which serves as the central hub for managing the global state. Key features include:
  1. **State Management**: Combines multiple reducers into a single store to manage different parts of the application state.
     - `auth`: Handles authentication-related state.
     - `adminProducts`: Manages admin product-related state.
     - `adminOrder`: Manages admin order-related state.
     - `shopProducts`: Handles shop product-related state.
     - `shopCart`: Manages shopping cart-related state.
     - `shopAddress`: Handles user address-related state.
     - `shopOrder`: Manages shop order-related state.
     - `shopSearch`: Handles search-related state.
     - `shopReview`: Manages product review-related state.
     - `commonFeature`: Manages common feature-related state (e.g., featured images).
  2. **Scalability**: The use of `configureStore` simplifies the process of combining reducers and setting up middleware like Redux DevTools.
  3. **Centralized State**: Provides a centralized location for managing the application's global state, making it easier to maintain and debug.
*/