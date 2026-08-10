
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import StatsCard from "../../components/StatsCard/StatsCard";
import ProductCard from "../../components/ProductCard/ProductCard";

import {
    FaShoppingBag,
    FaHeart,
    FaList,
    FaRupeeSign
} from "react-icons/fa";


const Dashboard = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    // Logged-in user name
    const [userName, setUserName] = useState("Student");


    const [dashboardData, setDashboardData] = useState({

        totalProducts: 0,

        myListings: 0,

        wishlistCount: 0,

        sales: 0,

        recentProducts: [],

        featuredProducts: []

    });


    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    useEffect(() => {

        const savedUser =
            localStorage.getItem("user");


        if (savedUser) {

            try {

                const user =
                    JSON.parse(savedUser);


                setUserName(
                    user.name || "Student"
                );


            }

            catch (error) {

                console.error(
                    "User data error:",
                    error
                );

            }

        }

    }, []);


    // =========================================
    // GET DASHBOARD DATA
    // =========================================

    useEffect(() => {

        const fetchDashboardData =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );


                    if (!token) {

                        setError(
                            "Please login first."
                        );

                        setLoading(false);

                        return;

                    }


                    const response =
                        await axios.get(

                            "http://localhost:5000/api/dashboard",

                            {

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`

                                }

                            }

                        );


                    // =====================================
                    // DEBUG DASHBOARD RESPONSE
                    // =====================================

                    console.log(
                        "📊 DASHBOARD API RESPONSE:",
                        response.data
                    );


                    console.log(
                        "❤️ DASHBOARD WISHLIST COUNT:",
                        response.data.wishlistCount
                    );


                    // =====================================
                    // SET DASHBOARD DATA
                    // =====================================

                    setDashboardData({

                        totalProducts:
                            response.data.totalProducts || 0,

                        myListings:
                            response.data.myListings || 0,

                        wishlistCount:
                            response.data.wishlistCount || 0,

                        sales:
                            response.data.sales || 0,

                        recentProducts:
                            response.data.recentProducts || [],

                        featuredProducts:
                            response.data.featuredProducts || []

                    });


                    setLoading(false);


                }

                catch (err) {

                    console.error(
                        "Dashboard API Error:",
                        err
                    );


                    setError(

                        err.response?.data?.message ||

                        "Failed to load dashboard data."

                    );


                    setLoading(false);

                }

            };


        fetchDashboardData();

    }, []);


    // =========================================
    // SEARCH PRODUCTS
    // =========================================

    const filteredProducts =

        dashboardData.recentProducts.filter(

            (item) =>

                item.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <>

                <Sidebar />

                <Navbar />


                <div className="dashboard">

                    <div className="dashboard-message">

                        <h2>
                            Loading Dashboard...
                        </h2>

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


                <div className="dashboard">

                    <div className="dashboard-message">

                        <h2>
                            {error}
                        </h2>

                    </div>

                </div>

            </>

        );

    }


    // =========================================
    // MAIN DASHBOARD
    // =========================================

    return (

        <>

            <Sidebar />

            <Navbar />


            <div className="dashboard">


                {/* =================================
                    WELCOME
                ================================= */}

                <div className="welcome">

                    <h1>

                        Welcome Back,{" "}

                        <span className="user-name">

                            {userName}

                        </span>{" "}

                        👋

                    </h1>


                    <p>

                        Here's what's happening in your
                        campus marketplace.

                    </p>

                </div>



                {/* =================================
                    SEARCH
                ================================= */}

                <div className="search-section">

                    <input

                        type="text"

                        placeholder="🔍 Search Products..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>



                {/* =================================
                    STATS
                ================================= */}

                <div className="stats-container">


                    <StatsCard

                        icon={<FaShoppingBag />}

                        title="Products"

                        value={
                            dashboardData.totalProducts
                        }

                    />


                    <StatsCard

                        icon={<FaList />}

                        title="My Listings"

                        value={
                            dashboardData.myListings
                        }

                    />


                    <StatsCard

                        icon={<FaHeart />}

                        title="Wishlist"

                        value={
                            dashboardData.wishlistCount
                        }

                    />


                    <StatsCard

                        icon={<FaRupeeSign />}

                        title="Sales"

                        value={
                            `₹${dashboardData.sales}`
                        }

                    />


                </div>



                {/* =================================
                    QUICK ACTIONS
                ================================= */}

                <div className="quick-section">

                    <h2>
                        Quick Actions
                    </h2>


                    <div className="quick-buttons">


                        <button

                            onClick={() =>
                                navigate("/sell")
                            }

                        >

                            + Sell Product

                        </button>


                        <button

                            onClick={() =>
                                navigate("/marketplace")
                            }

                        >

                            Browse Marketplace

                        </button>


                        <button

                            onClick={() =>
                                navigate("/wishlist")
                            }

                        >

                            View Wishlist

                        </button>


                    </div>

                </div>



                {/* =================================
                    RECENT PRODUCTS
                ================================= */}

                <div className="recent">

                    <h2>
                        Recent Products
                    </h2>


                    <div className="product-container">


                        {filteredProducts.length > 0 ? (

                            filteredProducts.map(
                                (item) => (

                                    <ProductCard

                                        key={item._id}

                                        product={{

                                            ...item,

                                            id: item._id,

                                            price: item.price

                                        }}

                                    />

                                )

                            )

                        )

                        :

                        (

                            <div className="no-product">

                                No products found.

                            </div>

                        )}


                    </div>

                </div>



                {/* =================================
                    FEATURED PRODUCTS
                ================================= */}

                <div className="featured">

                    <h2>
                        ⭐ Featured Products
                    </h2>


                    <div className="featured-grid">


                        {dashboardData.featuredProducts

                            .slice(0, 4)

                            .map((item) => (

                                <div

                                    className="featured-card"

                                    key={item._id}

                                >


                                    <img

                                        src={item.image}

                                        alt={item.title}

                                    />


                                    <h3>

                                        {item.title}

                                    </h3>


                                    <p>

                                        ₹{item.price}

                                    </p>


                                    <button

                                        onClick={() =>
                                            navigate(
                                                `/product/${item._id}`
                                            )
                                        }

                                    >

                                        View

                                    </button>


                                </div>

                            ))}


                        {dashboardData.featuredProducts.length === 0 && (

                            <div className="no-product">

                                No featured products available.

                            </div>

                        )}


                    </div>

                </div>


            </div>

        </>

    );

};


export default Dashboard;

