// Importing necessary utilities from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Redux Toolkit utilities for creating async thunks and slices
import axios from "axios"; // HTTP client for making API requests

// Initial state for the common slice
const initialState = {
  isLoading: false, // Tracks the loading state during asynchronous operations
  featureImageList: [], // Stores the list of featured images
};

/**
 * Async Thunk: getFeatureImages
 * Fetches the list of featured images from the backend.
 */
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: addFeatureImage
 * Adds a new featured image by sending its URL to the backend.
 *
 * @param {String} image - The URL of the image to be added as a featured image
 */
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data; // Return the data from the API response
  }
);

/**
 * Async Thunk: deleteFeatureImage
 * Deletes a featured image by sending its ID to the backend.
 *
 * @param {String} id - The ID of the featured image to be deleted
 */
export const deleteFeatureImage = createAsyncThunk(
  "/featureImages/deleteFeatureImage",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${id}`
    );
    return result?.data; // Return the data from the API response
  }
);

/**
 * Slice: commonSlice
 * Manages the state related to featured images, including fetching, adding, and deleting images.
 */
const commonSlice = createSlice({
  name: "commonSlice", // Name of the slice
  initialState, // Initial state
  reducers: {}, // No additional reducers defined here
  extraReducers: (builder) => {
    builder
      // Handle fetching featured images
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true; // Set loading state to true while fetching
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false after fetching
        state.featureImageList = action.payload.data; // Update the list of featured images
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false; // Set loading state to false if fetching fails
        state.featureImageList = []; // Clear the list of featured images in case of an error
      })

      // Handle adding a featured image
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList.push(action.payload.data); // Add the new image to the list
      })

      // Handle deleting a featured image
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.meta.arg // Remove the deleted image from the list
        );
      });
  },
});

// Export the reducer
export default commonSlice.reducer;

/**
 * Explanation of the Code:
 * This slice manages the state related to featured images in an application. It provides functionality for
 * fetching the list of featured images, adding new images, and deleting existing ones. The slice uses Redux
 * Toolkit's `createAsyncThunk` for handling asynchronous API calls and `createSlice` for managing state and reducers.
 *
 * Key Features:
 * - **Fetching Featured Images:** Retrieves the list of featured images from the backend and updates the state.
 * - **Adding Featured Images:** Sends the URL of a new image to the backend and adds it to the list in the state.
 * - **Deleting Featured Images:** Sends the ID of an image to the backend for deletion and removes it from the list in the state.
 * - **Loading State:** Tracks the loading state for asynchronous operations to provide feedback to the user.
 *
 * How It Works:
 * 1. The `getFeatureImages` thunk is dispatched to fetch the list of featured images from the backend. The fetched
 *    data is stored in the `featureImageList` state.
 * 2. The `addFeatureImage` thunk is dispatched to add a new featured image. The new image is appended to the
 *    `featureImageList` state upon successful addition.
 * 3. The `deleteFeatureImage` thunk is dispatched to delete a featured image. The image is removed from the
 *    `featureImageList` state upon successful deletion.
 * 4. The `extraReducers` handle the loading state and update the state based on the success or failure of the
 *    asynchronous operations.
 *
 * Usage:
 * This slice is typically used in an admin dashboard or content management system to manage featured images.
 * It ensures that the application has access to the latest list of featured images and provides seamless integration
 * with the backend for adding and deleting images.
 */