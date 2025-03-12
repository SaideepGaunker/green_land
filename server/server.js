// This file serves as the entry point for the backend server, setting up the Express application, database connection, and routing.

const express = require("express"); // Importing Express for creating the server.
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB connection.
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies.
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing (CORS).

// Importing route handlers for different sections of the application
const authRouter = require("./routes/auth/auth-routes"); // Routes for authentication.
const adminProductsRouter = require("./routes/admin/products-routes"); // Routes for admin product management.
const adminOrderRouter = require("./routes/admin/order-routes"); // Routes for admin order management.
const shopProductsRouter = require("./routes/shop/products-routes"); // Routes for shop product management.
const shopCartRouter = require("./routes/shop/cart-routes"); // Routes for cart management.
const shopAddressRouter = require("./routes/shop/address-routes"); // Routes for address management.
const shopOrderRouter = require("./routes/shop/order-routes"); // Routes for order management.
const shopSearchRouter = require("./routes/shop/search-routes"); // Routes for product search.
const shopReviewRouter = require("./routes/shop/review-routes"); // Routes for product reviews.
const commonFeatureRouter = require("./routes/common/feature-routes"); // Routes for common features like featured images.

// Establishing a connection to MongoDB using Mongoose
mongoose
  .connect("mongodb+srv://greenland:greenlanProject1@cluster0.vxl4a.mongodb.net/")
  .then(() => console.log("MongoDB connected")) // Logs success message if the connection is successful.
  .catch((error) => console.log(error)); // Logs any errors that occur during the connection.

// Creating the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Setting the port for the server to listen on.

// Middleware Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allows requests from the specified frontend URL.
    methods: ["GET", "POST", "DELETE", "PUT"], // Specifies allowed HTTP methods.
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ], // Specifies allowed headers.
    credentials: true, // Enables sending cookies and credentials with requests.
  })
);
app.use(cookieParser()); // Parses cookies attached to incoming requests.
app.use(express.json()); // Parses incoming JSON payloads.

// Route Definitions
app.use("/api/auth", authRouter); // Authentication routes.
app.use("/api/admin/products", adminProductsRouter); // Admin product management routes.
app.use("/api/admin/orders", adminOrderRouter); // Admin order management routes.
app.use("/api/shop/products", shopProductsRouter); // Shop product management routes.
app.use("/api/shop/cart", shopCartRouter); // Cart management routes.
app.use("/api/shop/address", shopAddressRouter); // Address management routes.
app.use("/api/shop/order", shopOrderRouter); // Order management routes.
app.use("/api/shop/search", shopSearchRouter); // Product search routes.
app.use("/api/shop/review", shopReviewRouter); // Product review routes.
app.use("/api/common/feature", commonFeatureRouter); // Common feature routes.

// Starting the Server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

/* 
  Summary of the File's Purpose:
  This file sets up the backend server for the application. Key features include:
  1. **Database Connection**: Connects to MongoDB using Mongoose, ensuring the application has access to persistent storage.
  2. **Middleware Configuration**:
     - `cors`: Enables Cross-Origin Resource Sharing to allow communication between the frontend and backend.
     - `cookie-parser`: Parses cookies for managing session or authentication tokens.
     - `express.json`: Parses incoming JSON payloads for API requests.
  3. **Route Management**: Organizes and mounts various route handlers for different sections of the application, such as authentication, products, orders, and reviews.
  4. **Server Initialization**: Starts the Express server on the specified port, making the application accessible to clients.
*/