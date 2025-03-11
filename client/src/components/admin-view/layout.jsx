// Import necessary dependencies from React and React Router
import { Outlet } from "react-router-dom"; // Outlet is used to render child components based on the route
import AdminSideBar from "./sidebar"; // Import the sidebar component
import AdminHeader from "./header"; // Import the header component
import { useState } from "react"; // useState hook for managing state

/**
 * AdminLayout Component:
 * ---------------------------------
 * This component serves as the layout structure for the admin panel.
 * It consists of:
 * 1. A **sidebar** for navigation.
 * 2. A **header** for displaying admin controls.
 * 3. A **main content area** where different admin pages will be displayed dynamically.
 *
 * Features:
 * - Responsive sidebar toggle functionality.
 * - Uses React Router's `Outlet` to load different admin pages inside the main content area.
 */

function AdminLayout() {
  // State to control the visibility of the sidebar
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-[98vw]">
      {/* Admin Sidebar: This contains navigation links for the admin panel */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      {/* Main content wrapper (Header + Page Content) */}
      <div className="flex flex-1 flex-col">
        {/* Admin Header: Contains logout button and menu toggle */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Main content area where different admin pages are displayed */}
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet /> {/* This will render the child components based on the route */}
        </main>
      </div>
    </div>
  );
}

// Exporting the AdminLayout component for use in the admin panel
export default AdminLayout;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `AdminLayout` component provides the overall structure for the admin panel.
 * 
 * 1. **Sidebar Navigation:**
 *    - The sidebar (`AdminSideBar`) contains navigation links for different admin pages.
 *    - The sidebar can be toggled open or closed using the `openSidebar` state.
 *    
 * 2. **Header Section:**
 *    - The header (`AdminHeader`) contains a logout button and a menu toggle button.
 *    - Clicking the menu button opens or closes the sidebar.
 *    
 * 3. **Dynamic Content Rendering:**
 *    - The `Outlet` component from React Router dynamically loads the content of the admin pages.
 *    - When the admin navigates to different sections (e.g., Dashboard, Users, Products), the corresponding component is rendered inside the `<main>` section.
 *    
 * 4. **Styling & Responsiveness:**
 *    - The layout is styled using **TailwindCSS**.
 *    - The sidebar is **toggleable**, making it suitable for different screen sizes.
 *    
 * Overall, this component ensures a **structured, responsive, and easy-to-navigate** admin panel.
 */
