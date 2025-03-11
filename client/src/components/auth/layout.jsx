// Import necessary dependencies from React Router and UI components
import { Outlet } from "react-router-dom"; // Outlet is used to render child components dynamically
import authimg from "@/assets/auth.json"; // Import Lottie animation JSON file
import Lottie from "lottie-react"; // Lottie-react for displaying animations

/**
 * AuthLayout Component:
 * ---------------------
 * This component serves as the **authentication layout** for login and registration pages.
 * 
 * Features:
 * - Displays an **animated Lottie illustration** (only on large screens).
 * - Provides a **dynamic content area** (Outlet) where login/register forms are rendered.
 * - Uses **responsive design** with a two-column layout (animation + form).
 */

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-screen mx-auto border-2 bg-bg-image bg-cover bg-left bg-no-repeat">
      {/* Left Section: Lottie Animation (Visible only on large screens) */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          {/* Lottie Animation for a modern UI experience */}
          <Lottie
            animationData={authimg}
            loop
            autoplay
            className="w-full h-full max-w-screen max-h-screen"
          />
          
          {/* Optional heading (currently commented out) */}
          {/* <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-green-500">Garden Gateway</span>
          </h1> */}
        </div>
      </div>

      {/* Right Section: Dynamic Content Area (Login/Register Forms) */}
      <div className="flex flex-1 items-center justify-center bg-bg-image bg-cover bg-right bg-no-repeat px-4 py-12 sm:px-6 lg:px-8">
        <Outlet /> {/* Renders login or registration form based on the route */}
      </div>
    </div>
  );
}

// Exporting the AuthLayout component for use in authentication pages
export default AuthLayout;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `AuthLayout` component provides the **layout structure for authentication pages** (Login & Register).
 * 
 * 1. **Left Section: Lottie Animation (Only on Large Screens)**
 *    - A beautiful **animated illustration** is displayed for a better UX.
 *    - This section is **hidden on small screens** (`lg:flex` ensures visibility only on large screens).
 *    
 * 2. **Right Section: Authentication Forms**
 *    - The `Outlet` component dynamically renders the **Login or Register form** based on the route.
 *    - The background is styled with a **background image** (`bg-bg-image`).
 *    
 * 3. **Responsive Design**
 *    - On **small screens**, only the form is displayed.
 *    - On **large screens**, a **two-column layout** is used (Lottie animation + form).
 *    
 * 4. **Technology Stack Used**
 *    - **React Router** (`Outlet`) for dynamic content.
 *    - **Lottie-react** for modern animations.
 *    - **TailwindCSS** for responsive styling.
 *    
 * This component ensures a **clean, modern, and user-friendly authentication experience**.
 */
