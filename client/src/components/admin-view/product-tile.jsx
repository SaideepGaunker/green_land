// Import necessary dependencies from UI components
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

/**
 * AdminProductTile Component:
 * ---------------------------------
 * This component represents a **single product card** in the admin panel.
 * It displays:
 * - Product image
 * - Product title
 * - Pricing details (original price & sale price if available)
 * - Edit & Delete buttons for managing the product
 *
 * Props:
 * - product (Object): The product details including title, price, sale price, and image.
 * - setFormData (Function): Function to set the product data when editing.
 * - setOpenCreateProductsDialog (Function): Controls the visibility of the product edit dialog.
 * - setCurrentEditedId (Function): Stores the ID of the product being edited.
 * - handleDelete (Function): Function to delete the product when the "Delete" button is clicked.
 */

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        {/* Product Image Section */}
        <div className="relative">
          <img
            src={product?.image} // Display the product image
            alt={product?.title} // Use the product title as alt text for accessibility
            className="w-full h-[400px] bottom-0 object-cover rounded-t-lg"
          />
        </div>

        {/* Product Details Section */}
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>

          {/* Pricing Section */}
          <div className="flex justify-between items-center mb-2">
            {/* Original Price (Strikethrough if sale price is available) */}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>

            {/* Sale Price (Shown only if available) */}
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">₹{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>

        {/* Action Buttons: Edit & Delete */}
        <CardFooter className="flex justify-between items-center">
          {/* Edit Button: Opens the product edit form */}
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true); // Open the edit dialog
              setCurrentEditedId(product?._id); // Set the current product ID for editing
              setFormData(product); // Populate the form with the selected product details
            }}
          >
            Edit
          </Button>

          {/* Delete Button: Removes the product */}
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

// Exporting the component for use in the admin panel
export default AdminProductTile;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `AdminProductTile` component displays an **individual product card** in the admin panel.
 * 
 * 1. **Product Display:**
 *    - Shows **product image, title, price, and sale price**.
 *    
 * 2. **Editing a Product:**
 *    - Clicking the **"Edit"** button opens a **product edit dialog**.
 *    - The `setFormData()` function fills the edit form with the product's current data.
 *    
 * 3. **Deleting a Product:**
 *    - Clicking the **"Delete"** button triggers the `handleDelete()` function.
 *    - This function removes the product from the store/database.
 *    
 * 4. **Pricing Behavior:**
 *    - If a **sale price** is present, the original price is **strikethrough**.
 *    - The sale price is displayed as the **final price**.
 *    
 * 5. **Technology Stack Used:**
 *    - **React Hooks** (`useState`) for managing state.
 *    - **TailwindCSS** for styling.
 *    - **UI Components** (Card, Button, etc.) for a modern UI.
 *    
 * This component provides **an intuitive and efficient way** to manage products in the admin panel.
 */
