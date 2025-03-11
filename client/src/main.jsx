// This file is the entry point of the React application. It sets up the root component and integrates essential libraries for routing, state management, and UI notifications.

import { createRoot } from "react-dom/client"; // Importing `createRoot` from React DOM to render the application.
import App from "./App.jsx"; // Importing the main `App` component, which serves as the root of the application.
import "./index.css"; // Importing global styles for the application.
import { BrowserRouter } from "react-router-dom"; // Importing `BrowserRouter` for enabling client-side routing.
import { Provider } from "react-redux"; // Importing `Provider` from Redux to connect the application with the Redux store.
import store from "./store/store.js"; // Importing the configured Redux store.
import { Toaster } from "@/components/ui/toaster"; // Importing the `Toaster` component for displaying toast notifications.

// Rendering the Application
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* 
      Explanation:
      - `BrowserRouter`: Wraps the application to enable client-side routing using React Router.
    */}
    <Provider store={store}>
      {/* 
        Explanation:
        - `Provider`: Connects the Redux store to the application, making the global state accessible to all components.
      */}
      <App />
      {/* 
        Explanation:
        - `App`: The root component of the application, which contains the main structure and logic.
      */}
      <Toaster />
      {/* 
        Explanation:
        - `Toaster`: A component for displaying toast notifications globally across the application.
      */}
    </Provider>
  </BrowserRouter>
);

/* 
  Summary of the File's Purpose:
  This file serves as the entry point of the React application. Key features include:
  1. **React DOM Rendering**: Uses `createRoot` to render the application into the DOM element with the ID `root`.
  2. **Routing**: Integrates `BrowserRouter` to enable client-side routing for navigation between different pages or views.
  3. **State Management**: Connects the Redux store to the application using the `Provider` component, allowing global state management.
  4. **UI Notifications**: Includes the `Toaster` component to display toast notifications for user feedback (e.g., success or error messages).
  5. **Global Styles**: Imports `index.css` to apply global styles consistently across the application.
*/