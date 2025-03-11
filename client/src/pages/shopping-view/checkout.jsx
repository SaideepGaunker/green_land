// Importing necessary components and hooks
import Address from "@/components/shopping-view/address"; // Component to handle address selection
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import UserCartItemsContent from "@/components/shopping-view/cart-items-content"; // Component to display cart items
import { Button } from "@/components/ui/button"; // Custom button component
import { useState } from "react"; // React hook for state management
import { createNewOrder } from "@/store/shop/order-slice"; // Redux action to create a new order
import { Navigate } from "react-router-dom"; // React Router utility for navigation
import { useToast } from "@/components/ui/use-toast"; // Custom toast notification hook

/**
 * Component: ShoppingCheckout
 * This component provides the checkout interface for users to review their cart items, select a shipping address,
 * and initiate payment via PayPal. It calculates the total cart amount and ensures that all required information
 * is provided before proceeding with the payment.
 */
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart); // Fetch the user's cart items
  const { user } = useSelector((state) => state.auth); // Fetch the logged-in user's details
  const { approvalURL } = useSelector((state) => state.shopOrder); // Fetch the PayPal approval URL
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null); // State to track the selected address
  const [isPaymentStart, setIsPaymemntStart] = useState(false); // State to track payment initiation
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const { toast } = useToast(); // Hook for displaying toast notifications

  console.log(currentSelectedAddress, "cartItems");

  /**
   * Calculate the total cart amount by summing up the price of each item multiplied by its quantity.
   */
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  /**
   * Function: handleInitiatePaypalPayment
   * Handles the initiation of the PayPal payment process. Validates the cart and selected address before
   * dispatching the `createNewOrder` Redux action.
   */
  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Prepare the order data to be sent to the server
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // Dispatch the `createNewOrder` action to initiate the payment
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "sangam");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  // Redirect to the PayPal approval URL if available
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col pt-16">
      {/* Checkout Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Address Selection Section */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart Summary and Payment Section */}
        <div className="flex flex-col gap-4 bg-white/50 backdrop-blur-[2px] pl-12 pr-12 pt-8 rounded-lg shadow-sm">
          {/* Display Cart Items */}
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}

          {/* Total Amount */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;

/**
 * Explanation of the Code:
 * This component provides the checkout interface for users to complete their purchase. It includes sections for
 * selecting a shipping address, reviewing cart items, and initiating payment via PayPal. The design ensures clarity
 * and usability, with validation checks to prevent incomplete submissions.
 *
 * Key Features:
 * - **Dynamic Cart Display:** Displays the user's cart items dynamically, calculating the total amount based on
 *   the items and their quantities.
 * - **Address Selection:** Allows users to select a shipping address using the `Address` component.
 * - **Validation:** Ensures that the cart is not empty and an address is selected before initiating payment.
 * - **Redux Integration:** Uses Redux to manage the state of the cart, user, and order, ensuring consistency and
 *   scalability.
 * - **PayPal Integration:** Redirects the user to the PayPal approval URL upon successful order creation.
 * - **Error Handling:** Provides feedback to users through toast notifications for errors like an empty cart or
 *   missing address.
 *
 * How It Works:
 * 1. The `ShoppingCheckout` component fetches the user's cart items, selected address, and PayPal approval URL
 *    from the Redux state.
 * 2. The total cart amount is calculated by summing up the price of each item multiplied by its quantity.
 * 3. Users can select a shipping address using the `Address` component.
 * 4. When the user clicks the "Checkout with PayPal" button, the `handleInitiatePaypalPayment` function validates
 *    the cart and address before dispatching the `createNewOrder` Redux action.
 * 5. If the order creation is successful, the user is redirected to the PayPal approval URL for payment processing.
 * 6. If any validation fails, an error toast notification is displayed to guide the user.
 *
 * Usage:
 * This component is typically used in an e-commerce application to provide a seamless checkout experience. It
 * enhances usability by providing a clear and organized interface for reviewing cart items, selecting an address,
 * and initiating payment while ensuring robust validation and integration with external payment systems.
 */