
import express from "express";

import {
    registerUser,
    loginUser,
    googleLogin
} from "../controllers/authController.js";

const router = express.Router();

// Register API
router.post(
    "/register",
    registerUser
);

// Login API
router.post(
    "/login",
    loginUser
);

// Google Login API
router.post(
    "/google",
    googleLogin
);

export default router;

