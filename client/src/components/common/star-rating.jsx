import { StarIcon } from "lucide-react"; // Importing StarIcon from lucide-react for the star symbol
import { Button } from "../ui/button"; // Importing Button component to wrap the stars

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating"); // Logging the current rating to the console for debugging

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      // Each button represents a star in the rating
      className={`p-2 rounded-full transition-colors ${
        // Apply different styles based on whether the current star is less than or equal to the rating
        star <= rating
          ? "text-yellow-500 hover:bg-black" // Highlight stars that are part of the current rating
          : "text-black hover:bg-primary hover:text-primary-foreground" // Default styling for unselected stars
      }`}
      variant="outline" // Outline button style
      size="icon" // Set the button size to icon size
      onClick={handleRatingChange ? () => handleRatingChange(star) : null} // If a handleRatingChange function is passed, it will update the rating when a star is clicked
    >
      <StarIcon
        // Apply different colors to the star icon based on whether it is part of the rating
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;

/**
 * Explanation:
 *
 * The `StarRatingComponent` renders a 5-star rating system where users can select a rating by clicking on a star.
 * It takes two props:
 *
 * 1. **rating**: The current rating (a number between 1 and 5) that determines which stars are filled and highlighted.
 * 2. **handleRatingChange**: A callback function that is triggered when a star is clicked, updating the rating.
 *
 * The component:
 * - Renders five buttons, each representing a star.
 * - The `star <= rating` condition checks if the current star should be filled with yellow (indicating it is part of the current rating) or black (for unselected stars).
 * - On clicking a star, the `handleRatingChange` function (if provided) is called with the new rating value corresponding to the clicked star.
 * - The star icon is styled dynamically to show filled or empty stars based on the current rating.
 *
 * This component provides a flexible and interactive way to display and update a star-based rating.
 */
