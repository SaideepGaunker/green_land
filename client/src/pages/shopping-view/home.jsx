// This file defines the `ShoppingHome` component, which serves as the homepage for a shopping application.
// It includes a carousel of featured images, product categories, needs-based sections, and featured products.

import { Button } from "@/components/ui/button"; // Importing the `Button` component for interactive elements.
import {
  Sprout,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBasket,
  Shovel,
  Palette,
  Bean,
  DoorOpen,
  Flower2,
  Fence,
  Gift,
  Wrench,
} from "lucide-react"; // Importing icons for visual representation.
import { Card, CardContent } from "@/components/ui/card"; // Importing `Card` components for displaying categories and needs.
import { useEffect, useState } from "react"; // Importing React hooks for state and side effects.
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management.
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice"; // Importing actions to fetch products and product details.
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Importing the `ShoppingProductTile` component for displaying individual products.
import { useNavigate } from "react-router-dom"; // Importing `useNavigate` for programmatic navigation.
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importing actions to manage cart operations.
import { useToast } from "@/components/ui/use-toast"; // Importing `useToast` for displaying notifications.
import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Importing the `ProductDetailsDialog` component for detailed product views.
import { getFeatureImages } from "@/store/common-slice"; // Importing action to fetch featured images.

// Mapping of categories with their respective icons
const categoriesWithIcon = [
  { id: "collections", label: "Collections", icon: Sprout },
  { id: "aesthetics", label: "Aesthetics", icon: Palette },
  { id: "kits", label: "Kits", icon: ShoppingBasket },
  { id: "accessories", label: "Accessories", icon: Wrench },
];

// Mapping of needs/brands with their respective icons
const brandsWithIcon = [
  { id: "indoor", label: "indoor", icon: DoorOpen },
  { id: "outdoor", label: "outdoor", icon: Fence },
  { id: "decors", label: "decors", icon: Flower2 },
  { id: "gift", label: "gift's", icon: Gift },
  { id: "seeds", label: "seeds", icon: Bean },
  { id: "tools", label: "Tools", icon: Shovel },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide in the carousel.
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  ); // Extracting product list and details from Redux state.
  const { featureImageList } = useSelector((state) => state.commonFeature); // Extracting featured images from Redux state.
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // State to control the visibility of the product details dialog.
  const { user } = useSelector((state) => state.auth); // Extracting the authenticated user from Redux state.
  const dispatch = useDispatch(); // Redux dispatch hook for triggering actions.
  const navigate = useNavigate(); // Hook for programmatic navigation.
  const { toast } = useToast(); // Hook for displaying toast notifications.

  // Function to handle navigation to the listing page with applied filters
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters"); // Clears existing filters.
    const currentFilter = {
      [section]: [getCurrentItem.id], // Creates a filter based on the selected category or need.
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // Stores the filter in session storage.
    navigate(`/shop/listing`); // Navigates to the listing page.
  }

  // Function to fetch product details
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId)); // Dispatches an action to fetch product details.
  }

  // Function to add a product to the cart
  function handleAddtoCart(getCurrentProductId) {
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

  // Effect to open the product details dialog when product details are fetched
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Effect to automatically cycle through featured images in the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000); // Changes slides every 15 seconds.
    return () => clearInterval(timer); // Clears the interval on component unmount.
  }, [featureImageList]);

  // Effect to fetch all filtered products on component mount
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // Effect to fetch featured images on component mount
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(productList, "productList"); // Logs the product list for debugging.

  return (
    <div className="flex flex-col min-h-screen">
      {/* Featured Images Carousel */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        {/* Previous Slide Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="shadow-md absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 p-1 border-none backdrop-blur-sm"
        >
          <ChevronLeftIcon className="w-full h-full" />
        </Button>
        {/* Next Slide Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#ffffff9c] p-1 border-none backdrop-blur-sm"
        >
          <ChevronRightIcon className="w-full h-full" />
        </Button>
      </div>

      {/* Shop by Category Section */}
      <section className="py-12 bg-none">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#564c4d] font-serif">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer text-[#D57A66] bg-[#8EF5797D] hover:bg-[#8ef579d3] backdrop-blur-[4px] hover:backdrop-blur-[6px] hover:text-[#F5F5F5] shadow-2xl border border-white/20 rounded-lg p-0 transition-transform duration-350 hover:scale-105 hover:shadow-2xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Need Section */}
      <section className="py-12 bg-none">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#564c4d] font-serif">
            Shop by Need
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "need")}
                className="cursor-pointer text-[#D57A66] bg-[#8EF5797D] hover:bg-[#8ef579d3] backdrop-blur-[4px] hover:backdrop-blur-[6px] hover:text-[#F5F5F5] shadow-2xl border border-white/20 rounded-lg p-0 transition-transform duration-400 hover:scale-105 hover:shadow-2xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;

/* 
  Summary of the File's Purpose:
  This file defines the `ShoppingHome` component, which serves as the homepage for a shopping application. Key features include:
  1. **Featured Images Carousel**: Displays a rotating carousel of featured images with navigation buttons.
  2. **Shop by Category**: Provides a grid of categories with icons for easy navigation to filtered product listings.
  3. **Shop by Need**: Displays a grid of needs/brands with icons for filtering products based on specific requirements.
  4. **Featured Products**: Lists featured products using the `ShoppingProductTile` component, allowing users to view details or add products to the cart.
  5. **Product Details Dialog**: Opens a modal dialog to display detailed information about a selected product.
  6. **Dynamic Navigation**: Uses Redux and session storage to apply filters and navigate to product listings dynamically.
  7. **Styling**: Styled with Tailwind CSS for a clean, responsive, and visually appealing design.
*/