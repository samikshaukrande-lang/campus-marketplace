
import Product from "../models/Product.js";
import Wishlist from "../models/Wishlist.js";


// ================= DASHBOARD =================

export const getDashboard = async (req, res) => {

    try {

        // =========================================
        // LOGGED-IN USER
        // =========================================

        const userId = req.user.id;


        console.log(
            "👤 Dashboard User ID:",
            userId
        );


        // =========================================
        // 1. GET ALL PRODUCTS
        // =========================================

        const allProducts =
            await Product.find()

                .sort({
                    createdAt: -1
                })

                .populate(
                    "seller",
                    "name email college"
                );


        console.log(
            "📦 TOTAL PRODUCTS:",
            allProducts.length
        );


        // =========================================
        // 2. FILTER MY LISTINGS
        // =========================================

        const myListingProducts =
            allProducts.filter(

                (item) => {

                    const sellerId =

                        item?.seller?._id

                        ||

                        item?.seller;


                    console.log(
                        "🔍 PRODUCT:",
                        item.title,
                        "| SELLER:",
                        sellerId,
                        "| USER:",
                        userId
                    );


                    return (

                        String(sellerId)

                        ===

                        String(userId)

                    );

                }

            );


        const myListings =
            myListingProducts.length;


        console.log(
            "🛒 MY LISTINGS:",
            myListings
        );


        // =========================================
        // 3. WISHLIST COUNT
        // =========================================

        const wishlistCount =
            await Wishlist.countDocuments({

                user: userId

            });


        console.log(
            "❤️ WISHLIST COUNT:",
            wishlistCount
        );


        // =========================================
        // 4. RECENT PRODUCTS
        // =========================================

        const recentProducts =
            allProducts.slice(0, 5);


        // =========================================
        // 5. FEATURED PRODUCTS
        // =========================================

        const featuredProducts =
            allProducts.slice(0, 4);


        // =========================================
        // 6. RESPONSE
        // =========================================

        res.status(200).json({

            success: true,

            totalProducts:
                allProducts.length,

            myListings,

            wishlistCount,

            sales: 0,

            recentProducts,

            featuredProducts

        });


    }

    catch (error) {

        console.log(
            "❌ Dashboard Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};

