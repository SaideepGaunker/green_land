import { useEffect, useState } from "react"; // Importing React hooks for state and side effects
import CommonForm from "../common/form"; // Importing the form component for handling address inputs
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Importing card components for layout
import { addressFormControls } from "@/config"; // Importing the form controls configuration for address fields
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management and dispatching actions
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice"; // Importing actions for address management
import AddressCard from "./address-card"; // Importing the AddressCard component for displaying addresses
import { useToast } from "@/components/ui/use-toast"; // Importing the toast component for notifications

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData); // State for storing form data
  const [currentEditedId, setCurrentEditedId] = useState(null); // State for tracking which address is being edited
  const dispatch = useDispatch(); // Dispatching actions using Redux
  const { user } = useSelector((state) => state.auth); // Getting the user from the Redux state
  const { addressList } = useSelector((state) => state.shopAddress); // Getting the list of addresses from Redux state
  const { toast } = useToast(); // Hook for triggering toast notifications

  // Function to handle adding or editing an address
  function handleManageAddress(event) {
    event.preventDefault();

    // Limiting the number of addresses to 3
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });
      return;
    }

    // If editing, update the address, otherwise add a new one
    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id)); // Fetch updated addresses
            setCurrentEditedId(null); // Clear editing state
            setFormData(initialAddressFormData); // Reset form data
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id)); // Fetch updated addresses
            setFormData(initialAddressFormData); // Reset form data
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  // Function to handle deleting an address
  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id)); // Fetch updated addresses
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  // Function to handle editing an address
  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id); // Set the address ID to be edited
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  // Function to check if the form is valid (all fields must be filled)
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "") // Check if all form fields are not empty
      .every((item) => item); // If all items are true, the form is valid
  }

  // Fetch addresses when the component is mounted
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList"); // Debugging: log the list of addresses

  return (
    <Card>
      {/* Display list of addresses */}
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2 bg-white/50 backdrop-blur-[2px] rounded-lg shadow-sm">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      {/* Header for Add/Edit address section */}
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      {/* Form section for adding or editing an address */}
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls} // Controls for the form (address fields)
          formData={formData} // Current form data
          setFormData={setFormData} // Function to update form data
          buttonText={currentEditedId !== null ? "Edit" : "Add"} // Button text depends on if editing or adding
          onSubmit={handleManageAddress} // Handle form submission
          isBtnDisabled={!isFormValid()} // Disable button if form is invalid
        />
      </CardContent>
    </Card>
  );
}

export default Address;

/**
 * Explanation:
 *
 * The `Address` component allows users to manage their address list, including adding, editing, and deleting addresses. 
 * It handles the form input for addresses and provides a list of current addresses with options to edit or delete them.
 *
 * Key features:
 * 1. **Displaying Addresses**: The `addressList` fetched from the Redux state is displayed as a grid of `AddressCard` components.
 * 2. **Add/Edit Address**: Users can either add a new address or edit an existing one by filling out a form. The form fields are dynamically populated based on whether an address is being edited.
 * 3. **Validation**: The form requires all fields to be filled before submission. The submit button is disabled if the form is not valid.
 * 4. **Address Management**: Actions for adding, editing, and deleting addresses are dispatched to Redux, and the list is updated accordingly.
 * 5. **Toast Notifications**: Success and error messages are shown using the toast component for better user feedback.
 *
 * This component provides a fully functional address management UI that supports a user-friendly flow for updating addresses.
 */
