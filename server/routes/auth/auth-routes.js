const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const router = express.Router();

/**
 * Route: POST /register
 * Registers a new user by invoking the `registerUser` controller function.
 */
router.post("/register", registerUser);

/**
 * Route: POST /login
 * Authenticates a user by invoking the `loginUser` controller function.
 */
router.post("/login", loginUser);

/**
 * Route: POST /logout
 * Logs out a user by invoking the `logoutUser` controller function.
 */
router.post("/logout", logoutUser);

/**
 * Route: GET /check-auth
 * Middleware: `authMiddleware`
 * Checks if the user is authenticated by verifying the token using the `authMiddleware`.
 * If authenticated, it returns the user details.
 */
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

/**
 * Explanation of the Code:
 * This module defines the routes for authentication-related operations in an Express.js application. It uses the `express.Router`
 * to organize and manage these routes. Below is a detailed explanation of each route:
 *
 * 1. **POST /register:**
 *    - Invokes the `registerUser` controller function to handle user registration.
 *    - This route is used to create a new user account in the system.
 *
 * 2. **POST /login:**
 *    - Invokes the `loginUser` controller function to handle user authentication.
 *    - This route is used to authenticate a user and generate a session or token upon successful login.
 *
 * 3. **POST /logout:**
 *    - Invokes the `logoutUser` controller function to handle user logout.
 *    - This route is used to invalidate the user's session or token, effectively logging them out.
 *
 * 4. **GET /check-auth:**
 *    - Uses the `authMiddleware` to verify if the user is authenticated.
 *    - If the middleware successfully authenticates the user, it retrieves the user details from `req.user` and sends them in the response.
 *    - This route is useful for checking the authentication status of a user and retrieving their details.
 *
 * The `authMiddleware` ensures that only authenticated users can access the `/check-auth` route by validating the token or session.
 * This module provides a clean and modular way to manage authentication routes, making it easy to extend or modify as needed.
 */