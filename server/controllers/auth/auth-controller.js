// This file defines controller functions and middleware for handling user authentication in the backend.
// It includes functionality for user registration, login, logout, and authentication middleware.

const bcrypt = require("bcryptjs"); // Importing `bcryptjs` for password hashing and comparison.
const jwt = require("jsonwebtoken"); // Importing `jsonwebtoken` for generating and verifying authentication tokens.
const User = require("../../models/User"); // Importing the `User` model for database interactions.

// Controller to Register a New User
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body; // Extracts user details from the request body.
  try {
    const checkUser = await User.findOne({ email }); // Checks if a user with the same email already exists.
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });
    const hashPassword = await bcrypt.hash(password, 12); // Hashes the password for secure storage.
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save(); // Saves the new user to the database.
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Controller to Log In a User
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extracts user credentials from the request body.
  try {
    const checkUser = await User.findOne({ email }); // Finds the user by email in the database.
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    ); // Compares the provided password with the hashed password.
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY", // Secret key for signing the JWT token.
      { expiresIn: "60m" } // Token expiration time (60 minutes).
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e); // Logs the error for debugging purposes.
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Controller to Log Out a User
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Middleware to Authenticate Users
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Extracts the token from cookies.
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Verifies the token using the secret key.
    req.user = decoded; // Attaches the decoded user information to the request object.
    next(); // Proceeds to the next middleware or route handler.
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

// Exporting the Functions and Middleware
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };

/* 
  Summary of the File's Purpose:
  This file defines controller functions and middleware for handling user authentication in the backend. Key features include:
  1. **User Registration**: Allows users to register by validating input, hashing passwords, and saving user data to the database.
  2. **User Login**: Authenticates users by verifying their email and password, generating a JWT token, and setting it as a cookie.
  3. **User Logout**: Clears the authentication token from cookies to log out the user.
  4. **Authentication Middleware**: Verifies the JWT token to ensure only authenticated users can access protected routes.
  5. **Error Handling**: Includes robust error handling to log errors and return appropriate responses to the client.
  6. **Security**: Uses `bcrypt` for secure password hashing and `jsonwebtoken` for secure token-based authentication.
*/