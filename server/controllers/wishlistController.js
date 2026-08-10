
import Wishlist from "../models/Wishlist.js";


// =========================================
// ADD TO WISHLIST
// =========================================

export const addToWishlist = async (req, res) => {

    try {

        const userId = req.user.id;

        const { productId } = req.body;


        console.log("❤️ ADD WISHLIST");
        console.log("User ID:", userId);
        console.log("Product ID:", productId);


        // Product ID check

        if (!productId) {

            return res.status(400).json({

                success: false,

                message: "Product ID is required"

            });

        }


        // Check existing wishlist

        const existingWishlist =
            await Wishlist.findOne({

                user: userId,

                product: productId

            });


        if (existingWishlist) {

            return res.status(400).json({

                success: false,

                message:
                    "Product already in wishlist"

            });

        }


        // Create wishlist

        const wishlist =
            await Wishlist.create({

                user: userId,

                product: productId

            });


        // Populate product

        await wishlist.populate({

            path: "product",

            populate: {

                path: "seller",

                select: "name"

            }

        });


        console.log(
            "✅ Wishlist Created:",
            wishlist
        );


        res.status(201).json({

            success: true,

            message:
                "Product added to wishlist ❤️",

            wishlist

        });


    } catch (error) {

        console.log(
            "❌ Add Wishlist Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =========================================
// GET MY WISHLIST
// =========================================

export const getWishlist = async (req, res) => {

    try {

        const userId = req.user.id;


        console.log(
            "❤️ GET WISHLIST USER ID:",
            userId
        );


        const wishlist =
            await Wishlist.find({

                user: userId

            })

            .populate({

                path: "product",

                populate: {

                    path: "seller",

                    select: "name"

                }

            })

            .sort({

                createdAt: -1

            });


        console.log(
            "❤️ WISHLIST DATABASE RESULT:",
            wishlist
        );


        console.log(
            "❤️ WISHLIST COUNT:",
            wishlist.length
        );


        res.status(200).json({

            success: true,

            count: wishlist.length,

            wishlist

        });


    } catch (error) {

        console.log(
            "❌ Get Wishlist Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =========================================
// REMOVE FROM WISHLIST
// =========================================

export const removeFromWishlist = async (req, res) => {

    try {

        const userId = req.user.id;

        const { productId } = req.params;


        console.log(
            "🗑️ REMOVE WISHLIST"
        );

        console.log(
            "User ID:",
            userId
        );

        console.log(
            "Product ID:",
            productId
        );


        const wishlist =
            await Wishlist.findOneAndDelete({

                user: userId,

                product: productId

            });


        if (!wishlist) {

            return res.status(404).json({

                success: false,

                message:
                    "Product not found in wishlist"

            });

        }


        console.log(
            "✅ Wishlist Removed:",
            wishlist
        );


        res.status(200).json({

            success: true,

            message:
                "Product removed from wishlist ❤️"

        });


    } catch (error) {

        console.log(
            "❌ Remove Wishlist Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

