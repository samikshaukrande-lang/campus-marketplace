
import React from "react";

import "./ProductDetails.css";

import {
    FaHeart,
    FaCommentDots,
    FaUser,
    FaMapMarkerAlt,
    FaStar,
    FaShoppingCart,
    FaShareAlt,
    FaPhone
} from "react-icons/fa";

import {
    useLocation,
    useNavigate
} from "react-router-dom";


const ProductDetails = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const product = location.state;


    console.log(
        "PRODUCT DETAILS:",
        product
    );


    // ===============================
    // WISHLIST
    // ===============================

    const addWishlist = () => {

        if (!product) {

            alert("Product not found");

            return;

        }


        let wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];


        const exists = wishlist.find(
            (item) =>
                item._id === product._id
        );


        if (!exists) {

            wishlist.push(product);

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

            alert(
                "Product Added To Wishlist"
            );

        }

        else {

            alert(
                "Already Added"
            );

        }

    };


    // ===============================
    // SHARE
    // ===============================

    const shareProduct = async () => {

        if (!product) {

            return;

        }


        const shareData = {

            title: product.title,

            text:
                `${product.title}\nPrice: ₹${product.price}`,

            url:
                window.location.href

        };


        try {

            if (navigator.share) {

                await navigator.share(
                    shareData
                );

            }

            else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert(
                    "Link Copied"
                );

            }

        }

        catch (error) {

            console.log(error);

        }

    };


    // ===============================
    // PRODUCT NOT FOUND
    // ===============================

    if (!product) {

        return (

            <div className="product-page">

                <h2>
                    Product not found
                </h2>

            </div>

        );

    }


    return (

        <div className="product-page">


            {/* ===============================
                MAIN PRODUCT
            =============================== */}

            <div className="product-main">


                {/* ===============================
                    PRODUCT IMAGE
                =============================== */}

                <div className="product-image">

                    <img
                        src={product.image}
                        alt={product.title}
                    />

                </div>


                {/* ===============================
                    PRODUCT INFO
                =============================== */}

                <div className="product-info">


                    <h1>
                        {product.title}
                    </h1>


                    {/* RATING */}

                    <div className="rating">

                        <FaStar />

                        <span>
                            4.5
                        </span>

                    </div>


                    {/* PRICE */}

                    <div className="price">

                        ₹{product.price}

                    </div>


                    {/* PRODUCT INFORMATION */}

                    <p>

                        <strong>
                            Category:
                        </strong>{" "}

                        {product.category}

                    </p>


                    <p>

                        <strong>
                            Condition:
                        </strong>{" "}

                        {product.condition || "Good"}

                    </p>


                    <p>

                        <strong>
                            College:
                        </strong>{" "}

                        {product.college || "Not Mentioned"}

                    </p>


                    <p>

                        <strong>
                            Pickup Location:
                        </strong>{" "}

                        {product.pickupLocation || "Campus"}

                    </p>


                    {/* SELLER */}

                    <p>

                        <strong>
                            Seller:
                        </strong>{" "}

                        {

                            product?.seller?.name

                            ||

                            product?.seller

                            ||

                            "Student Seller"

                        }

                    </p>


                    {/* DESCRIPTION */}

                    <p className="description">

                        {product.description}

                    </p>


                    {/* ===============================
                        ACTION BUTTONS
                    =============================== */}

                    <div className="buttons">


                        {/* CHAT */}

                        <button
                            className="chat-btn"
                            onClick={() => {

                                console.log(
                                    "SENDING PRODUCT TO CHAT:",
                                    product
                                );


                                navigate(
                                    "/chat",
                                    {
                                        state: product
                                    }
                                );

                            }}
                        >

                            <FaCommentDots />

                            Chat Seller

                        </button>


                        {/* WISHLIST */}

                        <button
                            className="wish-btn"
                            onClick={addWishlist}
                        >

                            <FaHeart />

                            Wishlist

                        </button>


                        {/* SHARE */}

                        <button
                            className="share-btn"
                            onClick={shareProduct}
                        >

                            <FaShareAlt />

                            Share

                        </button>


                    </div>


                    {/* BUY */}

                    <button
                        className="buy-btn"
                        onClick={() =>
                            alert(
                                "Buy Request Sent Successfully!"
                            )
                        }
                    >

                        <FaShoppingCart />

                        Send Buy Request

                    </button>


                </div>


            </div>


            {/* ===============================
                SELLER CARD
            =============================== */}

            <div className="seller-card">


                <h2>
                    Seller Information
                </h2>


                <div className="seller-details">


                    <div className="seller-icon">

                        <FaUser />

                    </div>


                    <div>


                        <h3>

                            {

                                product?.seller?.name

                                ||

                                product?.seller

                                ||

                                "Student Seller"

                            }

                        </h3>


                        <p>
                            Campus Student
                        </p>


                        <p>

                            <FaMapMarkerAlt />

                            {" "}

                            {

                                product.pickupLocation

                                ||

                                "Campus"

                            }

                        </p>


                        <p>

                            <FaPhone />

                            {" "}

                            {

                                product.contactNumber

                                ||

                                "Contact not added"

                            }

                        </p>


                    </div>


                </div>


            </div>


            {/* ===============================
                PRODUCT DESCRIPTION
            =============================== */}

            <div className="details-box">


                <h2>
                    Product Description
                </h2>


                <p className="description">

                    {product.description}

                </p>


            </div>


            {/* ===============================
                PRODUCT DETAILS
            =============================== */}

            <div className="details-box">


                <h2>
                    Product Details
                </h2>


                <div className="specifications">


                    <p>

                        <strong>
                            Category
                        </strong>

                        <br />

                        {product.category}

                    </p>


                    <p>

                        <strong>
                            Condition
                        </strong>

                        <br />

                        {product.condition || "Good"}

                    </p>


                    <p>

                        <strong>
                            Availability
                        </strong>

                        <br />

                        Available

                    </p>


                </div>


            </div>


        </div>

    );

};


export default ProductDetails;

