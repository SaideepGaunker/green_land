// Importing necessary components and icons from libraries
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"; // Icons for navigation, cart, user actions, etc.
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"; // React Router utilities for navigation and URL management
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; // Custom sheet component for mobile menu
import { Button } from "../ui/button"; // Custom button component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { shoppingViewHeaderMenuItems } from "@/config"; // Configuration file containing menu items
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"; // Custom dropdown menu components
import { Avatar, AvatarFallback } from "../ui/avatar"; // Custom avatar components
import { logoutUser } from "@/store/auth-slice"; // Redux action to log out the user
import UserCartWrapper from "./cart-wrapper"; // Component to display the user's cart
import { useEffect, useState } from "react"; // React hooks for state and side effects
import { fetchCartItems } from "@/store/shop/cart-slice"; // Redux action to fetch cart items
import { Label } from "../ui/label"; // Custom label component
import logo from "../../assets/logo.webp"; // Logo image

/**
 * Component: MenuItems
 * This component renders the navigation menu items for the header. It dynamically generates
 * menu items based on a configuration file and handles navigation when a menu item is clicked.
 */
function MenuItems() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook to access the current location
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manage query parameters

  /**
   * Function: handleNavigate
   * Handles navigation when a menu item is clicked. It applies filters if applicable and navigates
   * to the corresponding route.
   *
   * @param {Object} getCurrentMenuItem - The menu item that was clicked
   */
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters"); // Clear any existing filters
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id], // Set filter based on the menu item ID
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // Save filters to session storage

    // Navigate to the appropriate route or update query parameters
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row text-[#2E7D32]">
      {/* Dynamically render menu items */}
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)} // Handle navigation on click
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label} {/* Display the menu item label */}
        </Label>
      ))}
    </nav>
  );
}

/**
 * Component: HeaderRightContent
 * This component renders the right-hand side of the header, including the shopping cart icon,
 * user avatar, and dropdown menu for account and logout actions.
 */
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth); // Fetch the logged-in user details
  const { cartItems } = useSelector((state) => state.shopCart); // Fetch the user's cart items
  const [openCartSheet, setOpenCartSheet] = useState(false); // State to control the cart sheet visibility
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  /**
   * Function: handleLogout
   * Logs out the user by dispatching the `logoutUser` Redux action.
   */
  function handleLogout() {
    dispatch(logoutUser());
  }

  // Fetch cart items when the component mounts or when the user changes
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Shopping Cart Sheet */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)} // Open the cart sheet on click
          variant="outline"
          size="icon"
          className="relative p-2 bg-[transparent] border-none"
        >
          <ShoppingCart className="w-full h-full" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0} {/* Display the number of items in the cart */}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet} // Pass the function to close the cart sheet
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          } // Pass the cart items to the wrapper
        />
      </Sheet>

      {/* User Avatar Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()} {/* Display the first letter of the username */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/**
 * Component: ShoppingHeader
 * This component represents the main header of the application. It includes the logo, navigation menu,
 * shopping cart, and user account options. It adapts to different screen sizes using responsive design.
 */
function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth); // Check if the user is authenticated

  return (
    <header className="fixed top-0 left-[12vw] z-40 w-[76vw] bg-white/50 backdrop-blur-md shadow-2xl border border-white/80 rounded-b-[20px] border-t-0 mx-auto">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <img alt="Garden Gateway" className="h-20 w-20" src={logo} />
        </Link>

        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden p-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white/80 backdrop-blur-[1px]">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop Header Right Content */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;

/**
 * Explanation of the Code:
 * This component is the main header of the application, providing navigation, user account options, and
 * a shopping cart. It is designed to be responsive, adapting to both mobile and desktop views.
 *
 * Key Features:
 * - **Dynamic Menu Items:** The navigation menu is dynamically generated based on a configuration file,
 *   making it easy to add or remove menu items without modifying the code.
 * - **Shopping Cart Integration:** Displays the number of items in the cart and opens a sheet with cart
 *   details when clicked.
 * - **User Account Options:** Includes a dropdown menu with options to view the account or log out.
 * - **Responsive Design:** The header adapts to different screen sizes, showing a hamburger menu for mobile
 *   and a full navigation bar for desktop.
 * - **Authentication Handling:** Displays user-specific content (e.g., avatar, username) only if the user
 *   is authenticated.
 *
 * How It Works:
 * 1. The `ShoppingHeader` component renders the logo, navigation menu, and user-related content.
 * 2. On smaller screens, a hamburger menu triggers a sheet containing the navigation menu and user options.
 * 3. The `MenuItems` component dynamically generates navigation links based on the `shoppingViewHeaderMenuItems`
 *    configuration.
 * 4. The `HeaderRightContent` component displays the shopping cart and user account options, including a
 *    dropdown menu for account and logout actions.
 * 5. The shopping cart sheet is controlled using React state (`openCartSheet`) and displays the user's cart
 *    items when opened.
 *
 * Usage:
 * This header can be used in any e-commerce or web application to provide essential navigation and user
 * interaction features. It ensures a consistent and user-friendly experience across all devices.
 */