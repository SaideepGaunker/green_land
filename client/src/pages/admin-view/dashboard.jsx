// Importing necessary components and actions
import ProductImageUpload from "@/components/admin-view/image-upload"; // Custom image upload component
import { Button } from "@/components/ui/button"; // Custom button component
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice"; // Redux actions for managing featured images
import { useEffect, useState } from "react"; // React hooks for state and side effects
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management

/**
 * Component: AdminDashboard
 * This component provides an interface for administrators to upload, view, and delete featured images.
 * It includes functionality for uploading new images, displaying a list of existing featured images,
 * and deleting specific images.
 */
function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store the URL of the uploaded image
  const [imageLoadingState, setImageLoadingState] = useState(false); // State to track image upload progress
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const { featureImageList } = useSelector((state) => state.commonFeature); // Fetch the list of featured images from Redux state

  console.log(uploadedImageUrl, "uploadedImageUrl");

  /**
   * Function: handleUploadFeatureImage
   * Handles the process of uploading a new featured image. Dispatches the `addFeatureImage` action
   * with the uploaded image URL and refreshes the list of featured images upon success.
   */
  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Refresh the list of featured images
        setImageFile(null); // Reset the selected image file
        setUploadedImageUrl(""); // Clear the uploaded image URL
      }
    });
  }

  /**
   * Function: handleDeleteFeatureImage
   * Handles the deletion of a specific featured image. Dispatches the `deleteFeatureImage` action
   * with the image ID and refreshes the list of featured images upon success.
   *
   * @param {String} imageId - The ID of the image to be deleted
   */
  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Refresh the list of featured images
      }
    });
  }

  // Fetch the list of featured images when the component mounts
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      {/* Image Upload Component */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      {/* Upload Button */}
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Display Featured Images */}
      <div className="gap-4 mt-5 flex flex-row flex-wrap justify-around">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <div key={featureImgItem._id} className="relative">
              <img
                src={featureImgItem.image}
                className="w-auto h-[300px] object-cover rounded-lg"
                alt={`Featured Image ${featureImgItem._id}`}
              />
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No featured images available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

/**
 * Explanation of the Code:
 * This component provides an admin dashboard interface for managing featured images in an application.
 * Administrators can upload new images, view existing ones, and delete specific images. The design ensures
 * ease of use and clarity, with interactive elements like buttons and image previews.
 *
 * Key Features:
 * - **Image Upload:** Allows administrators to upload new featured images using the `ProductImageUpload` component.
 *   The uploaded image URL is stored and used to add the image to the featured list.
 * - **Dynamic Image Display:** Displays a grid of existing featured images, each with a "Delete" button for removal.
 * - **Redux Integration:** Uses Redux to manage the state of featured images, including fetching, adding, and deleting.
 * - **Fallback for Empty List:** Displays a message if no featured images are available, improving user experience.
 * - **Interactive Design:** Includes hover effects on the "Delete" button and responsive layout for displaying images.
 *
 * How It Works:
 * 1. The `AdminDashboard` component fetches the list of featured images using the `getFeatureImages` Redux action
 *    when the component mounts.
 * 2. Administrators can select and upload a new image using the `ProductImageUpload` component. Once uploaded,
 *    the image URL is passed to the `addFeatureImage` Redux action to add it to the featured list.
 * 3. The list of featured images is dynamically rendered in a grid layout. Each image includes a "Delete" button
 *    that triggers the `deleteFeatureImage` Redux action to remove the image.
 * 4. After performing any action (upload or delete), the list of featured images is refreshed to reflect the changes.
 *
 * Usage:
 * This component is typically used in an admin panel or dashboard to manage featured images. It enhances usability
 * by providing a clear and organized interface for uploading, viewing, and deleting images, ensuring smooth content
 * management.
 */