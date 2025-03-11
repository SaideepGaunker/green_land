// This file defines the `PaymentSuccessPage` component, which is displayed after a successful payment.
// It provides a confirmation message and a button to navigate to the user's account page to view their orders.

import { Button } from "@/components/ui/button"; // Importing the `Button` component for interactive elements.
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Importing `Card` components for displaying content in a structured layout.
import { useNavigate } from "react-router-dom"; // Importing `useNavigate` for programmatic navigation.

function PaymentSuccessPage() {
  const navigate = useNavigate(); // Hook for navigating programmatically.

  return (
    <Card className="p-10">
      {/* 
        Explanation:
        - The `Card` component is styled with Tailwind CSS classes to create a clean and visually appealing layout.
        - `p-10`: Adds padding inside the card for spacing.
      */}
      <CardHeader className="p-0">
        {/* 
          Explanation:
          - The `CardHeader` contains the title of the card.
          - `p-0`: Removes default padding to allow custom styling.
        */}
        <CardTitle className="text-4xl">
          {/* 
            Explanation:
            - Displays a success message to inform the user that their payment was successful.
            - `text-4xl`: Sets the font size to large for emphasis.
          */}
          Payment is successful!
        </CardTitle>
      </CardHeader>

      {/* Button to Navigate to Account Page */}
      <Button
        className="mt-5"
        onClick={() => navigate("/shop/account")}
      >
        {/* 
          Explanation:
          - A button is provided to allow users to navigate to their account page to view their orders.
          - `mt-5`: Adds margin at the top for spacing.
          - `onClick`: Triggers navigation to the `/shop/account` route when clicked.
        */}
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;

/* 
  Summary of the File's Purpose:
  This file defines the `PaymentSuccessPage` component, which serves as a confirmation page after a successful payment. Key features include:
  1. **Success Message**: Displays a clear and prominent message to inform the user that their payment was successful.
  2. **Navigation Button**: Provides a button to navigate to the user's account page, where they can view their orders.
  3. **Styling**: Styled with Tailwind CSS for a clean, responsive, and visually appealing design.
  4. **User Experience**: Ensures a smooth post-payment experience by guiding users to the next logical step (viewing their orders).
*/