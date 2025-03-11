// Importing necessary components and hooks
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Custom card components for UI
import { capturePayment } from "@/store/shop/order-slice"; // Redux action to capture PayPal payment
import { useEffect } from "react"; // React hook for side effects
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions
import { useLocation } from "react-router-dom"; // React Router utility to access location data

/**
 * Component: PaypalReturnPage
 * This component handles the return page after a user completes a PayPal payment. It processes the payment
 * by capturing the payment ID and payer ID, then redirects the user to a success page upon successful payment.
 */
function PaypalReturnPage() {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const location = useLocation(); // Hook to access the current URL location
  const params = new URLSearchParams(location.search); // Parse query parameters from the URL
  const paymentId = params.get("paymentId"); // Extract the payment ID from the query parameters
  const payerId = params.get("PayerID"); // Extract the payer ID from the query parameters

  /**
   * Effect: Process Payment
   * Captures the payment using the `capturePayment` Redux action when the component mounts or when
   * the `paymentId` and `payerId` change. Redirects the user to the payment success page upon success.
   */
  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId")); // Retrieve the order ID from session storage
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId"); // Clear the order ID from session storage
          window.location.href = "/shop/payment-success"; // Redirect to the payment success page
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;

/**
 * Explanation of the Code:
 * This component is designed to handle the return page after a user completes a PayPal payment. It extracts
 * the payment ID and payer ID from the query parameters in the URL, retrieves the order ID from session storage,
 * and dispatches the `capturePayment` Redux action to finalize the payment process. Upon successful payment,
 * the user is redirected to a payment success page.
 *
 * Key Features:
 * - **Query Parameter Parsing:** Extracts the payment ID and payer ID from the URL query parameters.
 * - **Session Storage Integration:** Retrieves the order ID from session storage to associate the payment with the correct order.
 * - **Redux Integration:** Uses Redux to dispatch the `capturePayment` action and handle the payment capture process.
 * - **Redirection:** Redirects the user to a payment success page upon successful payment processing.
 * - **User Feedback:** Displays a loading message while the payment is being processed.
 *
 * How It Works:
 * 1. The `PaypalReturnPage` component extracts the `paymentId` and `payerId` from the query parameters in the URL.
 * 2. It retrieves the `orderId` from session storage, which was stored during the initial order creation.
 * 3. The `capturePayment` Redux action is dispatched with the `paymentId`, `payerId`, and `orderId` to finalize the payment.
 * 4. If the payment capture is successful, the `currentOrderId` is removed from session storage, and the user is redirected
 *    to the payment success page (`/shop/payment-success`).
 * 5. While the payment is being processed, a loading message is displayed to inform the user.
 *
 * Usage:
 * This component is typically used in an e-commerce application as part of the PayPal payment flow. It ensures that
 * payments are properly captured and provides a seamless user experience by redirecting users to a success page upon
 * completion. It integrates seamlessly with Redux for state management and React Router for navigation.
 */