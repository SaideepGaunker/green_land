import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  // Using the 'useLocation' hook from 'react-router-dom' to get the current URL location
  const location = useLocation();

  console.log(location.pathname, isAuthenticated); // Logging the current path and authentication status

  // Check if the user is on the home page ("/")
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect them to the login page
      return <Navigate to="/auth/login" />;
    } else {
      // If the user is authenticated, check their role
      if (user?.role === "admin") {
        // If the user is an admin, redirect them to the admin dashboard
        return <Navigate to="/admin/dashboard" />;
      } else {
        // If the user is not an admin, redirect them to the shop home page
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // If the user is not authenticated and tries to access any page 
  // that is not the login or register page, redirect them to the login page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated and tries to access login or register pages,
  // redirect them based on their role (admin or not)
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      // If the user is an admin, redirect them to the admin dashboard
      return <Navigate to="/admin/dashboard" />;
    } else {
      // If the user is not an admin, redirect them to the shop home page
      return <Navigate to="/shop/home" />;
    }
  }

  // If the user is authenticated but is not an admin and tries to access admin pages,
  // redirect them to a page showing that they are not authorized to access that page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // If the user is authenticated and their role is admin, but they try to access shop pages,
  // redirect them to the admin dashboard instead
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If none of the above conditions are met, allow the user to view the page content (children)
  return <>{children}</>;
}

export default CheckAuth;

/**
 * Explanation:
 *
 * This component, `CheckAuth`, is responsible for managing user access to different pages of the application
 * based on their authentication status and role. It uses React Router's `Navigate` and `useLocation` hooks
 * to handle routing.
 *
 * 1. **Home Page (`/`) Handling**:
 *    - If the user is not authenticated, they are redirected to the login page.
 *    - If the user is authenticated, their role is checked:
 *      - If they are an admin, they are redirected to the admin dashboard.
 *      - If they are a regular user, they are redirected to the shop home page.
 *
 * 2. **Unauthenticated Users**:
 *    - If the user is not authenticated and attempts to access any page that is not the login or register page,
 *      they are redirected to the login page.
 *
 * 3. **Authenticated Users Accessing Login/Register**:
 *    - If the user is already authenticated and tries to access the login or register pages,
 *      they are redirected based on their role:
 *      - Admins are redirected to the admin dashboard.
 *      - Regular users are redirected to the shop home page.
 *
 * 4. **Non-Admin Users Accessing Admin Pages**:
 *    - If a user is authenticated but not an admin, and they try to access admin pages, they are redirected to
 *      an "unauthorized" page to inform them that they cannot access this content.
 *
 * 5. **Admin Users Accessing Shop Pages**:
 *    - If an admin user is authenticated and tries to access any shop-related page, they are redirected to
 *      the admin dashboard instead.
 *
 * 6. **Default Rendering**:
 *    - If none of the conditions above apply, the requested page (the `children` prop) is rendered, meaning
 *      the user can access the content of the page.
 *
 * This component is essential for controlling user access and ensuring that users can only access pages based on
 * their authentication status and role. It helps secure the application and provides a better user experience by
 * automatically redirecting users to the appropriate pages.
 */
