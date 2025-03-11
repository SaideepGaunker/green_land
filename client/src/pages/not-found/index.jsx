// This file defines the `NotFound` component, which is displayed when a user navigates to a route that does not exist.
// It provides a visually appealing 404 error page with a Lottie animation and a "Go to Homepage" button.

import { useSelector } from "react-redux"; // Importing Redux's `useSelector` hook to access the authenticated user's state.
import { useNavigate } from "react-router-dom"; // Importing `useNavigate` for programmatic navigation.
import Lottie from "lottie-react"; // Importing the `Lottie` component to render animations.
import notFoundAnimation from "../../assets/404.json"; // Importing the Lottie JSON file for the 404 animation.

function NotFound() {
  const { user } = useSelector((state) => state.auth); // Extracting the authenticated user from Redux state.
  const navigate = useNavigate(); // Hook for navigating programmatically.

  // Function to determine the appropriate homepage link based on the user's role or authentication status.
  const getHomePageLink = () => {
    if (user) {
      return user.role === "admin" ? "/admin/dashboard" : "/shop/home";
    }
    return "/";
  };

  // Function to handle navigation to the homepage.
  const handleGoHome = () => {
    navigate(getHomePageLink());
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-white">
      {/* 
        Explanation:
        - The container is styled with Tailwind CSS classes to center content both vertically and horizontally.
        - `h-screen w-screen`: Ensures the container spans the full height and width of the viewport.
        - `bg-white`: Sets a white background for the page.
      */}

      {/* Go Back Button - Top Left */}
      <button
        onClick={handleGoHome}
        className="absolute top-6 left-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition cursor-pointer z-50"
      >
        {/* 
          Explanation:
          - The "Go to Homepage" button is positioned in the top-left corner using `absolute` positioning.
          - Styled with Tailwind CSS for a clean and interactive design.
          - `z-50`: Ensures the button appears above other elements.
        */}
        Go to Homepage
      </button>

      {/* Lottie Animation - Full Screen */}
      <Lottie
        animationData={notFoundAnimation} // Passes the Lottie JSON data for the animation.
        loop // Enables looping of the animation.
        autoplay // Automatically starts the animation.
        className="w-full h-full max-w-screen max-h-screen"
        /* 
          Explanation:
          - The Lottie animation is set to fill the entire screen using `w-full h-full`.
          - `max-w-screen max-h-screen`: Ensures the animation does not exceed the viewport dimensions.
        */
      />
    </div>
  );
}

export default NotFound;

/* 
  Summary of the File's Purpose:
  This file defines the `NotFound` component, which serves as a 404 error page for routes that do not exist. Key features include:
  1. **Dynamic Navigation**: Determines the appropriate homepage link based on the user's role (`admin` or regular user) or authentication status.
  2. **Interactive Button**: Provides a "Go to Homepage" button in the top-left corner for easy navigation back to the homepage.
  3. **Lottie Animation**: Displays an engaging 404 animation using the `Lottie` library to enhance the user experience.
  4. **Responsive Design**: Styled with Tailwind CSS to ensure the page looks good on all screen sizes.
*/