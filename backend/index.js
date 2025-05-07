import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

import cors from "cors";
const app = express();
dotenv.config();

const port = process.env.PORT;
const MONOGO_URL = process.env.MONOGO_URI;

//middleware
app.use(express.json());
app.use(cookieParser());
//const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

app.use(cors({
  origin: "http://localhost:5173",  // Allow requests only from localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
  credentials: true,  // Allow cookies and headers
}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// DB Code
mongoose.connect(MONOGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if MongoDB connection fails
  });

// defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudinary configuration with error handling
try {
  // Verify environment variables
  if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_SECRET_KEY) {
    throw new Error("Missing Cloudinary configuration. Please check your .env file");
  }

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
    secure: true
  });

  // Verify Cloudinary configuration
  console.log("\nCloudinary Configuration Status:");
  console.log("Cloud Name:", process.env.CLOUD_NAME);
  console.log("API Key:", process.env.CLOUD_API_KEY ? "Configured" : "Not configured");
  console.log("API Secret:", process.env.CLOUD_SECRET_KEY ? "Configured" : "Not configured\n");

  // Test Cloudinary connection
  cloudinary.api.ping()
    .then(result => {
      console.log("✅ Cloudinary connection test successful");
      console.log("Cloud Name verified:", process.env.CLOUD_NAME);
    })
    .catch(error => {
      console.error("\n❌ Cloudinary connection test failed");
      console.error("Error details:", error.message);
      console.error("Current Cloud Name:", process.env.CLOUD_NAME);
      console.error("Please verify your Cloudinary credentials in the .env file\n");
      process.exit(1);
    });
} catch (error) {
  console.error("\n❌ Cloudinary configuration error:", error.message);
  console.error("Please check your .env file and ensure all Cloudinary credentials are correct\n");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`\n✅ Server is running on port ${port}\n`);
});
