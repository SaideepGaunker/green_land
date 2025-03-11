// Importing necessary components and icons from libraries
import { Minus, Plus, Trash } from "lucide-react"; // Icons for minus, plus, and delete actions
import { Button } from "../ui/button"; // Custom button component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks to manage state
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice"; // Redux actions to update or delete cart items
import { useToast } from "../ui/use-toast"; // Custom toast notification hook

/**
 * Component: UserCartItemsContent
 * This component represents a single item in the user's shopping cart.
 * It allows users to increase/decrease the quantity of the item, delete the item,
 * and displays details like the product image, title, price, and total cost.
 *
 * @param {Object} cartItem - The cart item object containing details like productId, title, image, price, etc.
 */
function UserCartItemsContent({ cartItem }) {
  // Accessing global state using Redux's useSelector hook
  const { user } = useSelector((state) => state.auth); // Fetches the logged-in user's details
  const { cartItems } = useSelector((state) => state.shopCart); // Fetches the current cart items
  const { productList } = useSelector((state) => state.shopProducts); // Fetches the list of available products

  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const { toast } = useToast(); // Hook to display toast notifications

  /**
   * Function: handleUpdateQuantity
   * Handles increasing or decreasing the quantity of a cart item.
   * Ensures that the quantity does not exceed the available stock.
   *
   * @param {Object} getCartItem - The cart item whose quantity is being updated
   * @param {String} typeOfAction - Action type ("plus" to increase, "minus" to decrease)
   */
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || []; // Get the list of cart items
      if (getCartItems.length) {
        // Find the index of the current cart item
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );
        // Find the index of the product in the product list
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock; // Get the total stock of the product

        // Check if increasing the quantity exceeds the available stock
        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            // Show an error toast if stock limit is reached
            toast({
              title: `Only ${getTotalStock} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    // Dispatch the action to update the cart item's quantity
    dispatch(
      updateCartQuantity({
        userId: user?.id, // Logged-in user's ID
        productId: getCartItem?.productId, // Product ID of the cart item
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1 // Increase quantity
            : getCartItem?.quantity - 1, // Decrease quantity
      })
    ).then((data) => {
      // Show a success toast if the update is successful
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  /**
   * Function: handleCartItemDelete
   * Handles deleting a cart item from the user's cart.
   *
   * @param {Object} getCartItem - The cart item to be deleted
   */
  function handleCartItemDelete(getCartItem) {
    // Dispatch the action to delete the cart item
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      // Show a success toast if the deletion is successful
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Display the product image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        {/* Display the product title */}
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {/* Button to decrease the quantity */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1} // Disable if quantity is already 1
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 text-[#000]" />
            <span className="sr-only">Decrease</span>
          </Button>
          {/* Display the current quantity */}
          <span className="font-semibold">{cartItem?.quantity}</span>
          {/* Button to increase the quantity */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 text-[#000]" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {/* Display the total price for the cart item */}
        <p className="font-semibold">
  ₹{((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)} {/* Change currency symbol to INR */}
</p>
        {/* Trash icon to delete the cart item */}
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

/**
 * Explanation of the Code:
 * This component is responsible for rendering a single item in the user's shopping cart.
 * It displays the product image, title, quantity, and total price. Users can increase or
 * decrease the quantity of the item, but the quantity cannot exceed the available stock.
 * If the stock limit is reached, an error message is shown. Users can also delete the item
 * from the cart. All actions (updating quantity or deleting the item) are handled using Redux,
 * and success/error messages are displayed using toast notifications. The component uses data
 * from the global Redux store to fetch user details, cart items, and product information.
 */