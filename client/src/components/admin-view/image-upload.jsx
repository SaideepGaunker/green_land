// Import necessary icons from lucide-react for UI elements
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";

// Importing UI components for input fields, labels, buttons, and loading skeletons
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios"; // Axios for making HTTP requests
import { Skeleton } from "../ui/skeleton";

/**
 * ProductImageUpload Component:
 * ---------------------------------
 * This component allows users to upload an image for a product.
 * 
 * Features:
 * - Supports both file selection and drag-and-drop upload.
 * - Uploads the selected image to a server (Cloudinary).
 * - Displays a loading state while the image is being uploaded.
 * - Allows users to remove the uploaded image.
 *
 * Props:
 * - imageFile (File | null): Holds the currently selected image file.
 * - setImageFile (Function): Updates the image file state.
 * - imageLoadingState (Boolean): Indicates if the image is being uploaded.
 * - uploadedImageUrl (String | null): Stores the uploaded image URL.
 * - setUploadedImageUrl (Function): Updates the uploaded image URL.
 * - setImageLoadingState (Function): Manages the loading state during upload.
 * - isEditMode (Boolean): Disables input in edit mode.
 * - isCustomStyling (Boolean): Allows custom styling of the component.
 */

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  // useRef to reference the hidden file input field
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode"); // Debugging log

  /**
   * Handles file selection when the user chooses an image.
   */
  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files"); // Debugging log
    const selectedFile = event.target.files?.[0]; // Get the first selected file
    console.log(selectedFile); // Debugging log

    if (selectedFile) setImageFile(selectedFile); // Update image file state
  }

  /**
   * Prevents default behavior when a file is dragged over the drop area.
   */
  function handleDragOver(event) {
    event.preventDefault();
  }

  /**
   * Handles file drop event when an image is dragged and dropped.
   */
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0]; // Get the dropped file
    if (droppedFile) setImageFile(droppedFile); // Update image file state
  }

  /**
   * Removes the selected image and resets the input field.
   */
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  /**
   * Uploads the selected image to the server (Cloudinary) using Axios.
   * It updates the uploaded image URL state once the upload is successful.
   */
  async function uploadImageToCloudinary() {
    setImageLoadingState(true); // Set loading state to true
    const data = new FormData(); // Create FormData object to send file
    data.append("my_file", imageFile); // Append image file to FormData

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image", // API endpoint for image upload
      data
    );
    console.log(response, "response"); // Debugging log

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url); // Update uploaded image URL state
      setImageLoadingState(false); // Set loading state to false
    }
  }

  /**
   * useEffect Hook:
   * - Triggers image upload when a new image file is selected.
   */
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      {/* Label for the upload section */}
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      {/* Drag-and-drop area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        {/* Hidden file input for image upload */}
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode} // Disabled in edit mode
        />

        {/* Show upload prompt if no image is selected */}
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          /* Show loading skeleton while image is being uploaded */
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          /* Show uploaded file details with a remove option */
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground p-0 text-red"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Exporting the component to be used in other parts of the application
export default ProductImageUpload;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `ProductImageUpload` component provides an intuitive way for users to upload product images.
 * 
 * 1. **Image Upload Options:**
 *    - Users can either **select a file** from their device or **drag and drop** an image into the designated area.
 *    
 * 2. **Uploading Process:**
 *    - When an image is selected, it is automatically uploaded to the server (Cloudinary).
 *    - While uploading, a loading skeleton is displayed.
 *    
 * 3. **Removing an Image:**
 *    - Users can remove a selected image before it is uploaded.
 *    
 * 4. **Edit Mode Handling:**
 *    - In **edit mode**, the upload function is disabled to prevent unnecessary changes.
 *    
 * 5. **Technology Stack Used:**
 *    - **React Hooks** (`useEffect`, `useRef`) for state management and side effects.
 *    - **Redux Dispatch** to manage authentication.
 *    - **Axios** for HTTP requests to the backend.
 *    - **Lucide-react icons** for a modern UI.
 *    - **TailwindCSS** for styling.
 * 
 * This component ensures a **smooth, user-friendly, and visually appealing** image upload process.
 */
