// Importing necessary components and configurations
import { filterOptions } from "@/config"; // Configuration file containing filter options
import { Fragment } from "react"; // React Fragment to group elements without adding extra nodes
import { Label } from "../ui/label"; // Custom label component
import { Checkbox } from "../ui/checkbox"; // Custom checkbox component
import { Separator } from "../ui/separator"; // Custom separator component

/**
 * Component: ProductFilter
 * This component renders a filter panel for products. It allows users to apply filters
 * based on predefined categories (e.g., price range, brand, rating). Each category contains
 * multiple options represented by checkboxes. The selected filters are managed externally
 * via the `filters` prop and updated using the `handleFilter` function.
 *
 * @param {Object} props - Component props
 * @param {Object} props.filters - An object containing the currently applied filters
 * @param {Function} props.handleFilter - A callback function to update the filters when a checkbox is toggled
 */
function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white/50 backdrop-blur-[2px] rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      {/* Filter Options Section */}
      <div className="p-4 space-y-4">
        {/* Iterate over each filter category (e.g., Price, Brand, Rating) */}
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            {/* Category Title */}
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {/* Render each filter option within the category */}
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2"
                  >
                    {/* Checkbox for the filter option */}
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() =>
                        handleFilter(keyItem, option.id)
                      } // Trigger filter update on checkbox toggle
                    />
                    {/* Label for the checkbox */}
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            {/* Separator between filter categories */}
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;

/**
 * Explanation of the Code:
 * This component is designed to display a list of filters that users can apply to refine their product search.
 * The filters are grouped into categories (e.g., Price, Brand, Rating), and each category contains multiple
 * filter options represented by checkboxes. The component uses a configuration file (`filterOptions`) to define
 * the available filters and their options.
 *
 * Key Features:
 * - **Dynamic Rendering:** The filter categories and options are dynamically rendered based on the `filterOptions`
 *   configuration. This makes it easy to add or remove filters without modifying the component code.
 * - **Checkbox State Management:** The `checked` state of each checkbox is determined by the `filters` prop,
 *   which tracks the currently applied filters. When a checkbox is toggled, the `handleFilter` function is called
 *   to update the filters.
 * - **Separators:** A visual separator is added between filter categories to improve readability and organization.
 * - **Custom Components:** The component uses custom UI components like `Label`, `Checkbox`, and `Separator` to
 *   ensure consistency with the application's design system.
 *
 * How It Works:
 * 1. The `filterOptions` object defines the available filter categories and their respective options.
 * 2. The component iterates over the keys of `filterOptions` to render each category.
 * 3. For each category, it iterates over the options and renders a checkbox with a label.
 * 4. The `checked` state of each checkbox is determined by checking if the corresponding filter is applied in the
 *    `filters` object.
 * 5. When a checkbox is toggled, the `handleFilter` function is called with the category and option ID to update
 *    the filters.
 *
 * Usage:
 * This component is typically used in an e-commerce application to allow users to filter products by various
 * attributes such as price range, brand, or rating. It provides a clean and intuitive interface for applying
 * filters and ensures that the filtering logic is decoupled from the UI.
 */