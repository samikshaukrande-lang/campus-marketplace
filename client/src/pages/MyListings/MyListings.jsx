
import React, { useState, useEffect } from "react";
import "./MyListings.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

import axios from "axios";

const MyListings = () => {

    const [listings, setListings] = useState([]);

    const [editIndex, setEditIndex] = useState(null);

    const [editData, setEditData] = useState({

        title: "",
        price: "",
        description: "",
        pickupLocation: "",
        college: "",
        contactNumber: "",
        condition: ""

    });


    // ===============================
    // LOGGED USER
    // ===============================

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem(
        "token"
    );

    const userId =
        user?._id ||
        user?.id;


    console.log(
        "MY LISTINGS USER:",
        user
    );

    console.log(
        "MY LISTINGS USER ID:",
        userId
    );


    // ===============================
    // GET MY PRODUCTS
    // ===============================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await axios.get(

                    "https://campus-marketplace-14dq.onrender.com/api/products"

                );


                console.log(
                    "ALL PRODUCTS:",
                    res.data
                );


                // ===============================
                // FILTER LOGGED USER PRODUCTS
                // ===============================

                const myProducts =
                    res.data.filter(

                        (item) => {

                            const sellerId =

                                item?.seller?._id

                                ||

                                item?.seller;


                            console.log(

                                "PRODUCT:",
                                item.title,
                                "SELLER:",
                                sellerId,
                                "LOGGED USER:",
                                userId

                            );


                            return (

                                String(sellerId)

                                ===

                                String(userId)

                            );

                        }

                    );


                console.log(
                    "MY PRODUCTS:",
                    myProducts
                );


                setListings(
                    myProducts
                );


            }

            catch (error) {

                console.log(

                    "MY LISTINGS ERROR:",

                    error.response?.data ||
                    error

                );

            }

        };


        if (userId) {

            fetchProducts();

        }

    }, [userId]);


    // ===============================
    // DELETE PRODUCT
    // ===============================

    const deleteProduct = async (id) => {

        try {

            await axios.delete(

                `https://campus-marketplace-14dq.onrender.com/api/products/${id}`

            );


            setListings(

                listings.filter(

                    item => item._id !== id

                )

            );


            alert(
                "Product Deleted ✅"
            );


        }

        catch (error) {

            console.log(

                error.response?.data ||
                error

            );


            alert(
                "Delete Failed ❌"
            );

        }

    };


    // ===============================
    // EDIT PRODUCT
    // ===============================

    const editProduct = (index) => {

        setEditIndex(index);


        setEditData({

            title:
                listings[index].title,

            price:
                listings[index].price,

            description:
                listings[index].description,

            pickupLocation:
                listings[index].pickupLocation || "",

            college:
                listings[index].college || "",

            contactNumber:
                listings[index].contactNumber || "",

            condition:
                listings[index].condition || ""

        });

    };


    // ===============================
    // UPDATE PRODUCT
    // ===============================

    const updateProduct = async () => {

        try {

            const id =
                listings[editIndex]._id;


            const res = await axios.put(

                `https://campus-marketplace-14dq.onrender.com/api/products/${id}`,

                editData

            );


            const updated =
                [...listings];


            updated[editIndex] =
                res.data.product || res.data;


            setListings(
                updated
            );


            setEditIndex(
                null
            );


            alert(
                "Product Updated ✅"
            );

        }

        catch (error) {

            console.log(

                error.response?.data ||
                error

            );


            alert(
                "Update Failed ❌"
            );

        }

    };


    return (

        <div>

            <Sidebar />


            <div>

                <Navbar />


                <div className="listing-page">


                    {/* ===============================
                        HEADER
                    =============================== */}

                    <div className="listing-header">

                        <h1>
                            My Listings
                        </h1>

                        <p>
                            Manage your uploaded products
                        </p>

                    </div>


                    {/* ===============================
                        EDIT FORM
                    =============================== */}

                    {

                        editIndex !== null &&

                        <div className="edit-form">


                            <h2>
                                Edit Product
                            </h2>


                            <input

                                type="text"

                                placeholder="Product Name"

                                value={
                                    editData.title
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        title:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                type="number"

                                placeholder="Price"

                                value={
                                    editData.price
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        price:
                                            e.target.value

                                    })

                                }

                            />


                            <textarea

                                placeholder="Description"

                                value={
                                    editData.description
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        description:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                type="text"

                                placeholder="College"

                                value={
                                    editData.college
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        college:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                type="text"

                                placeholder="Pickup Location"

                                value={
                                    editData.pickupLocation
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        pickupLocation:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                type="text"

                                placeholder="Contact Number"

                                value={
                                    editData.contactNumber
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        contactNumber:
                                            e.target.value

                                    })

                                }

                            />


                            <select

                                value={
                                    editData.condition
                                }

                                onChange={(e) =>

                                    setEditData({

                                        ...editData,

                                        condition:
                                            e.target.value

                                    })

                                }

                            >

                                <option>
                                    Select Condition
                                </option>

                                <option>
                                    New
                                </option>

                                <option>
                                    Like New
                                </option>

                                <option>
                                    Good
                                </option>

                                <option>
                                    Used
                                </option>

                            </select>


                            <button

                                className="update-btn"

                                onClick={
                                    updateProduct
                                }

                            >

                                Update

                            </button>


                            <button

                                className="cancel-btn"

                                onClick={() =>
                                    setEditIndex(null)
                                }

                            >

                                Cancel

                            </button>


                        </div>

                    }


                    {/* ===============================
                        LISTINGS
                    =============================== */}

                    <div className="listing-grid">


                        {

                            listings.length === 0

                                ?

                                <h2>
                                    No Products Added Yet
                                </h2>

                                :

                                listings.map(
                                    (item, index) => (

                                        <div

                                            className="listing-card"

                                            key={item._id}

                                        >


                                            <img

                                                src={
                                                    item.image
                                                }

                                                alt={
                                                    item.title
                                                }

                                            />


                                            <div className="listing-content">


                                                <h2>
                                                    {item.title}
                                                </h2>


                                                <h3>
                                                    ₹{item.price}
                                                </h3>


                                                <p>
                                                    {item.description}
                                                </p>


                                                <p>
                                                    🏫 {item.college}
                                                </p>


                                                <p>
                                                    📍 {item.pickupLocation}
                                                </p>


                                                <p>
                                                    📞 {item.contactNumber}
                                                </p>


                                                <p>
                                                    🔹 Condition: {item.condition}
                                                </p>


                                                <div className="action-buttons">


                                                    <button

                                                        className="edit-btn"

                                                        onClick={() =>
                                                            editProduct(index)
                                                        }

                                                    >

                                                        <FaEdit />

                                                        Edit

                                                    </button>


                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>
                                                            deleteProduct(
                                                                item._id
                                                            )
                                                        }

                                                    >

                                                        <FaTrash />

                                                        Delete

                                                    </button>


                                                </div>


                                            </div>


                                        </div>

                                    )

                                )

                        }


                    </div>


                </div>


            </div>


        </div>

    );

};

export default MyListings;


