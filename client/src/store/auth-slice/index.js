// Importing necessary utilities from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices
import axios from "axios"; // HTTP client for making API requests

// Initial state for the authentication slice
const initialState = {
  isAuthenticated: false, // Tracks whether the user is authenticated
  isLoading: true, // Tracks the loading state during asynchronous operations
  user: null, // Stores the user's details if authenticated
};

/**
 * Async Thunk: registerUser
 * Registers a new user by sending their details to the backend.
 *
 * @param {Object} formData - The user's registration details (e.g., username, email, password)
 */
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: loginUser
 * Logs in a user by sending their credentials to the backend.
 *
 * @param {Object} formData - The user's login credentials (e.g., email, password)
 */
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    {
      withCredentials: true, // Ensures cookies are sent with the request
    }
  );
  return response.data; // Return the data from the API response
});

/**
 * Async Thunk: logoutUser
 * Logs out the currently authenticated user by sending a request to the backend.
 */
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    {
      withCredentials: true, // Ensures cookies are sent with the request
    }
  );
  return response.data; // Return the data from the API response
});

/**
 * Async Thunk: checkAuth
 * Checks the authentication status of the user by verifying the session on the backend.
 */
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
    withCredentials: true, // Ensures cookies are sent with the request
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", // Prevents caching of the response
    },
  });
  return response.data; // Return the data from the API response
});

/**
 * Slice: authSlice
 * Manages the state related to user authentication, including registration, login, logout, and session verification.
 */
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state
  reducers: {
    /**
     * Reducer: setUser
     * Updates the user's details in the state. This can be used to manually set the user's details if needed.
     *
     * @param {Object} state - The current state
     * @param {Object} action - The action containing the user's details
     */
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Update authentication status based on the presence of user details
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle user registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Set loading state to true while registering
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after registration
        state.user = null; // Clear user details as registration does not log in the user
        state.isAuthenticated = false; // Ensure authentication status is false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false if registration fails
        state.user = null; // Clear user details
        state.isAuthenticated = false; // Ensure authentication status is false
      })

      // Handle user login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Set loading state to true while logging in
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false; // Set loading state to false after login
        state.user = action.payload.success ? action.payload.user : null; // Update user details if login is successful
        state.isAuthenticated = action.payload.success; // Update authentication status based on the login result
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false if login fails
        state.user = null; // Clear user details
        state.isAuthenticated = false; // Ensure authentication status is false
      })

      // Handle session verification
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true; // Set loading state to true while verifying the session
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after verification
        state.user = action.payload.success ? action.payload.user : null; // Update user details if the session is valid
        state.isAuthenticated = action.payload.success; // Update authentication status based on the verification result
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false if verification fails
        state.user = null; // Clear user details
        state.isAuthenticated = false; // Ensure authentication status is false
      })

      // Handle user logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after logout
        state.user = null; // Clear user details
        state.isAuthenticated = false; // Ensure authentication status is false
      });
  },
});

// Export actions and reducer
export const { setUser } = authSlice.actions;
export default authSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to user authentication in an application. It provides functionality for
 * registering, logging in, logging out, and verifying the authentication status of users. The slice uses Redux
 * Toolkit's `createAsyncThunk` for handling asynchronous API calls and `createSlice` for managing state and reducers.
 *
 * Key Features:
 * - **User Registration:** Allows users to register by sending their details to the backend.
 * - **User Login:** Authenticates users by sending their credentials to the backend and updating the state with
 *   their details.
 * - **Session Verification:** Checks the authentication status of the user by verifying the session on the backend.
 * - **User Logout:** Logs out the user by clearing their details and invalidating the session.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 * - **Manual User Update:** Provides a `setUser` action to manually update the user's details in the state.
 *
 * How It Works:
 * 1. The `registerUser` thunk is dispatched to register a new user. The user's details are sent to the backend,
 *    but the user is not automatically logged in after registration.
 * 2. The `loginUser` thunk is dispatched to authenticate a user. If successful, the user's details and authentication
 *    status are updated in the state.
 * 3. The `checkAuth` thunk is dispatched to verify the user's session when the application loads. If the session is
 *    valid, the user's details and authentication status are updated in the state.
 * 4. The `logoutUser` thunk is dispatched to log out the user by clearing their details and invalidating the session.
 * 5. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an authentication flow to manage user registration, login, logout, and session
 * verification. It ensures that the application has access to the user's authentication status and details, providing
 * a seamless user experience while maintaining robust state management.
 */