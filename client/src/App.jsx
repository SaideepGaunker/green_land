// Importing necessary components and hooks
import { Route, Routes } from "react-router-dom"; // React Router utilities for routing
import AuthLayout from "./components/auth/layout"; // Layout component for authentication pages
import AuthLogin from "./pages/auth/login"; // Login page component
import AuthRegister from "./pages/auth/register"; // Registration page component
import AdminLayout from "./components/admin-view/layout"; // Layout component for admin pages
import AdminDashboard from "./pages/admin-view/dashboard"; // Admin dashboard page
import AdminProducts from "./pages/admin-view/products"; // Admin products page
import AdminOrders from "./pages/admin-view/orders"; // Admin orders page
import AdminFeatures from "./pages/admin-view/features"; // Admin features page
import ShoppingLayout from "./components/shopping-view/layout"; // Layout component for shopping pages
import NotFound from "./pages/not-found"; // 404 Not Found page
import ShoppingHome from "./pages/shopping-view/home"; // Shopping home page
import ShoppingListing from "./pages/shopping-view/listing"; // Shopping product listing page
import ShoppingCheckout from "./pages/shopping-view/checkout"; // Shopping checkout page
import ShoppingAccount from "./pages/shopping-view/account"; // User account page
import CheckAuth from "./components/common/check-auth"; // Component to check authentication status
import UnauthPage from "./pages/unauth-page"; // Unauthorized access page
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { useEffect } from "react"; // React hook for side effects
import { checkAuth } from "./store/auth-slice"; // Redux action to check authentication status
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader component
import PaypalReturnPage from "./pages/shopping-view/paypal-return"; // PayPal return page
import PaymentSuccessPage from "./pages/shopping-view/payment-success"; // Payment success page
import SearchProducts from "./pages/shopping-view/search"; // Search results page

/**
 * Component: App
 * This is the main application component that defines the routing structure for the application. It uses React Router
 * to manage navigation between different pages and includes authentication checks to control access to certain routes.
 */
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  ); // Fetch authentication state from Redux
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  // Dispatch the `checkAuth` action when the component mounts to verify the user's authentication status
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show a skeleton loader while the authentication status is being checked
  if (isLoading) return <Skeleton className="w-[800px] h-[600px] bg-black" />;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Define the routing structure */}
      <Routes>
        {/* Root route */}
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        {/* Authentication routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Unauthorized access page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

/**
 * Explanation of the Code:
 * This component defines the routing structure for the application using React Router. It organizes the routes into
 * logical groups based on functionality, such as authentication, admin, and shopping. The `CheckAuth` component is used
 * to enforce authentication checks for protected routes, ensuring that only authenticated users can access certain pages.
 *
 * Key Features:
 * - **Authentication Checks:** Uses the `CheckAuth` component to verify the user's authentication status before rendering
 *   protected routes.
 * - **Modular Routing:** Organizes routes into groups for authentication, admin, and shopping, making the codebase easier
 *   to maintain and extend.
 * - **Skeleton Loader:** Displays a loading indicator while the authentication status is being verified.
 * - **Fallback Pages:** Includes a 404 Not Found page for unmatched routes and an unauthorized access page for restricted
 *   routes.
 *
 * How It Works:
 * 1. The `App` component fetches the user's authentication status from Redux and dispatches the `checkAuth` action to
 *    verify the session when the component mounts.
 * 2. A skeleton loader is displayed while the authentication status is being checked.
 * 3. The `CheckAuth` component wraps protected routes to ensure that only authenticated users can access them.
 * 4. The routing structure is defined using React Router, with nested routes for authentication, admin, and shopping.
 * 5. Fallback pages are provided for unmatched routes (`NotFound`) and restricted access (`UnauthPage`).
 *
 * Usage:
 * This component serves as the entry point for the application and manages navigation between different pages. It ensures
 * that the application has a clear and organized routing structure while enforcing authentication checks for protected
 * routes. It integrates seamlessly with Redux for state management and React Router for navigation.
 */