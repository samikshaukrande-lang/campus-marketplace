
import React, { useState, useEffect } from "react";
import "./Marketplace.css";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
    FaHeart,
    FaStar,
    FaSort
} from "react-icons/fa";

import axios from "axios";


const Marketplace = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [sort, setSort] = useState("Latest");

    const [products, setProducts] = useState([]);

    // ❤️ Wishlist आता MongoDB मधून येईल
    const [wishlist, setWishlist] = useState([]);


    // =========================================
    // GET ALL PRODUCTS
    // =========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await axios.get(
                    "https://campus-marketplace-14dq.onrender.com/api/products"
                );

                console.log(
                    "PRODUCT API DATA:",
                    res.data
                );


                if (Array.isArray(res.data)) {

                    setProducts(res.data);

                } else {

                    setProducts(
                        res.data.products || []
                    );

                }

            }

            catch (error) {

                console.log(
                    "Product Fetch Error:",
                    error
                );

            }

        };


        fetchProducts();

    }, []);


    // =========================================
    // GET USER WISHLIST FROM MONGODB
    // =========================================

    useEffect(() => {

        const fetchWishlist = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    console.log(
                        "Wishlist: Token not found"
                    );

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


                console.log(
                    "❤️ WISHLIST FROM DATABASE:",
                    response.data
                );


                const wishlistData =
                    response.data?.wishlist || [];


                // Backend wishlist मधून
                // actual product काढत आहोत

                const wishlistProducts =
                    wishlistData

                        .filter(
                            (item) =>
                                item.product
                        )

                        .map(
                            (item) =>
                                item.product
                        );


                setWishlist(
                    wishlistProducts
                );


            }

            catch (error) {

                console.log(
                    "Wishlist Fetch Error:",
                    error
                );

            }

        };


        fetchWishlist();

    }, []);


    // =========================================
    // CATEGORIES
    // =========================================

    const categories = [

        "All",

        "Books",

        "Electronics",

        "Study Material",

        "Hostel Essentials",

        "Others"

    ];


    // =========================================
    // ADD / REMOVE WISHLIST
    // =========================================

    const addWishlist = async (product) => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                alert(
                    "Please login first."
                );

                return;

            }


            const productId =
                product._id;


            const exists =
                wishlist.find(

                    (item) =>
                        item._id === productId

                );


            // =====================================
            // REMOVE FROM WISHLIST
            // =====================================

            if (exists) {

                await axios.delete(

                    `https://campus-marketplace-14dq.onrender.com/api/wishlist/${productId}`,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


                setWishlist(

                    wishlist.filter(

                        (item) =>
                            item._id !== productId

                    )

                );


                console.log(
                    "💔 Removed from Wishlist"
                );

            }


            // =====================================
            // ADD TO WISHLIST
            // =====================================

            else {

                const response =
                    await axios.post(

                        "https://campus-marketplace-14dq.onrender.com/api/wishlist",

                        {

                            productId:
                                productId

                        },

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );


                console.log(
                    "❤️ ADDED TO WISHLIST:",
                    response.data
                );


                setWishlist([

                    ...wishlist,

                    product

                ]);

            }


        }

        catch (error) {

            console.log(
                "Wishlist Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Wishlist operation failed"

            );

        }

    };


    // =========================================
    // FILTER + SORT
    // =========================================

    const filteredProducts = products

        .filter((item) =>

            item.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            &&

            (

                category === "All"

                ||

                item.category === category

            )

        )


        .sort((a, b) => {

            if (sort === "Low Price") {

                return a.price - b.price;

            }


            if (sort === "High Price") {

                return b.price - a.price;

            }


            return 0;

        });


    // =========================================
    // PAGE
    // =========================================

    return (

        <>

            <Sidebar />

            <Navbar />


            <div className="marketplace">


                {/* HEADER */}

                <div className="market-header">

                    <h1>
                        Marketplace
                    </h1>

                    <p>
                        Find products from your campus students
                    </p>

                </div>


                {/* SEARCH + SORT */}

                <div className="filter-section">


                    <input

                        type="text"

                        placeholder="🔍 Search products..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        className="market-search"

                    />


                    <div className="sort-section">

                        <select

                            value={sort}

                            onChange={(e) =>
                                setSort(e.target.value)
                            }

                        >

                            <option>
                                Latest
                            </option>

                            <option>
                                Low Price
                            </option>

                            <option>
                                High Price
                            </option>

                        </select>

                    </div>


                </div>


                {/* CATEGORY */}

                <div className="category-section">

                    {categories.map((cat) => (

                        <button

                            key={cat}

                            className={

                                category === cat

                                    ? "active-category"

                                    : ""

                            }

                            onClick={() =>
                                setCategory(cat)
                            }

                        >

                            {cat}

                        </button>

                    ))}

                </div>


                {/* PRODUCT COUNT */}

                <p>

                    Showing{" "}

                    <strong>
                        {filteredProducts.length}
                    </strong>

                    {" "}Products

                </p>


                {/* PRODUCT GRID */}

                <div className="products-grid">


                    {filteredProducts.length > 0 ? (

                        filteredProducts.map(
                            (product) => (

                                <div

                                    className="product-card"

                                    key={product._id}

                                >


                                    {/* ❤️ WISHLIST */}

                                    <button

                                        className={

                                            wishlist.some(

                                                (item) =>

                                                    item._id ===
                                                    product._id

                                            )

                                                ? "heart active"

                                                : "heart"

                                        }

                                        onClick={() =>
                                            addWishlist(
                                                product
                                            )
                                        }

                                    >

                                        <FaHeart />

                                    </button>


                                    {/* IMAGE */}

                                    <img

                                        src={
                                            product.image
                                        }

                                        alt={
                                            product.title
                                        }

                                    />


                                    {/* TITLE */}

                                    <h3>

                                        {product.title}

                                    </h3>


                                    {/* PRICE */}

                                    <h3>

                                        ₹{product.price}

                                    </h3>


                                    {/* COLLEGE */}

                                    <p>

                                        🏫{" "}

                                        {

                                            product.seller?.college ||

                                            product.college ||

                                            "Campus"

                                        }

                                    </p>


                                    {/* LOCATION */}

                                    <p>

                                        📍{" "}

                                        {

                                            product.pickupLocation ||

                                            "Not Mentioned"

                                        }

                                    </p>


                                    {/* CONDITION */}

                                    <p>

                                        🔹{" "}

                                        {

                                            product.condition ||

                                            "Good"

                                        }

                                    </p>


                                    {/* RATING */}

                                    <p>

                                        <FaStar />

                                        {" "}4.5

                                    </p>


                                    {/* VIEW BUTTON */}

                                    <button

                                        className="view-btn"

                                        onClick={() => {

                                            navigate(

                                                `/product/${product._id}`,

                                                {

                                                    state:
                                                        product

                                                }

                                            );

                                        }}

                                    >

                                        View Details

                                    </button>


                                </div>

                            )

                        )

                    )

                    :

                    (

                        <div>

                            😕 No Products Found

                        </div>

                    )}


                </div>


            </div>

        </>

    );

};


export default Marketplace;


