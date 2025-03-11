// This file defines the `AuthLogin` component, which is responsible for rendering the login form and handling user authentication.
// It uses a reusable `CommonForm` component to manage form fields and integrates with Redux for authentication logic.

import CommonForm from "@/components/common/form"; // Importing the reusable `CommonForm` component for rendering form fields.
import { useToast } from "@/hooks/use-toast"; // Importing the `useToast` hook for displaying notifications.
import { loginFormControls } from "@/config"; // Importing the configuration for login form fields.
import { loginUser } from "@/store/auth-slice"; // Importing the Redux action to handle user login.
import { useState } from "react"; // Importing React's `useState` hook for managing form state.
import { useDispatch } from "react-redux"; // Importing Redux's `useDispatch` hook for dispatching actions.
import { Link } from "react-router-dom"; // Importing `Link` for navigation between pages.

// Initial state for the form data
const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState); // State to manage form input values.
  const dispatch = useDispatch(); // Redux dispatch hook for triggering actions.
  const { toast } = useToast(); // Hook for displaying toast notifications.

  // Function to handle form submission
  function onSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior.
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // If login is successful, display a success notification.
        toast({
          title: data?.payload?.message,
        });
      } else {
        // If login fails, display an error notification.
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4 border p-6 bg-white/30 backdrop-blur-[2px] shadow-2xl border border-white/80 rounded-b-[20px] border-t-0">
      {/* 
        Explanation:
        - The container is styled with Tailwind CSS classes to create a visually appealing and responsive layout.
        - `mx-auto`: Centers the container horizontally.
        - `max-w-md`: Limits the maximum width of the container.
        - `space-y-4`: Adds vertical spacing between child elements.
        - `backdrop-blur-[2px]`: Applies a blur effect to the background for better readability.
      */}

      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Login Form */}
      <CommonForm
        formControls={loginFormControls} // Passes the configuration for login form fields.
        buttonText={"Sign In"} // Label for the submit button.
        formData={formData} // Current form data state.
        setFormData={setFormData} // Function to update form data state.
        onSubmit={onSubmit} // Function to handle form submission.
      />
    </div>
  );
}

export default AuthLogin;

/* 
  Summary of the File's Purpose:
  This file defines the `AuthLogin` component, which provides a login interface for users. Key features include:
  1. **Reusable Form**: Uses the `CommonForm` component to render and manage form fields dynamically based on the `loginFormControls` configuration.
  2. **State Management**: Uses React's `useState` to manage form input values and Redux's `useDispatch` to handle authentication logic.
  3. **Notifications**: Displays success or error messages using the `useToast` hook after form submission.
  4. **Navigation**: Includes a link to the registration page for users who do not have an account.
  5. **Styling**: Styled with Tailwind CSS for a clean and responsive design.
*/