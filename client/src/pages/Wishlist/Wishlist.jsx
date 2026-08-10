
import React, { useEffect, useState } from "react";
import "./Wishlist.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
    FaEye,
    FaTrash
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import axios from "axios";


const Wishlist = () => {

    const navigate = useNavigate();


    // =========================================
    // CURRENT USER
    // =========================================

    const [currentUser] = useState(() => {

        try {

            return JSON.parse(
                localStorage.getItem("user")
            );

        } catch (error) {

            return null;

        }

    });


    // =========================================
    // WISHLIST STATES
    // =========================================

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================
    // GET WISHLIST FROM BACKEND
    // =========================================

    useEffect(() => {

        console.log(
            "👤 CURRENT LOGGED-IN USER:",
            currentUser
        );


        console.log(
            "👤 CURRENT USER ID:",
            currentUser?.id
        );


        const fetchWishlist = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                console.log(
                    "🔑 TOKEN:",
                    token
                        ? "Token Found ✅"
                        : "Token Missing ❌"
                );


                if (!token) {

                    setError(
                        "Please login first."
                    );

                    setLoading(false);

                    return;

                }


                console.log(
                    "❤️ FETCHING WISHLIST..."
                );


                const response = await axios.get(

                    "http://localhost:5000/api/wishlist",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


                console.log(
                    "❤️ WISHLIST API RESPONSE:",
                    response.data
                );


                console.log(
                    "❤️ WISHLIST COUNT:",
                    response.data?.count
                );


                setWishlist(
                    response.data?.wishlist || []
                );


                setLoading(false);


            } catch (err) {

                console.error(
                    "❌ WISHLIST ERROR:",
                    err
                );


                console.error(
                    "❌ SERVER RESPONSE:",
                    err.response?.data
                );


                setError(

                    err.response?.data?.message ||

                    "Failed to load wishlist."

                );


                setLoading(false);

            }

        };


        fetchWishlist();

    }, [currentUser]);


    // =========================================
    // REMOVE FROM WISHLIST
    // =========================================

    const removeWishlist = async (productId) => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                alert(
                    "Please login first."
                );

                return;

            }


            console.log(
                "🗑️ REMOVING PRODUCT:",
                productId
            );


            await axios.delete(

                `http://localhost:5000/api/wishlist/${productId}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


            console.log(
                "✅ PRODUCT REMOVED"
            );


            setWishlist(

                (previousWishlist) =>

                    previousWishlist.filter(

                        (item) =>

                            item.product?._id !== productId

                    )

            );


        } catch (err) {

            console.error(
                "❌ REMOVE ERROR:",
                err
            );


            alert(

                err.response?.data?.message ||

                "Failed to remove product."

            );

        }

    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <>

                <Sidebar />

                <Navbar />


                <div className="wishlist-container">

                    <div className="wishlist-main">

                        <div className="wishlist-page">

                            <div className="wishlist-header">

                                <h1>
                                    My Wishlist ❤️
                                </h1>

                                <p>
                                    Loading your saved products...
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </>

        );

    }


    // =========================================
    // ERROR
    // =========================================

    if (error) {

        return (

            <>

                <Sidebar />

                <Navbar />


                <div className="wishlist-container">

                    <div className="wishlist-main">

                        <div className="wishlist-page">

                            <div className="wishlist-header">

                                <h1>
                                    My Wishlist ❤️
                                </h1>

                                <p>
                                    {error}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </>

        );

    }


    // =========================================
    // MAIN PAGE
    // =========================================

    return (

        <>

            <Sidebar />

            <Navbar />


            <div className="wishlist-container">


                <div className="wishlist-main">


                    <div className="wishlist-page">


                        {/* =========================
                            HEADER
                        ========================= */}

                        <div className="wishlist-header">

                            <h1>
                                My Wishlist ❤️
                            </h1>

                            <p>
                                Your saved products
                            </p>

                        </div>


                        {/* =========================
                            PRODUCTS
                        ========================= */}

                        {

                            wishlist.length > 0 ? (

                                <div className="wishlist-grid">


                                    {

                                        wishlist.map((item) => {


                                            const product =
                                                item.product;


                                            if (!product) {

                                                return null;

                                            }


                                            return (

                                                <div

                                                    className="wishlist-card"

                                                    key={item._id}

                                                >


                                                    {/* PRODUCT IMAGE */}

                                                    <img

                                                        src={
                                                            product.image
                                                        }

                                                        alt={
                                                            product.title
                                                        }

                                                    />


                                                    {/* PRODUCT DETAILS */}

                                                    <div className="wishlist-content">


                                                        <h2>
                                                            {product.title}
                                                        </h2>


                                                        <h3>
                                                            ₹{product.price}
                                                        </h3>


                                                        <p>

                                                            Seller :{" "}

                                                            {product.seller?.name ||

                                                                "Student Seller"}

                                                        </p>


                                                        <p>

                                                            🏫{" "}

                                                            {product.college ||

                                                                "Not Mentioned"}

                                                        </p>


                                                        <p>

                                                            📍{" "}

                                                            {product.pickupLocation ||

                                                                "Not Mentioned"}

                                                        </p>


                                                        {/* BUTTONS */}

                                                        <div className="wishlist-buttons">


                                                            {/* VIEW */}

                                                            <button

                                                                className="view"

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/product/${product._id}`,

                                                                        {

                                                                            state:
                                                                                product

                                                                        }

                                                                    )

                                                                }

                                                            >

                                                                <FaEye />

                                                                View

                                                            </button>


                                                            {/* REMOVE */}

                                                            <button

                                                                className="remove"

                                                                onClick={() =>

                                                                    removeWishlist(

                                                                        product._id

                                                                    )

                                                                }

                                                            >

                                                                <FaTrash />

                                                                Remove

                                                            </button>


                                                        </div>


                                                    </div>


                                                </div>

                                            );

                                        })

                                    }


                                </div>

                            ) : (


                                <div className="empty-wishlist">

                                    <h2>
                                        ❤️ Wishlist Empty
                                    </h2>

                                    <p>
                                        You haven't liked any products yet.
                                    </p>

                                </div>

                            )

                        }


                    </div>

                </div>

            </div>

        </>

    );

};


export default Wishlist;
