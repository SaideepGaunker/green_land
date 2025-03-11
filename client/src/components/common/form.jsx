import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  // This function renders the appropriate input component based on the 'componentType' from formControls
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || ""; // Default value is empty string if no value is set in formData

    // Check the component type and render the corresponding input component
    switch (getControlItem.componentType) {
      case "input":
        // Render a regular input field
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        // Render a dropdown/select field
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        // Render a textarea field
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        // Default to rendering an input field if the component type is not recognized
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {/* Render each form control */}
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            {/* Label for the form control */}
            <Label className="mb-1">{controlItem.label}</Label>
            {/* Render the appropriate input based on the componentType */}
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      {/* Submit button with optional disabled state */}
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

/**
 * Explanation:
 *
 * The `CommonForm` component is a dynamic form builder that renders different types of form fields 
 * based on the provided `formControls` array. It supports various form control types such as inputs, selects, 
 * and textareas, and handles form submission with customizable button text and disabled states.
 *
 * 1. **Dynamic Form Fields**:
 *    - The form fields are dynamically generated based on the `formControls` array, which contains 
 *      details about each control (like `name`, `label`, `type`, etc.).
 *    - For each control, the component checks the `componentType` and renders the appropriate input element 
 *      (Input, Select, Textarea, etc.) using the `renderInputsByComponentType` function.
 *    
 * 2. **Form Data Binding**:
 *    - The form fields are bound to the `formData` object, and their values are updated using the 
 *      `setFormData` function whenever the user interacts with the input fields (e.g., typing in a text field, 
 *      selecting an option in a dropdown).
 *    
 * 3. **Form Submission**:
 *    - The form submission is handled by the `onSubmit` function passed as a prop. When the user clicks the 
 *      submit button, the form data is sent to the function for further processing.
 *
 * 4. **Button State**:
 *    - The submit button's text can be customized through the `buttonText` prop, and the button can be 
 *      conditionally disabled using the `isBtnDisabled` prop.
 *
 * This component is reusable for building different forms, allowing for flexible control over form input types, 
 * handling user input, and submitting the data.
 */
