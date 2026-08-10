
import express from "express";

import Product from "../models/Product.js";

import {
    addProduct,
    getProducts,
    getProductById,
    getMyProducts
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// GET ALL PRODUCTS
// ===============================

router.get(
    "/",
    getProducts
);


// ===============================
// GET MY PRODUCTS
// ===============================

router.get(
    "/my",
    authMiddleware,
    getMyProducts
);


// ===============================
// GET SINGLE PRODUCT
// ===============================

router.get(
    "/:id",
    getProductById
);


// ===============================
// ADD PRODUCT
// ===============================

router.post(
    "/",
    authMiddleware,
    addProduct
);


// ===============================
// DELETE PRODUCT
// ===============================

router.delete(
    "/:id",
    async (req, res) => {

        try {

            const product =
                await Product.findByIdAndDelete(
                    req.params.id
                );


            if (!product) {

                return res.status(404).json({

                    success: false,

                    message: "Product not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Product Deleted Successfully ✅"

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }
);


// ===============================
// UPDATE PRODUCT
// ===============================

router.put(
    "/:id",
    async (req, res) => {

        try {

            const product =
                await Product.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
                    }

                );


            if (!product) {

                return res.status(404).json({

                    success: false,

                    message: "Product not found"

                });

            }


            res.json({

                success: true,

                product

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }
);


export default router;
