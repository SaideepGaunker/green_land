// This file defines the `ShoppingAccount` component, which provides a tabbed interface for users to manage their orders and addresses.
// It uses the `Tabs` component from the UI library to organize content into separate tabs.

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Importing the `Tabs` components for creating a tabbed interface.
import Address from "@/components/shopping-view/address"; // Importing the `Address` component to display and manage user addresses.
import ShoppingOrders from "@/components/shopping-view/orders"; // Importing the `ShoppingOrders` component to display and manage user orders.

function ShoppingAccount() {
  return (
    <div className="flex flex-col mt-16">
      {/* 
        Explanation:
        - The root container is styled with Tailwind CSS classes to create a responsive layout.
        - `mt-16`: Adds margin at the top to provide spacing from the header or other elements.
      */}

      {/* Commented Out Background Image */}
      {/* <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div> */}
      {/* 
        Explanation:
        - This section is commented out but could be used to display a background image at the top of the page.
        - `object-cover` and `object-center`: Ensure the image covers the container and is centered.
      */}

      {/* Main Content Section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        {/* 
          Explanation:
          - `container mx-auto`: Centers the content horizontally and limits its width.
          - `grid grid-cols-1`: Uses a single-column grid layout.
          - `gap-8 py-8`: Adds spacing between elements and vertical padding.
        */}
        <div className="flex flex-col rounded-lg p-6 bg-white/50 backdrop-blur-md">
          {/* 
            Explanation:
            - The inner container is styled with Tailwind CSS for a clean and modern design.
            - `bg-white/50 backdrop-blur-md`: Creates a semi-transparent background with a blur effect.
            - `rounded-lg p-6`: Adds rounded corners and padding for better aesthetics.
          */}

          {/* Tabs Component */}
          <Tabs defaultValue="orders">
            {/* 
              Explanation:
              - The `Tabs` component organizes content into separate tabs.
              - `defaultValue="orders"`: Sets the default active tab to "Orders".
            */}
            <TabsList>
              {/* 
                Explanation:
                - `TabsList` contains the tab triggers (buttons) for switching between tabs.
              */}
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            {/* Orders Tab Content */}
            <TabsContent value="orders">
              {/* 
                Explanation:
                - Displays the `ShoppingOrders` component when the "Orders" tab is active.
              */}
              <ShoppingOrders />
            </TabsContent>

            {/* Address Tab Content */}
            <TabsContent value="address">
              {/* 
                Explanation:
                - Displays the `Address` component when the "Address" tab is active.
              */}
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;

/* 
  Summary of the File's Purpose:
  This file defines the `ShoppingAccount` component, which provides a tabbed interface for users to manage their account-related information. Key features include:
  1. **Tabbed Interface**: Uses the `Tabs` component to organize content into two tabs: "Orders" and "Address".
  2. **Reusable Components**: Integrates the `ShoppingOrders` and `Address` components to display and manage orders and addresses, respectively.
  3. **Styling**: Styled with Tailwind CSS for a clean, responsive, and visually appealing design.
  4. **Dynamic Content**: Allows users to switch between tabs to view and manage different sections of their account.
*/