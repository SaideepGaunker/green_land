// This file defines the `SearchProducts` component, which allows users to search for products and view the results.
// It integrates with Redux for state management and provides functionality to add products to the cart or view product details.

import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Importing the `ProductDetailsDialog` component for detailed product views.
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Importing the `ShoppingProductTile` component for displaying individual products.
import { Input } from "@/components/ui/input"; // Importing the `Input` component for the search bar.
import { useToast } from "@/components/ui/use-toast"; // Importing `useToast` for displaying notifications.
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importing actions to manage cart operations.
import { fetchProductDetails } from "@/store/shop/products-slice"; // Importing action to fetch product details.
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice"; // Importing actions to fetch and reset search results.
import { useEffect, useState } from "react"; // Importing React hooks for state and side effects.
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management.
import { useSearchParams } from "react-router-dom"; // Importing `useSearchParams` for managing query parameters in the URL.

function SearchProducts() {
  const [keyword, setKeyword] = useState(""); // State to store the search keyword.
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // State to control the visibility of the product details dialog.
  const [searchParams, setSearchParams] = useSearchParams(); // Hook for managing query parameters in the URL.
  const dispatch = useDispatch(); // Redux dispatch hook for triggering actions.
  const { searchResults } = useSelector((state) => state.shopSearch); // Extracting search results from Redux state.
  const { productDetails } = useSelector((state) => state.shopProducts); // Extracting product details from Redux state.
  const { user } = useSelector((state) => state.auth); // Extracting the authenticated user from Redux state.
  const { cartItems } = useSelector((state) => state.shopCart); // Extracting cart items from Redux state.
  const { toast } = useToast(); // Hook for displaying toast notifications.

  // Effect to fetch search results based on the keyword
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`)); // Updates the URL with the search keyword.
        dispatch(getSearchResults(keyword)); // Dispatches an action to fetch search results.
      }, 1000); // Debounces the search request by 1 second.
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`)); // Updates the URL with the search keyword.
      dispatch(resetSearchResults()); // Resets search results if the keyword is too short or empty.
    }
  }, [keyword]);

  // Function to handle adding a product to the cart
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems); // Logs cart items for debugging.
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      ); // Finds the index of the current product in the cart.
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity; // Gets the current quantity of the product in the cart.
        if (getQuantity + 1 > getTotalStock) {
          // Checks if adding one more unit exceeds the available stock.
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id)); // Fetches updated cart items after adding the product.
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Function to fetch product details
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId); // Logs the product ID for debugging.
    dispatch(fetchProductDetails(getCurrentProductId)); // Dispatches an action to fetch product details.
  }

  // Effect to open the product details dialog when product details are fetched
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(searchResults, "searchResults"); // Logs the search results for debugging.

  return (
    <div className="container mx-auto min-h-[80vh] md:px-6 px-4 py-8 mt-16">
      {/* 
        Explanation:
        - The root container is styled with Tailwind CSS classes to create a responsive layout.
        - `min-h-[80vh]`: Ensures the container spans at least 80% of the viewport height.
      */}

      {/* Search Bar */}
      <div className="flex justify-center mb-8 sticky-top-[15vh]">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6 bg-white/50 backdrop-blur-[8px] border border-gray-500 rounded-md px-4"
            placeholder="Search Products..."
          />
          {/* 
            Explanation:
            - The `Input` component allows users to enter a search keyword.
            - Styled with Tailwind CSS for a clean and modern design.
          */}
        </div>
      </div>

      {/* No Results Message */}
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      {/* 
        Explanation:
        - Displays a message if no search results are found.
        - `text-5xl font-extrabold`: Makes the message prominent.
      */}

      {/* Search Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item.id}
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
        {/* 
          Explanation:
          - Displays search results using the `ShoppingProductTile` component.
          - Uses a responsive grid layout with Tailwind CSS classes.
        */}
      </div>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;

/* 
  Summary of the File's Purpose:
  This file defines the `SearchProducts` component, which allows users to search for products and view the results. Key features include:
  1. **Search Bar**: Provides an input field for users to enter search keywords, with debounced fetching of results.
  2. **Search Results**: Displays a grid of products matching the search keyword using the `ShoppingProductTile` component.
  3. **No Results Message**: Shows a prominent message if no products match the search criteria.
  4. **Add to Cart**: Allows users to add products to their cart, with stock validation and notifications.
  5. **Product Details**: Opens a modal dialog to display detailed information about a selected product.
  6. **State Management**: Integrates with Redux for managing search results, product details, and cart operations.
  7. **Styling**: Styled with Tailwind CSS for a clean, responsive, and visually appealing design.
*/