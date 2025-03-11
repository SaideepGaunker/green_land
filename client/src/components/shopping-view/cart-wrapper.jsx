import { useNavigate } from "react-router-dom"; // Importing the navigate hook for routing
import { Button } from "../ui/button"; // Importing the Button component for UI interaction
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"; // Importing Sheet components for layout
import UserCartItemsContent from "./cart-items-content"; // Importing the component for displaying cart items

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate(); // Hook for navigating between routes

  // Calculate the total cart amount by iterating over cartItems
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice // Use sale price if available
              : currentItem?.price) *
              currentItem?.quantity, // Multiply by quantity of the item
          0
        )
      : 0; // If no items, total amount is 0

  return (
    <SheetContent className="p-4 overflow-y-scroll sm:max-w-md bg-[#acdca393] backdrop-blur-[5px] border-none text-[#f5f5f5]">
      {/* Header of the sheet */}
      <SheetHeader>
        <SheetTitle className="text-[#f5f5f5]">Your Cart</SheetTitle>
      </SheetHeader>
      
      {/* Display the list of cart items */}
      <div className="mt-8 space-y-4 text-[#c5c6d0] md:overflow-hidden lg:overflow-hidden lg:pr-6 md:pr-6 overflow-x-scroll">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />) // Map over cart items
          : null}
      </div>
      
      {/* Display the total price */}
      <div className="mt-8 space-y-4 text-[#f5f5f5]">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartAmount}</span> {/* Display total amount */}
        </div>
      </div>
      
      {/* Checkout button */}
      <Button
        onClick={() => {
          navigate("/shop/checkout"); // Navigate to checkout page
          setOpenCartSheet(false); // Close the cart sheet
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;

/**
 * Explanation:
 *
 * The `UserCartWrapper` component is responsible for displaying the user's shopping cart and its contents.
 * It calculates the total price of the cart based on the sale or regular price of items and their quantity.
 * The component allows the user to view a list of items, total price, and proceed to checkout.
 *
 * Key Features:
 * 1. **Cart Item Display**: It maps over the `cartItems` array to display each item using the `UserCartItemsContent` component.
 * 2. **Total Price Calculation**: It calculates the total cart amount by considering the price (or sale price) of each item and its quantity.
 * 3. **Checkout Button**: A button is provided to navigate to the checkout page and close the cart sheet when clicked.
 * 4. **Conditional Rendering**: If there are no items in the cart, nothing is displayed; otherwise, the cart items and total price are shown.
 * 
 * This component provides an interactive cart view for users to manage and proceed to checkout from their shopping cart.
 */
