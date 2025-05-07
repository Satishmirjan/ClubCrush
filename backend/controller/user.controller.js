import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    // Validate required fields
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg, png, and webp are allowed",
      });
    }

    const { email, name, password, phone, club, role } = req.body;
    
    // Validate all required fields
    if (!email || !name || !password || !phone || !club || !role) {
      return res.status(400).json({ 
        message: "Please fill all required fields",
        missingFields: {
          email: !email,
          name: !name,
          password: !password,
          phone: !phone,
          club: !club,
          role: !role
        }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists with this email" 
      });
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ 
        message: "Phone number already registered" 
      });
    }

    // Upload photo to Cloudinary
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath,
        {
          folder: "user_photos",
          resource_type: "auto",
        }
      );
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({ 
        message: "Failed to upload photo",
        error: uploadError.message 
      });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      club,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    // Save user to database
    await newUser.save();

    // Create token and set cookie
    const token = await createTokenAndSaveCookies(newUser._id, res);

    // Return success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        club: newUser.club,
        photo: newUser.photo,
        createdOn: newUser.createdOn,
      },
      token: token,
    });

  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error",
        errors: error.errors 
      });
    }
    
    if (error.http_code === 401) {
      return res.status(500).json({ 
        message: "Cloudinary authentication failed",
        error: error.message 
      });
    }

    // Generic error response
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    const token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo:user.photo,
        token: token,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};
