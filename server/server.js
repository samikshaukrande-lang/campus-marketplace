
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";

// ❤️ Wishlist Route
import wishlistRoutes from "./routes/wishlistRoutes.js";

// 🎟️ Campus Deals Route
import campusDealRoutes from "./routes/campusDealRoutes.js";


dotenv.config();


// =========================================
// CONNECT MONGODB
// =========================================

connectDB();


const app = express();


// =========================================
// MIDDLEWARE
// =========================================

app.use(cors());


// JSON size limit

app.use(
  express.json({
    limit: "10mb",
  })
);


app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);


// =========================================
// ROUTES
// =========================================


// Authentication Routes

app.use(
  "/api/auth",
  authRoutes
);


// Product Routes

app.use(
  "/api/products",
  productRoutes
);


// Profile Routes

app.use(
  "/api/users",
  profileRoutes
);


// Chat Routes

app.use(
  "/api/chat",
  chatRoutes
);


// Dashboard Routes

app.use(
  "/api/dashboard",
  dashboardRoutes
);


// Wishlist Routes ❤️

app.use(
  "/api/wishlist",
  wishlistRoutes
);


// Lost & Found Routes 🚨

app.use(
  "/api/lost-found",
  lostFoundRoutes
);


// Campus Deals Routes 🎟️

app.use(
  "/api/campus-deals",
  campusDealRoutes
);


// =========================================
// TEST API
// =========================================

app.get("/", (req, res) => {

  res.send(
    "🚀 Campus Marketplace Backend Running"
  );

});


// =========================================
// SERVER PORT
// =========================================

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `✅ Server running on port ${PORT}`
  );

});

