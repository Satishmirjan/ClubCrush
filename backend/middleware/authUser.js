import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.jwt;
    console.log("Middleware : Token retrieved from cookies:", token);

    if (!token) {
      return res.status(401).json({ error: "User not authenticated - No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Middleware : Token decoded:", decoded);

    // Find user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error occurring in Authentication:", error);
    return res.status(401).json({ error: "User not authenticated - Error occurred" });
  }
};

// Authorization Middleware
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with role ${req.user.role} not allowed` });
    }
    next();
  };
};
