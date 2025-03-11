import { Button } from "../ui/button"; // Importing the Button component
import { Card, CardContent, CardFooter } from "../ui/card"; // Importing components for card layout
import { Label } from "../ui/label"; // Importing the Label component for displaying text

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      // The card becomes clickable if setCurrentSelectedAddress is provided
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      // Apply different border styles based on whether the address is selected
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]" // Highlight the card with a thicker, red border if it is selected
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        {/* Displaying address information */}
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        {/* Edit and Delete buttons */}
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;

/**
 * Explanation:
 *
 * The `AddressCard` component is used to display an address with options to edit or delete it. It takes the following props:
 *
 * 1. **addressInfo**: An object containing details about the address (address, city, pincode, phone, and notes).
 * 2. **handleDeleteAddress**: A callback function that is triggered when the "Delete" button is clicked, responsible for deleting the address.
 * 3. **handleEditAddress**: A callback function that is triggered when the "Edit" button is clicked, responsible for editing the address.
 * 4. **setCurrentSelectedAddress**: A function that updates the currently selected address when the card is clicked. This allows the user to select an address by clicking on it.
 * 5. **selectedId**: The ID of the currently selected address, used to apply a special border style to the selected address card.
 *
 * The component:
 * - Displays the address information inside a `Card` component, with details like address, city, pincode, phone, and notes.
 * - The card is styled based on whether it is selected or not, with a red border and thicker border if selected.
 * - Provides "Edit" and "Delete" buttons, triggering the appropriate callback functions when clicked.
 * - The entire card is clickable, allowing the user to select an address by clicking on it (if `setCurrentSelectedAddress` is provided).
 *
 * This component is reusable for displaying a list of addresses and allows users to edit or delete them with ease.
 */
