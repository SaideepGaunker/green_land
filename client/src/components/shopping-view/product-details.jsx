// This file defines a `ProductDetailsDialog` component that displays detailed information about a product in a modal dialog.
// It includes product details, reviews, and functionality to add the product to the cart or submit a review.

import { StarIcon } from "lucide-react"; // Importing the `StarIcon` for rating-related UI.
import { Avatar, AvatarFallback } from "../ui/avatar"; // Importing `Avatar` and `AvatarFallback` for user avatars in reviews.
import { Button } from "../ui/button"; // Importing `Button` for interactive actions like "Add to Cart" and "Submit Review".
import { Dialog, DialogContent } from "../ui/dialog"; // Importing `Dialog` and `DialogContent` for the modal dialog.
import { Separator } from "../ui/separator"; // Importing `Separator` to visually separate sections.
import { Input } from "../ui/input"; // Importing `Input` for the review message field.
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management.
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importing actions to manage cart operations.
import { useToast } from "../ui/use-toast"; // Importing `useToast` for displaying notifications.
import { setProductDetails } from "@/store/shop/products-slice"; // Importing action to reset product details.
import { Label } from "../ui/label"; // Importing `Label` for form fields.
import StarRatingComponent from "../common/star-rating"; // Importing a reusable star rating component.
import { useEffect, useState } from "react"; // Importing React hooks for state and side effects.
import { addReview, getReviews } from "@/store/shop/review-slice"; // Importing actions to manage reviews.

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState(""); // State to store the review message.
  const [rating, setRating] = useState(0); // State to store the selected rating.
  const dispatch = useDispatch(); // Redux dispatch hook for triggering actions.
  const { user } = useSelector((state) => state.auth); // Extracting the authenticated user from Redux state.
  const { cartItems } = useSelector((state) => state.shopCart); // Extracting cart items from Redux state.
  const { reviews } = useSelector((state) => state.shopReview); // Extracting reviews for the current product from Redux state.
  const { toast } = useToast(); // Hook for displaying toast notifications.

  // Function to handle changes in the star rating.
  function handleRatingChange(getRating) {
    console.log(getRating, "getRating"); // Logs the selected rating for debugging.
    setRating(getRating); // Updates the rating state.
  }

  // Function to handle adding a product to the cart.
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || []; // Retrieves the current cart items or initializes an empty array.
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      ); // Finds the index of the current product in the cart.
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity; // Gets the current quantity of the product in the cart.
        if (getQuantity + 1 > getTotalStock) {
          // Checks if adding one more unit exceeds the available stock.
          toast({
            title: `Only ${getTotalStock} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id)); // Fetches updated cart items after adding the product.
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Function to close the dialog and reset states.
  function handleDialogClose() {
    setOpen(false); // Closes the dialog.
    dispatch(setProductDetails()); // Resets the product details in Redux state.
    setRating(0); // Resets the rating state.
    setReviewMsg(""); // Resets the review message state.
  }

  // Function to handle submitting a review.
  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0); // Resets the rating state.
        setReviewMsg(""); // Resets the review message state.
        dispatch(getReviews(productDetails?._id)); // Fetches updated reviews for the product.
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  // Effect to fetch reviews when the product details change.
  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews"); // Logs the reviews for debugging.

  // Calculates the average review score.
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="flex flex-wrap max-h-[70vh] overflow-y-scroll border rounded-[20px] sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-[#ffffff7d] backdrop-blur-[6px] border-none"
      >
        {/* Wrapper to handle responsive layout */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Product Image Section */}
          <div className="relative overflow-hidden rounded-lg w-full md:w-1/2">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Product Details and Reviews Section */}
          <div className="w-full md:w-1/2">
            {/* Product Title and Description */}
            <div>
              <h1 className="text-3xl font-extrabold text-[#f5f5f5] font-serif text-center">
                {productDetails?.title}
              </h1>
              <p className="text-[#d7edbb] text-2xl mb-5 mt-4 font-sans">
                {productDetails?.description}
              </p>
            </div>

            {/* Price and Sale Price */}
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold text-primary text-[#adadc9] ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ₹{productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-[#d1d566]">
                  ₹{productDetails?.salePrice}
                </p>
              ) : null}
            </div>

            {/* Average Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview} />
              </div>
              <span className="text-[#d1d566]">
                ({averageReview.toFixed(2)})
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-5 mb-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-[#6D8F5E] hover:bg-[#2E7D32]"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>

            <Separator />

            {/* Reviews Section */}
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4 text-[#322d31] font-semibold">
                Reviews
              </h2>
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem._id} className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                        <p className="text-[#f5f5f5]">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-[#3f3f4e]">No Reviews</h1>
                )}
              </div>

              {/* Write a Review Section */}
              <div className="mt-10 flex-col flex gap-2 text-[#000]">
                <Label>Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;

/* 
  Summary of the File's Purpose:
  This file defines a `ProductDetailsDialog` component that provides a detailed view of a product in a modal dialog.
  Key features include:
  1. **Product Image**: Displays the product image prominently.
  2. **Product Details**: Shows the title, description, price, and sale price.
  3. **Average Rating**: Displays the average rating of the product based on user reviews.
  4. **Add to Cart**: Allows users to add the product to their cart, with stock validation.
  5. **Reviews**: Lists all reviews for the product, including user avatars, ratings, and messages.
  6. **Write a Review**: Enables authenticated users to submit reviews with a rating and message.
  The component uses Redux for state management and integrates with APIs for cart and review operations.
*/