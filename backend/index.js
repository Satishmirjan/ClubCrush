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

// const allowedOrigins = [
//   'http://localhost:5173', // local dev
//   'https://clubcrush-sn.onrender.com', // Render frontend
//   'https://your-frontend.netlify.app',  // Netlify frontend (if used)
//   // add any other domains you use
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps, curl, etc.)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

//const cors = require('cors');

// Add your allowed frontend URLs here
const allowedOrigins = [
  'http://localhost:5174',             // for local dev
  process.env.FRONTEND_URL,            // for production frontend
  'https://clubcrush.netlify.app',     // for Netlify production
  'https://clubcrush-sn.onrender.com'  // optional: another frontend if needed
].filter(Boolean); // Remove any undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: process.env.NODE_ENV === 'production' ? '/tmp' : './tmp',
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
    abortOnLimit: true,
    responseOnLimit: 'File size limit has been reached'
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
