// Importing necessary components and hooks
import { useEffect, useState } from "react"; // React hooks for state and side effects
import { Button } from "../ui/button"; // Custom button component
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Custom card components
import { Dialog } from "../ui/dialog"; // Custom dialog component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Custom table components
import ShoppingOrderDetailsView from "./order-details"; // Component to display detailed order information
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice"; // Redux actions for fetching orders and order details
import { Badge } from "../ui/badge"; // Custom badge component for status indicators

/**
 * Component: ShoppingOrders
 * This component displays the user's order history in a table format. Each row represents an order,
 * showing details such as the order ID, date, status, and price. Users can click a button to view
 * detailed information about a specific order in a dialog.
 */
function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // State to control the dialog visibility
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const { user } = useSelector((state) => state.auth); // Fetch the logged-in user's details
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder); // Fetch the user's order list and selected order details

  /**
   * Function: handleFetchOrderDetails
   * Fetches the details of a specific order when the "View Details" button is clicked.
   *
   * @param {String} getId - The ID of the order to fetch details for
   */
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId)); // Dispatch action to fetch order details
  }

  // Fetch all orders for the logged-in user when the component mounts
  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  // Open the dialog when order details are fetched
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    <Card>
      {/* Card Header */}
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <Table>
          {/* Table Header */}
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

          {/* Table Body */}
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500" // Green badge for confirmed orders
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600" // Red badge for rejected orders
                          : "bg-black" // Default black badge for other statuses
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    {/* Dialog for Order Details */}
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false); // Close the dialog
                        dispatch(resetOrderDetails()); // Reset the order details in Redux state
                      }}
                    >
                      {/* Button to View Order Details */}
                      <Button
                        className="bg-green backdrop-blur-[2px] rounded-lg shadow-sm"
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        View Details
                      </Button>
                      {/* Detailed Order Information */}
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;

/**
 * Explanation of the Code:
 * This component provides a comprehensive view of the user's order history. It displays a table with basic
 * information about each order, including the order ID, date, status, and price. Users can click the "View Details"
 * button to open a dialog that shows detailed information about the selected order.
 *
 * Key Features:
 * - **Order List Table:** Displays a list of orders in a table format, with columns for order ID, date, status,
 *   and price. The order status is visually highlighted using color-coded badges.
 * - **Order Details Dialog:** Opens a dialog to display detailed information about a specific order when the
 *   "View Details" button is clicked.
 * - **Dynamic Data Handling:** All data is dynamically rendered based on the `orderList` and `orderDetails` props,
 *   ensuring flexibility and reusability.
 * - **Redux Integration:** Uses Redux to fetch the user's order list and order details, and to reset the order
 *   details when the dialog is closed.
 * - **Fallback for Empty Orders:** Displays a message if no orders are found for the user.
 *
 * How It Works:
 * 1. The `ShoppingOrders` component fetches the user's order list using the `getAllOrdersByUserId` Redux action
 *    when the component mounts.
 * 2. The order list is displayed in a table, with each row representing an order. The order status is visually
 *    highlighted using color-coded badges.
 * 3. When the user clicks the "View Details" button for a specific order, the `getOrderDetails` Redux action is
 *    dispatched to fetch the detailed information for that order.
 * 4. Once the order details are fetched, the dialog is opened, and the `ShoppingOrderDetailsView` component is
 *    rendered to display the detailed information.
 * 5. When the dialog is closed, the `resetOrderDetails` Redux action is dispatched to reset the order details
 *    in the Redux state.
 *
 * Usage:
 * This component is typically used in an e-commerce application to provide users with a history of their orders.
 * It allows users to view both a summary of their orders and detailed information about each order, enhancing
 * transparency and usability.
 */