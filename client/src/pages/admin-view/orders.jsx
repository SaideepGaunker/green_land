// This file defines the `AdminOrders` component, which serves as a wrapper for the `AdminOrdersView` component.
// The purpose of this component is to render the admin-specific view for managing and viewing orders.

import AdminOrdersView from "@/components/admin-view/orders"; // Importing the `AdminOrdersView` component, which contains the actual UI and logic for displaying orders.

function AdminOrders() {
  return (
    <div>
      {/* 
        Explanation:
        - The `AdminOrders` component wraps the `AdminOrdersView` component.
        - This structure allows for additional layout or logic to be added in the future without modifying the `AdminOrdersView` directly.
      */}
      <AdminOrdersView />
    </div>
  );
}

export default AdminOrders;

/* 
  Summary of the File's Purpose:
  This file defines the `AdminOrders` component, which is responsible for rendering the `AdminOrdersView` component.
  Key points:
  1. **Wrapper Component**: The `AdminOrders` component acts as a wrapper for `AdminOrdersView`, providing flexibility for future enhancements.
  2. **Reusability**: By separating the wrapper (`AdminOrders`) from the main logic (`AdminOrdersView`), the code adheres to the principle of separation of concerns.
  3. **Admin-Specific View**: This component is part of the admin dashboard and is used to display and manage orders placed by users.
*/