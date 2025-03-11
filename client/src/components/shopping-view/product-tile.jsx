// Importing necessary components and configurations
import { Card, CardContent, CardFooter } from "../ui/card"; // Custom card components
import { Button } from "../ui/button"; // Custom button component
import { brandOptionsMap, categoryOptionsMap } from "@/config"; // Configuration files for mapping categories and brands
import { Badge } from "../ui/badge"; // Custom badge component for status indicators

/**
 * Component: ShoppingProductTile
 * This component represents a single product tile in the shopping interface. It displays the product's image,
 * title, price, category, brand, and stock status. Users can click on the tile to view product details or add
 * the product to their cart if it is in stock.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - The product object containing details like ID, title, image, price, etc.
 * @param {Function} props.handleGetProductDetails - A callback function to fetch and display detailed information about the product
 * @param {Function} props.handleAddtoCart - A callback function to add the product to the user's cart
 */
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto border-none bg-[#E5DCC389] hover:bg-[#C2A15Da6] backdrop-blur-[8px] hover:backdrop-blur-[10px] shadow-2xl border border-white/20 rounded-lg p-0 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Product Image and Stock Status */}
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[400px] bottom-0 object-cover rounded-t-lg"
          />
          {/* Display stock status or sale badge */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) 
          // Uncomment this block if you want to show a "Sale" badge for discounted products
          // : product?.salePrice > 0 ? (
          //   <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
          //     Sale
          //   </Badge>
          // )
           : null}
        </div>

        {/* Product Details */}
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 text-[#594d5b] font-serif text-center">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground font-semibold font-sans">
              {categoryOptionsMap[product?.category]} {/* Display product category */}
            </span>
            <span className="text-[16px] text-muted-foreground font-semibold font-cursive">
              {brandOptionsMap[product?.need]} {/* Display product brand */}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price} {/* Display original price */}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₹{product?.salePrice} {/* Display discounted price */}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      {/* Add to Cart Button */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-[#6D8F5E] hover:bg-[#2E7D32]"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

/**
 * Explanation of the Code:
 * This component is designed to display a single product tile in an e-commerce application. It provides essential
 * information about the product, such as its image, title, price, category, brand, and stock status. The design
 * includes interactive elements like hover effects and badges to enhance user experience.
 *
 * Key Features:
 * - **Product Image and Stock Status:** Displays the product image with a badge indicating whether the product is
 *   out of stock, has limited stock, or is on sale (commented out but can be enabled).
 * - **Dynamic Pricing:** Shows the original price and, if applicable, the discounted price with a strikethrough on
 *   the original price.
 * - **Category and Brand Mapping:** Uses configuration files (`categoryOptionsMap` and `brandOptionsMap`) to map
 *   product categories and brands to human-readable labels.
 * - **Interactive Design:** Includes hover effects (e.g., scaling and shadow changes) to make the tile visually
 *   appealing and interactive.
 * - **Add to Cart Button:** Provides a button to add the product to the cart. The button is disabled if the product
 *   is out of stock.
 *
 * How It Works:
 * 1. The `ShoppingProductTile` component receives the `product` object as a prop, which contains details like the
 *    product ID, title, image, price, category, brand, and stock status.
 * 2. The product image is displayed with a badge overlay indicating the stock status or sale (if applicable).
 * 3. The product details, including the title, category, brand, and price, are displayed below the image.
 * 4. If the product has a discounted price, the original price is shown with a strikethrough, and the discounted
 *    price is displayed alongside it.
 * 5. The "Add to Cart" button is enabled only if the product is in stock. Clicking the button triggers the
 *    `handleAddtoCart` function, passing the product ID and stock quantity.
 * 6. Clicking anywhere on the product tile (except the button) triggers the `handleGetProductDetails` function to
 *    fetch and display detailed information about the product.
 *
 * Usage:
 * This component is typically used in an e-commerce application to display a grid or list of products. It enhances
 * user experience by providing clear and concise product information, interactive elements, and seamless navigation
 * to detailed views or the shopping cart.
 */