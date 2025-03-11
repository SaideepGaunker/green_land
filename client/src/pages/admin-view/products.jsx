// Importing necessary components and actions
import ProductImageUpload from "@/components/admin-view/image-upload"; // Custom image upload component
import AdminProductTile from "@/components/admin-view/product-tile"; // Component to display individual product tiles
import CommonForm from "@/components/common/form"; // Generic form component for input fields
import { Button } from "@/components/ui/button"; // Custom button component
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Custom sheet component for dialogs
import { useToast } from "@/components/ui/use-toast"; // Custom toast notification hook
import { addProductFormElements } from "@/config"; // Configuration file for form elements
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice"; // Redux actions for managing products
import { Fragment, useEffect, useState } from "react"; // React hooks for state and side effects
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  need: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

/**
 * Component: AdminProducts
 * This component provides an interface for administrators to manage products. It allows adding new products,
 * editing existing ones, and deleting products. The interface includes a grid of product tiles and a form
 * dialog for adding or editing products.
 */
function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false); // State to control the visibility of the product form dialog
  const [formData, setFormData] = useState(initialFormData); // State to store form data
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store the URL of the uploaded image
  const [imageLoadingState, setImageLoadingState] = useState(false); // State to track image upload progress
  const [currentEditedId, setCurrentEditedId] = useState(null); // State to track the ID of the product being edited
  const { productList } = useSelector((state) => state.adminProducts); // Fetch the list of products from Redux state
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const { toast } = useToast(); // Hook for displaying toast notifications

  /**
   * Function: onSubmit
   * Handles the submission of the product form. Depending on whether an existing product is being edited or
   * a new product is being added, it dispatches the appropriate Redux action and refreshes the product list.
   *
   * @param {Event} event - The form submission event
   */
  function onSubmit(event) {
    event.preventDefault();
    if (currentEditedId !== null) {
      // Edit an existing product
      dispatch(
        editProduct({
          id: currentEditedId,
          formData,
        })
      ).then((data) => {
        console.log(data, "edit");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts()); // Refresh the product list
          setFormData(initialFormData); // Reset the form data
          setOpenCreateProductsDialog(false); // Close the dialog
          setCurrentEditedId(null); // Clear the edited product ID
        }
      });
    } else {
      // Add a new product
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts()); // Refresh the product list
          setOpenCreateProductsDialog(false); // Close the dialog
          setImageFile(null); // Reset the image file
          setFormData(initialFormData); // Reset the form data
          toast({
            title: "Product added successfully",
          }); // Show success toast
        }
      });
    }
  }

  /**
   * Function: handleDelete
   * Handles the deletion of a specific product. Dispatches the `deleteProduct` Redux action and refreshes
   * the product list upon success.
   *
   * @param {String} getCurrentProductId - The ID of the product to be deleted
   */
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts()); // Refresh the product list
      }
    });
  }

  /**
   * Function: isFormValid
   * Validates the form data to ensure all required fields are filled before allowing submission.
   *
   * @returns {Boolean} - Returns `true` if the form is valid, otherwise `false`
   */
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview") // Exclude averageReview from validation
      .map((key) => formData[key] !== "") // Check if each field is non-empty
      .every((item) => item); // Ensure all fields pass the check
  }

  // Fetch the list of products when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "productList");

  return (
    <Fragment>
      {/* Add New Product Button */}
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>

      {/* Product Form Dialog */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          {/* Image Upload Component */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          {/* Product Form */}
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;

/**
 * Explanation of the Code:
 * This component provides an admin interface for managing products in an application. Administrators can add new
 * products, edit existing ones, and delete products. The design ensures ease of use and clarity, with interactive
 * elements like buttons, dialogs, and forms.
 *
 * Key Features:
 * - **Product Grid:** Displays a grid of product tiles, each representing a product with options to edit or delete.
 * - **Dynamic Form Dialog:** Opens a dialog with a form for adding or editing products. The form includes fields
 *   for product details and an image upload component.
 * - **Redux Integration:** Uses Redux to manage the state of products, including fetching, adding, editing, and deleting.
 * - **Validation:** Ensures that all required fields are filled before allowing form submission.
 * - **Fallback for Empty List:** Displays a message if no products are available, improving user experience.
 * - **Interactive Design:** Includes hover effects, responsive layout, and toast notifications for feedback.
 *
 * How It Works:
 * 1. The `AdminProducts` component fetches the list of products using the `fetchAllProducts` Redux action when the
 *    component mounts.
 * 2. The product list is displayed in a grid layout, with each product represented by an `AdminProductTile` component.
 * 3. Clicking the "Add New Product" button opens a dialog with a form for adding a new product. Editing a product
 *    pre-fills the form with the product's details.
 * 4. The form validates the input fields and submits the data using the `addNewProduct` or `editProduct` Redux actions.
 * 5. Deleting a product triggers the `deleteProduct` Redux action, and the product list is refreshed to reflect changes.
 *
 * Usage:
 * This component is typically used in an admin panel or dashboard to manage products. It enhances usability by
 * providing a clear and organized interface for adding, editing, and deleting products, ensuring smooth content
 * management.
 */