
import Product from "../models/Product.js";

// ===============================
// ADD PRODUCT
// ===============================

export const addProduct = async (req, res) => {

    try {

        const product = await Product.create({

            title: req.body.title,

            description: req.body.description,

            price: req.body.price,

            category: req.body.category,

            image: req.body.image,

            condition: req.body.condition,

            college: req.body.college,

            pickupLocation: req.body.pickupLocation,

            contactNumber: req.body.contactNumber,

            // Logged-in user
            seller: req.user.id

        });


        res.status(201).json({

            success: true,

            message: "Product Added Successfully ✅",

            product

        });

    }

    catch (error) {

        console.log(
            "❌ Add Product Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find()

            .populate(
                "seller",
                "name email college"
            )

            .sort({
                createdAt: -1
            });


        res.status(200).json(products);

    }

    catch (error) {

        console.log(
            "❌ Get Products Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// GET PRODUCT BY ID
// ===============================

export const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        )

        .populate(
            "seller",
            "name email college"
        );


        // Product not found

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        res.status(200).json({

            success: true,

            product

        });

    }

    catch (error) {

        console.log(
            "❌ Get Product By ID Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// GET MY PRODUCTS
// ===============================

export const getMyProducts = async (req, res) => {

    try {

        const products = await Product.find({

            seller: req.user.id

        })

        .populate(
            "seller",
            "name email college"
        )

        .sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,

            products

        });

    }

    catch (error) {

        console.log(
            "❌ Get My Products Error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

