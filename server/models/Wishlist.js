
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {

        // Logged-in User
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        // Product added to wishlist
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }

    },
    {
        timestamps: true
    }
);


// Prevent same product from being added
// multiple times by the same user

wishlistSchema.index(
    {
        user: 1,
        product: 1
    },
    {
        unique: true
    }
);


const Wishlist = mongoose.model(
    "Wishlist",
    wishlistSchema
);

export default Wishlist;

