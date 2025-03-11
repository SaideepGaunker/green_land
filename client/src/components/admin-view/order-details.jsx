// Import necessary dependencies from React, Redux, and UI components
import { useState } from "react";
import CommonForm from "../common/form"; // Importing a reusable form component
import { DialogContent } from "../ui/dialog"; // Dialog content wrapper for displaying order details
import { Label } from "../ui/label"; // Label component for displaying order information
import { Separator } from "../ui/separator"; // UI separator for visual separation
import { Badge } from "../ui/badge"; // Badge component for displaying order status
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice"; // Redux actions for handling orders
import { useToast } from "../ui/use-toast"; // Toast notification for displaying success messages

// Initial form data structure for updating order status
const initialFormData = {
  status: "",
};

/**
 * AdminOrderDetailsView Component:
 * ---------------------------------
 * This component displays the details of an individual order and allows the admin
 * to update its status.
 *
 * Features:
 * - Displays order details including ID, date, price, payment status, and order status.
 * - Displays customer shipping information.
 * - Allows the admin to update the order status using a dropdown form.
 * - Uses Redux to fetch and update order data dynamically.
 *
 * Props:
 * - orderDetails (Object): Contains details of the selected order.
 */

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData); // State for managing form input
  const { user } = useSelector((state) => state.auth); // Get logged-in admin user details
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const { toast } = useToast(); // Initialize toast notifications

  console.log(orderDetails, "orderDetailsorderDetails"); // Debugging log

  /**
   * Handles the order status update process when the admin submits the form.
   */
  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    // Dispatch the order status update action
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        // Refresh order details and order list after successful update
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData); // Reset form
        toast({
          title: data?.payload?.message, // Show success message
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-scroll">
      <div className="grid gap-6">
        {/* Order Details Section */}
        <div className="grid gap-2">
          <div className="flex mt-8 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator /> {/* UI Separator */}

        {/* Order Items Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li key={item._id} className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ₹{item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        {/* Order Status Update Form */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

// Exporting the component for use in the admin panel
export default AdminOrderDetailsView;

/**
 * FILE EXPLANATION:
 * -----------------
 * The `AdminOrderDetailsView` component provides a **detailed view of an order** and allows the admin to manage it.
 *
 * 1. **Order Details Section:**
 *    - Displays essential order information such as ID, date, total price, payment status, and order status.
 *    
 * 2. **Order Items Section:**
 *    - Lists all products in the order along with their quantity and price.
 *    
 * 3. **Shipping Information:**
 *    - Shows the recipient's details like address, city, pincode, phone number, and additional notes.
 *    
 * 4. **Order Status Update:**
 *    - Admin can update the order status using a dropdown form.
 *    - The update action is dispatched to Redux, and the state is refreshed upon success.
 *    
 * 5. **Technology Stack Used:**
 *    - **React Hooks** (`useState`, `useEffect`) for managing state.
 *    - **Redux Dispatch** for handling order status updates.
 *    - **Toast Notifications** for feedback.
 *    - **TailwindCSS** for styling.
 *    
 * This component ensures efficient **order tracking, management, and customer communication** in the admin panel.
 */
