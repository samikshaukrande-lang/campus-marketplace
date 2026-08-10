
import express from "express";

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from "../controllers/wishlistController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


// =========================================
// ADD TO WISHLIST
// =========================================

router.post(
    "/",
    authMiddleware,
    addToWishlist
);


// =========================================
// GET MY WISHLIST
// =========================================

router.get(
    "/",
    authMiddleware,
    getWishlist
);


// =========================================
// REMOVE FROM WISHLIST
// =========================================

router.delete(
    "/:productId",
    authMiddleware,
    removeFromWishlist
);


export default router;

