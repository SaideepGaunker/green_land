// Importing necessary components and hooks
import ProductFilter from "@/components/shopping-view/filter"; // Component for product filtering
import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Component to display detailed product information
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Component to display individual product tiles
import { Button } from "@/components/ui/button"; // Custom button component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Custom dropdown menu components
import { useToast } from "@/components/ui/use-toast"; // Custom toast notification hook
import { sortOptions } from "@/config"; // Configuration file for sorting options
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Redux actions for managing the cart
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice"; // Redux actions for fetching products and product details
import { ArrowUpDownIcon } from "lucide-react"; // Icon for sorting
import { useEffect, useState } from "react"; // React hooks for state and side effects
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { useSearchParams } from "react-router-dom"; // React Router utility for managing query parameters

/**
 * Function: createSearchParamsHelper
 * Helper function to construct query parameters from filter options.
 *
 * @param {Object} filterParams - The filter options to be converted into query parameters
 * @returns {String} - A string of query parameters
 */
function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  console.log(queryParams, "queryParams");
  return queryParams.join("&");
}

/**
 * Component: ShoppingListing
 * This component provides a product listing interface with filtering, sorting, and detailed product views.
 * It allows users to browse products, apply filters, sort results, view product details, and add products to the cart.
 */
function ShoppingListing() {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  ); // Fetch the list of products and product details from Redux state
  const { cartItems } = useSelector((state) => state.shopCart); // Fetch the user's cart items
  const { user } = useSelector((state) => state.auth); // Fetch the logged-in user's details
  const [filters, setFilters] = useState({}); // State to track applied filters
  const [sort, setSort] = useState(null); // State to track the selected sorting option
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manage query parameters
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // State to control the product details dialog
  const { toast } = useToast(); // Hook for displaying toast notifications
  const categorySearchParam = searchParams.get("category"); // Get the category parameter from the URL

  /**
   * Function: handleSort
   * Handles the selection of a sorting option.
   *
   * @param {String} value - The selected sorting option
   */
  function handleSort(value) {
    setSort(value);
  }

  /**
   * Function: handleFilter
   * Handles the application or removal of filter options.
   *
   * @param {String} getSectionId - The ID of the filter section (e.g., category, brand)
   * @param {String} getCurrentOption - The specific filter option being applied or removed
   */
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  /**
   * Function: handleGetProductDetails
   * Fetches detailed information for a specific product.
   *
   * @param {String} getCurrentProductId - The ID of the product to fetch details for
   */
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  /**
   * Function: handleAddtoCart
   * Adds a product to the user's cart. Validates stock availability before adding.
   *
   * @param {String} getCurrentProductId - The ID of the product to add to the cart
   * @param {Number} getTotalStock - The total available stock for the product
   */
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
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
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Initialize sorting and filters when the component mounts or when the category changes
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // Update query parameters when filters change
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // Fetch filtered products when filters or sorting options change
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  // Open the product details dialog when product details are fetched
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(productList, "productListproductListproductList");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 mt-16">
      {/* Product Filter Section */}
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      {/* Product Listing Section */}
      <div className="bg-white/50 backdrop-blur-[2px] w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            {/* Sorting Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
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

export default ShoppingListing;

/**
 * Explanation of the Code:
 * This component provides a comprehensive interface for browsing and managing products in an e-commerce application.
 * It includes features such as filtering, sorting, viewing product details, and adding products to the cart. The design
 * ensures clarity and usability, with interactive elements like dropdowns, buttons, and dialogs.
 *
 * Key Features:
 * - **Dynamic Filtering:** Allows users to apply filters based on categories, brands, or other attributes. Filters are
 *   stored in session storage and reflected in the URL query parameters.
 * - **Sorting Options:** Provides sorting options (e.g., price low to high, price high to low) using a dropdown menu.
 * - **Product Grid:** Displays products in a responsive grid layout, with each product represented by a tile.
 * - **Detailed Views:** Opens a dialog to display detailed information about a specific product.
 * - **Cart Integration:** Adds products to the cart with validation for stock availability.
 * - **Redux Integration:** Uses Redux to manage the state of products, filters, and the cart, ensuring consistency and scalability.
 *
 * How It Works:
 * 1. The `ShoppingListing` component initializes the sorting and filtering options when the component mounts or when the
 *    category parameter in the URL changes.
 * 2. Filters are applied dynamically, and the query parameters in the URL are updated accordingly.
 * 3. When filters or sorting options change, the `fetchAllFilteredProducts` Redux action is dispatched to fetch the filtered
 *    and sorted list of products.
 * 4. Users can click on a product tile to view detailed information in a dialog or add the product to their cart.
 * 5. Stock availability is validated before adding a product to the cart, and feedback is provided through toast notifications.
 *
 * Usage:
 * This component is typically used in an e-commerce application to provide a seamless shopping experience. It enhances
 * usability by providing a clear and organized interface for browsing products, applying filters, sorting results, and
 * managing the cart while ensuring robust integration with external systems.
 */