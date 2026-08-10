import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// Authentication Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


// Student Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Marketplace from "./pages/Marketplace/Marketplace";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SellProduct from "./pages/SellProduct/SellProduct";
import MyListings from "./pages/MyListings/MyListings";
import Chat from "./pages/Chat/Chat";
import Wishlist from "./pages/Wishlist/Wishlist";
import Profile from "./pages/Profile/Profile";


// New Pages

import LostFound from "./pages/LostFound/LostFound";
import CampusDeals from "./pages/CampusDeals/CampusDeals";



// Admin Page
import AdminDashboard from "./pages/Admin/AdminDashboard";




function App() {


return (

<BrowserRouter>

<Routes>



{/* Authentication */}


<Route
path="/"
element={<Login />}
/>



<Route
path="/register"
element={<Register />}
/>







{/* Student Dashboard */}


<Route
path="/dashboard"
element={<Dashboard />}
/>







{/* Marketplace */}


<Route
path="/marketplace"
element={<Marketplace />}
/>







{/* Product Details */}


<Route
path="/product/:id"
element={<ProductDetails />}
/>







{/* Sell Product */}


<Route
path="/sell"
element={<SellProduct />}
/>







{/* My Listings */}


<Route
path="/my-listings"
element={<MyListings />}
/>







{/* Chat */}

<Route
    path="/product/:id"
    element={<ProductDetails />}
/>

<Route
    path="/chat"
    element={<Chat />}
/>












{/* Wishlist */}


<Route
path="/wishlist"
element={<Wishlist />}
/>







{/* Profile */}


<Route
path="/profile"
element={<Profile />}
/>







{/* Lost & Found */}


<Route
path="/lost-found"
element={<LostFound />}
/>







{/* Campus Deals */}


<Route
path="/campus-deals"
element={<CampusDeals />}
/>







{/* Admin */}


<Route
path="/admin"
element={<AdminDashboard />}
/>



</Routes>


</BrowserRouter>

);

}


export default App;