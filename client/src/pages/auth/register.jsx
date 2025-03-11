// Importing necessary components and hooks
import CommonForm from "@/components/common/form"; // Generic form component for input fields
import { useToast } from "@/hooks/use-toast"; // Custom toast notification hook
import { registerFormControls } from "@/config"; // Configuration file for form controls
import { registerUser } from "@/store/auth-slice"; // Redux action to register a new user
import { useState } from "react"; // React hook for state management
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions
import { Link, useNavigate } from "react-router-dom"; // React Router utilities for navigation

// Initial state for the registration form
const initialState = {
  userName: "",
  email: "",
  password: "",
};

/**
 * Component: AuthRegister
 * This component provides a registration form for users to create a new account. It includes fields for
 * username, email, and password, and handles form submission using Redux to register the user.
 */
function AuthRegister() {
  const [formData, setFormData] = useState(initialState); // State to store form data
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { toast } = useToast(); // Hook for displaying toast notifications

  /**
   * Function: onSubmit
   * Handles the submission of the registration form. Dispatches the `registerUser` Redux action with the
   * form data and navigates to the login page upon successful registration.
   *
   * @param {Event} event - The form submission event
   */
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log("Response from server:", data); // Log server response for debugging
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message, // Display success message
        });
        navigate("/auth/login"); // Navigate to the login page
      } else {
        toast({
          title: data?.payload?.message, // Display error message
          variant: "destructive", // Use destructive variant for errors
        });
      }
    });
  }

  console.log(formData); // Log form data for debugging

  return (
    <div className="mx-auto w-full max-w-md space-y-4 border p-6 bg-white/30 backdrop-blur-[2px] shadow-2xl border border-white/80 rounded-b-[20px] border-t-0">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Registration Form */}
      <CommonForm
        formControls={registerFormControls} // Form configuration from the config file
        buttonText={"Sign Up"} // Button text for the form
        formData={formData} // Current form data
        setFormData={setFormData} // Function to update form data
        onSubmit={onSubmit} // Function to handle form submission
      />
    </div>
  );
}

export default AuthRegister;

/**
 * Explanation of the Code:
 * This component provides a registration form for users to create a new account. It uses a generic form component
 * (`CommonForm`) to render input fields based on a configuration file (`registerFormControls`). The form collects
 * the user's username, email, and password, and submits the data to the server using Redux.
 *
 * Key Features:
 * - **Dynamic Form Rendering:** The form fields are dynamically generated based on the `registerFormControls`
 *   configuration, making it easy to add or modify fields without changing the code.
 * - **Redux Integration:** Uses Redux to dispatch the `registerUser` action and handle the registration process.
 * - **Error Handling:** Displays error messages using toast notifications if the registration fails.
 * - **Navigation:** Redirects the user to the login page upon successful registration.
 * - **Responsive Design:** The form is styled to ensure a clean and user-friendly interface on all devices.
 *
 * How It Works:
 * 1. The `AuthRegister` component initializes the form data with empty values for username, email, and password.
 * 2. When the user submits the form, the `onSubmit` function is triggered. It dispatches the `registerUser` Redux
 *    action with the form data.
 * 3. If the registration is successful, a success toast notification is displayed, and the user is redirected to
 *    the login page.
 * 4. If the registration fails, an error toast notification is displayed with the error message from the server.
 * 5. The form fields are dynamically rendered using the `CommonForm` component, which takes care of rendering
 *    inputs and handling user input.
 *
 * Usage:
 * This component is typically used in an authentication flow to allow users to create a new account. It enhances
 * usability by providing a clear and organized interface for registration while ensuring smooth integration with
 * the backend and Redux state management.
 */