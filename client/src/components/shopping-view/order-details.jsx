// Importing necessary components and hooks
import { useSelector } from "react-redux"; // Redux hook to access global state
import { Badge } from "../ui/badge"; // Custom badge component for status indicators
import { DialogContent } from "../ui/dialog"; // Custom dialog content component
import { Label } from "../ui/label"; // Custom label component
import { Separator } from "../ui/separator"; // Custom separator component

/**
 * Component: ShoppingOrderDetailsView
 * This component displays the details of a specific order in a dialog. It includes information such as
 * the order ID, date, price, payment method, status, shipping details, and a list of items in the order.
 *
 * @param {Object} props - Component props
 * @param {Object} props.orderDetails - The details of the order to be displayed
 */
function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth); // Fetch the logged-in user's details

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-scroll bg-white/10 backdrop-blur-md shadow-2xl">
      {/* Main container for the order details */}
      <div className="grid gap-6">
        {/* General Order Information Section */}
        <div className="grid gap-2 mt-4">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium text-[#f5f5f5]">Order ID</p>
            <Label className="text-[#C8DBC1]">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#f5f5f5]">Order Date</p>
            <Label className="text-[#C8DBC1]">
              {orderDetails?.orderDate.split("T")[0]} {/* Extract and display only the date */}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#f5f5f5]">Order Price</p>
            <Label className="text-[#C8DBC1]">₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#f5f5f5]">Payment Method</p>
            <Label className="text-[#C8DBC1]">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#f5f5f5]">Payment Status</p>
            <Label className="text-[#C8DBC1]">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#f5f5f5]">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500" // Green badge for confirmed orders
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600" // Red badge for rejected orders
                    : "bg-black" // Default black badge for other statuses
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        {/* Separator between sections */}
        <Separator />

        {/* Order Items Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-[#d7edbb] underline">Order Details</div>
            <ul className="grid gap-3 text-[#f5f5f5]">
              {/* Dynamically render the list of items in the order */}
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between border border-white/50-400 p-3 rounded-lg hover:bg-white/20 hover:border-transparent transition-transform duration-350"
                    >
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
            <div className="font-medium text-[#d7edbb] underline">Shipping Info</div>
            <div className="grid gap-0.5 text-[#acdca3]">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;

/**
 * Explanation of the Code:
 * This component is designed to display detailed information about a specific order in a dialog box.
 * It provides a comprehensive view of the order, including general details, a list of items, and shipping
 * information. The design ensures clarity and readability, with visually distinct sections and dynamic data.
 *
 * Key Features:
 * - **General Order Information:** Displays key details such as the order ID, date, price, payment method,
 *   payment status, and order status. The order status is visually highlighted using color-coded badges.
 * - **Order Items List:** Dynamically renders a list of items in the order, showing the title, quantity, and price.
 * - **Shipping Information:** Displays the shipping address, city, pin code, phone number, and any additional notes.
 * - **Responsive Design:** The dialog content is scrollable and adapts to different screen sizes.
 * - **Dynamic Data Handling:** All information is dynamically rendered based on the `orderDetails` prop, ensuring
 *   flexibility and reusability.
 *
 * How It Works:
 * 1. The `ShoppingOrderDetailsView` component receives the `orderDetails` object as a prop, which contains all
 *    the necessary information about the order.
 * 2. The component uses Redux to fetch the logged-in user's details for displaying the shipping information.
 * 3. The general order information section displays static details like the order ID, date, price, etc.
 * 4. The order items section dynamically maps over the `cartItems` array to display each item's title, quantity,
 *    and price.
 * 5. The shipping information section displays the user's shipping address and contact details.
 * 6. The order status is visually highlighted using a color-coded badge (green for confirmed, red for rejected,
 *    and black for other statuses).
 *
 * Usage:
 * This component is typically used in an e-commerce application to provide users with a detailed view of their
 * orders. It can be triggered via a modal or dialog when the user clicks on an order in their order history.
 */