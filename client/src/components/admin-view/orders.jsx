// Import necessary dependencies from React, Redux, and UI components
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI components for styling
import { Dialog } from "../ui/dialog"; // Dialog box for order details view
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Table components for displaying order list
import AdminOrderDetailsView from "./order-details"; // Order details component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice"; // Redux actions for handling orders
import { Badge } from "../ui/badge"; // Badge component for styling order status

/**
 * AdminOrdersView Component:
 * ---------------------------------
 * This component displays a list of all orders placed by customers.
 * 
 * Features:
 * - Fetches and displays all orders dynamically using Redux.
 * - Shows essential order details such as Order ID, Date, Status, and Price.
 * - Allows admins to open a detailed view of each order.
 * - Uses a modal dialog to show order details when an admin clicks "View Details".
 */

function AdminOrdersView() {
  // State to manage the visibility of the order details dialog
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Fetch order list and order details from Redux state
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  /**
   * Handles fetching details for a specific order when "View Details" is clicked.
   * @param {string} getId - The ID of the order to fetch details for.
   */
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  /**
   * Fetches all orders for the admin when the component loads.
   */
  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList"); // Debugging log

  /**
   * Opens the details dialog when order details are available.
   */
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      {/* Header section of the orders card */}
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>

      {/* Table containing order details */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Checking if there are any orders and mapping through them */}
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    {/* Displaying order information */}
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      {/* Displaying order status with different colors */}
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{orderItem?.totalAmount}</TableCell>

                    {/* Button to open order details in a modal dialog */}
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails()); // Reset order details when dialog is closed
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        {/* Displaying the order details inside the dialog */}
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Exporting the component for use in the admin panel
export default AdminOrdersView;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `AdminOrdersView` component provides an **admin interface for viewing and managing customer orders**.
 * 
 * 1. **Order List Display:**
 *    - Fetches and displays all orders from the Redux store.
 *    - Shows key details: **Order ID, Date, Status, and Price**.
 *    
 * 2. **Order Details View:**
 *    - Each order has a "View Details" button that opens a **modal dialog**.
 *    - When clicked, it fetches detailed order information using Redux.
 *    
 * 3. **Status Indication:**
 *    - The order status is displayed as a **color-coded badge**:
 *      - ✅ **Green** for Confirmed
 *      - ❌ **Red** for Rejected
 *      - ⚫ **Black** for other statuses
 *    
 * 4. **Redux Integration:**
 *    - Uses **Redux actions** to fetch order data and manage state.
 *    - Calls `getAllOrdersForAdmin()` when the component loads to fetch all orders.
 *    - Calls `getOrderDetailsForAdmin()` to fetch detailed order data when needed.
 *    
 * 5. **Technology Stack Used:**
 *    - **React Hooks** (`useState`, `useEffect`) for managing state and side effects.
 *    - **Redux Dispatch** for fetching and updating order data.
 *    - **Dialog Component** for displaying order details in a pop-up.
 *    - **TailwindCSS** for styling.
 *    
 * This component ensures efficient **order tracking, management, and real-time order status updates** for administrators.
 */
