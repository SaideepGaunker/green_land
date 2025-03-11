// Import necessary icons from lucide-react for UI elements
import { AlignJustify, LogOut } from "lucide-react";

// Importing the Button component from a UI library for consistent styling
import { Button } from "../ui/button";

// Importing useDispatch hook from Redux to trigger state changes
import { useDispatch } from "react-redux";

// Importing the logout action from the authentication Redux slice
import { logoutUser } from "@/store/auth-slice";

/**
 * AdminHeader Component:
 * - This component serves as the header/navigation bar for the admin panel.
 * - It contains:
 *   1. A menu toggle button (for opening the sidebar in mobile view).
 *   2. A logout button (to log out the admin user).
 * - It is designed to be responsive and user-friendly.
 *
 * Props:
 * - setOpen (Function): Controls the visibility of the sidebar menu on smaller screens.
 */

function AdminHeader({ setOpen }) {
  // Initializing the dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  /**
   * Function to handle user logout
   * - This function is triggered when the logout button is clicked.
   * - It dispatches the logoutUser action to clear authentication data.
   */
  function handleLogout() {
    dispatch(logoutUser()); // Dispatching the logout action
  }

  return (
    // Header section with flexbox for layout, padding, background color, and border styling
    <header className="flex items-center justify-between px-4 w-full py-3 bg-background border-b">

      {/* Menu Toggle Button (Only visible on smaller screens, used to open the sidebar) */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify /> {/* Icon for menu */}
        <span className="sr-only">Toggle Menu</span> {/* Accessibility text for screen readers */}
      </Button>

      {/* Logout Button (Positioned to the right side of the header) */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout} // Calls the logout function when clicked
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut /> {/* Icon representing logout action */}
          Logout {/* Logout text */}
        </Button>
      </div>
    </header>
  );
}

// Exporting the AdminHeader component for use in other parts of the application
export default AdminHeader;

/**
 * FILE EXPLANATION:
 * -----------------
 * This file defines the `AdminHeader` component, which is used in the admin panel.
 * 
 * 1. It contains a **menu toggle button** that is only visible on small screens (mobile/tablet). 
 *    - When clicked, it calls `setOpen(true)`, which likely opens the sidebar navigation.
 *    
 * 2. It has a **logout button** that, when clicked, triggers the `handleLogout` function.
 *    - This function dispatches the `logoutUser` action from Redux, clearing authentication data.
 *    - As a result, the admin is logged out and redirected to the login page.
 * 
 * 3. The component is styled using **TailwindCSS** for responsiveness and aesthetics.
 * 4. It utilizes **Lucide-react icons** for a modern and visually appealing UI.
 * 
 * Overall, this component helps in navigation and user session management in the admin panel.
 */
