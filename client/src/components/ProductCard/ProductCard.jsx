
import React, { useEffect, useState } from "react";
import "./ProductCard.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaHeart } from "react-icons/fa";


const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const [isWishlisted, setIsWishlisted] = useState(false);


    if (!product) {
        return null;
    }


    const productId = product._id || product.id;


    // ==============================
    // CHECK WISHLIST
    // ==============================

    useEffect(() => {

        const checkWishlist = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    return;
                }

                const response = await axios.get(
                    "https://campus-marketplace-14dq.onrender.com/api/wishlist",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                const wishlist =
                    response.data?.wishlist || [];

                const found = wishlist.some(
                    (item) =>
                        item.product?._id === productId
                );

                setIsWishlisted(found);

            } catch (error) {

                console.log(
                    "Wishlist Check Error:",
                    error
                );

            }

        };

        checkWishlist();

    }, [productId]);


    // ==============================
    // WISHLIST BUTTON
    // ==============================

    const handleWishlist = async (e) => {

        e.stopPropagation();

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                alert("Please login first.");

                return;

            }


            if (isWishlisted) {

                await axios.delete(

                    `https://campus-marketplace-14dq.onrender.com/api/wishlist/${productId}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );

                setIsWishlisted(false);

                return;
            }


            const response = await axios.post(

                "https://campus-marketplace-14dq.onrender.com/api/wishlist",

                {
                    productId: productId
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            console.log(
                "❤️ Wishlist Added:",
                response.data
            );


            setIsWishlisted(true);


        } catch (error) {

            console.log(
                "Wishlist Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Wishlist failed"
            );

        }

    };


    // ==============================
    // VIEW PRODUCT
    // ==============================

    const handleView = (e) => {

        e.stopPropagation();

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );

        navigate(
            `/product/${productId}`,
            {
                state: product
            }
        );

    };


    return (

        <div
            className="product-card"
            onClick={() =>
                navigate(
                    "/product-details",
                    {
                        state: product
                    }
                )
            }
        >


            {/* IMAGE */}

            <div className="product-image-wrapper">

                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                />


                {/* ❤️ WISHLIST */}

                <button
                    type="button"
                    className={
                        isWishlisted
                            ? "heart-btn active"
                            : "heart-btn"
                    }
                    onClick={handleWishlist}
                >

                    <FaHeart />

                </button>

            </div>


            {/* INFO */}

            <div className="product-info">

                <h3 className="product-title">
                    {product.title}
                </h3>


                <p className="product-price">
                    ₹{product.price}
                </p>


                <span className="product-category">
                    {product.category}
                </span>

            </div>


            {/* VIEW */}

            <button
                type="button"
                className="view-btn"
                onClick={handleView}
            >
                View Details
            </button>


        </div>

    );

};


export default ProductCard;


