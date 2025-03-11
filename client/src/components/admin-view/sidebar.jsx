// Import necessary icons from Lucide-react for the sidebar menu
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

// Import necessary React components
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

// Import UI components for the sidebar drawer
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

/**
 * Sidebar Menu Items:
 * -------------------
 * This array contains the sidebar navigation menu items with:
 * - A unique ID
 * - Label (display text)
 * - Path (route for navigation)
 * - Icon (Lucide-react icons for a better UI)
 */
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

/**
 * MenuItems Component:
 * --------------------
 * - This component renders the sidebar menu items.
 * - Clicking an item navigates to the corresponding page.
 * - If `setOpen` is provided, it closes the sidebar (used in mobile view).
 *
 * Props:
 * - setOpen (Function | Optional): Function to close the sidebar (for mobile view).
 */
function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path); // Navigate to the selected page
            setOpen ? setOpen(false) : null; // Close the sidebar if applicable (mobile view)
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon} {/* Display menu icon */}
          <span>{menuItem.label}</span> {/* Display menu label */}
        </div>
      ))}
    </nav>
  );
}

/**
 * AdminSideBar Component:
 * -----------------------
 * - This component renders the **Admin Panel Sidebar**.
 * - It includes:
 *   - A drawer/sidebar menu (used on smaller screens).
 *   - A persistent sidebar (visible on larger screens).
 *
 * Props:
 * - open (Boolean): Determines if the mobile sidebar is open.
 * - setOpen (Function): Function to toggle the sidebar's visibility.
 */
function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Sidebar Drawer (Visible in mobile view) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} /> {/* Admin panel logo */}
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            {/* Render Sidebar Menu Items */}
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Persistent Sidebar (Visible in desktop view) */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        {/* Admin Panel Logo & Title (Navigates to Dashboard on click) */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        {/* Render Sidebar Menu Items */}
        <MenuItems />
      </aside>
    </Fragment>
  );
}

// Exporting the AdminSideBar component for use in the admin panel
export default AdminSideBar;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `AdminSideBar` component provides **a navigation menu for the admin panel**.
 *
 * 1. **Sidebar Drawer (For Mobile View)**
 *    - The sidebar appears as a **slide-in drawer** on small screens.
 *    - Uses the `Sheet` component to create a **toggleable** sidebar.
 *    - Clicking a menu item navigates to the page and **closes the sidebar**.
 *    
 * 2. **Persistent Sidebar (For Desktop View)**
 *    - On large screens, the sidebar **remains visible**.
 *    - Clicking a menu item navigates without closing the sidebar.
 *    
 * 3. **Navigation Functionality**
 *    - Uses `useNavigate` from React Router for navigation.
 *    - Clicking the **Admin Panel title** redirects to the Dashboard.
 *    
 * 4. **Menu Structure**
 *    - The sidebar includes three sections:
 *      - **Dashboard**
 *      - **Products**
 *      - **Orders**
 *    - Each section has an **icon and label** for better UI.
 *    
 * 5. **Technology Stack Used**
 *    - **React Hooks** (`useNavigate`) for handling navigation.
 *    - **Lucide-react icons** for a modern UI.
 *    - **TailwindCSS** for styling.
 *    - **Sheet Component** for a responsive mobile sidebar.
 *    
 * This component provides a **clean, structured, and responsive navigation experience** for admins.
 */
