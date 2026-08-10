
import React, { useState, useEffect } from "react";
import "./CampusDeals.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
  FaPlus,
  FaTags,
  FaHeart,
  FaRegHeart,
  FaCopy,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import axios from "axios";


const API_URL = "https://campus-marketplace-14dq.onrender.com/api/campus-deals";


const CampusDeals = () => {

  // =========================================
  // DEALS
  // =========================================

  const [deals, setDeals] = useState([]);


  const [showForm, setShowForm] = useState(false);

  const [editIndex, setEditIndex] = useState(null);


  // =========================================
  // SEARCH + FILTER
  // =========================================

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");


  // =========================================
  // FORM STATES
  // =========================================

  const [dealName, setDealName] = useState("");

  const [category, setCategory] = useState("");

  const [originalPrice, setOriginalPrice] = useState("");

  const [dealPrice, setDealPrice] = useState("");

  const [validTill, setValidTill] = useState("");

  const [image, setImage] = useState("");

  const [coupon, setCoupon] = useState("");

  const [seller, setSeller] = useState("");


  // =========================================
  // GET ALL DEALS
  // =========================================

  const fetchDeals = async () => {

    try {

      const response = await axios.get(API_URL);

      setDeals(response.data);

    } catch (error) {

      console.error(
        "Fetch Campus Deals Error:",
        error
      );

      alert("Failed to load Campus Deals");

    }

  };


  // =========================================
  // PAGE LOAD
  // =========================================

  useEffect(() => {

    fetchDeals();

  }, []);


  // =========================================
  // RESET FORM
  // =========================================

  const resetForm = () => {

    setDealName("");

    setCategory("");

    setOriginalPrice("");

    setDealPrice("");

    setValidTill("");

    setImage("");

    setCoupon("");

    setSeller("");

    setEditIndex(null);

  };


  // =========================================
  // IMAGE UPLOAD
  // =========================================

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onloadend = () => {

      setImage(reader.result);

    };


    reader.readAsDataURL(file);

  };


  // =========================================
  // ADD / UPDATE DEAL
  // =========================================

  const addDeal = async (e) => {

    e.preventDefault();


    // Required fields

    if (
      !dealName ||
      !category ||
      !originalPrice ||
      !dealPrice ||
      !seller ||
      !validTill
    ) {

      alert(
        "Please fill all required fields."
      );

      return;

    }


    // Price validation

    if (Number(dealPrice) > Number(originalPrice)) {

      alert(
        "Deal Price cannot be greater than Original Price."
      );

      return;

    }


    if (Number(originalPrice) <= 0) {

      alert(
        "Original Price must be greater than 0."
      );

      return;

    }


    try {


      // =====================================
      // UPDATE DEAL
      // =====================================

      if (editIndex !== null) {

        const dealId =
          deals[editIndex]._id;


        const response = await axios.put(

          `${API_URL}/${dealId}`,

          {

            dealName,

            category,

            originalPrice,

            dealPrice,

            validTill,

            image,

            coupon,

            seller,

            liked:
              deals[editIndex].liked || false,

          }

        );


        setDeals((prevDeals) => {

          const updatedDeals = [
            ...prevDeals
          ];

          updatedDeals[editIndex] =
            response.data.deal;

          return updatedDeals;

        });


        alert(
          "Deal Updated Successfully"
        );

      }


      // =====================================
      // ADD DEAL
      // =====================================

      else {

        const response = await axios.post(

          API_URL,

          {

            dealName,

            category,

            originalPrice,

            dealPrice,

            validTill,

            image,

            coupon,

            seller,

          }

        );


        setDeals((prevDeals) => [

          response.data.deal,

          ...prevDeals,

        ]);


        alert(
          "Deal Added Successfully"
        );

      }


      resetForm();

      setShowForm(false);


    } catch (error) {

      console.error(
        "Save Campus Deal Error:",
        error
      );


      alert(

        error.response?.data?.message ||

        "Failed to save Campus Deal"

      );

    }

  };


  // =========================================
  // EDIT DEAL
  // =========================================

  const editDeal = (deal, index) => {

    setDealName(
      deal.dealName || ""
    );

    setCategory(
      deal.category || ""
    );

    setOriginalPrice(
      deal.originalPrice || ""
    );

    setDealPrice(
      deal.dealPrice || ""
    );


    setValidTill(

      deal.validTill

        ? deal.validTill.substring(0, 10)

        : ""

    );


    setImage(
      deal.image || ""
    );

    setCoupon(
      deal.coupon || ""
    );

    setSeller(
      deal.seller || ""
    );


    setEditIndex(index);

    setShowForm(true);

  };


  // =========================================
  // DELETE DEAL
  // =========================================

  const deleteDeal = async (index) => {

    const deal = deals[index];


    if (!deal?._id) {

      alert("Deal ID not found");

      return;

    }


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this deal?"
      );


    if (!confirmDelete) return;


    try {

      await axios.delete(
        `${API_URL}/${deal._id}`
      );


      setDeals((prevDeals) =>

        prevDeals.filter(
          (_, i) => i !== index
        )

      );


      alert(
        "Deal Deleted Successfully"
      );


    } catch (error) {

      console.error(
        "Delete Campus Deal Error:",
        error
      );


      alert(

        error.response?.data?.message ||

        "Failed to delete deal"

      );

    }

  };


  // =========================================
  // WISHLIST / LIKE
  // =========================================

  const saveDeal = async (index) => {

    const deal = deals[index];


    if (!deal?._id) {

      alert("Deal ID not found");

      return;

    }


    try {

      const response = await axios.put(

        `${API_URL}/${deal._id}`,

        {

          dealName: deal.dealName,

          category: deal.category,

          originalPrice: deal.originalPrice,

          dealPrice: deal.dealPrice,

          validTill: deal.validTill,

          image: deal.image || "",

          coupon: deal.coupon || "",

          seller: deal.seller,

          liked: !deal.liked,

        }

      );


      setDeals((prevDeals) => {

        const updatedDeals = [
          ...prevDeals
        ];

        updatedDeals[index] =
          response.data.deal;

        return updatedDeals;

      });


    } catch (error) {

      console.error(
        "Like Campus Deal Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to update wishlist"
      );

    }

  };


  // =========================================
  // COPY COUPON
  // =========================================

  const copyCoupon = (code) => {

    navigator.clipboard.writeText(code);

    alert(
      "Coupon Copied Successfully"
    );

  };


  // =========================================
  // SEARCH + FILTER
  // =========================================

  const filteredDeals = deals.filter(
    (deal) => {

      return (

        (deal.dealName || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        &&

        (
          filter === "" ||
          deal.category === filter
        )

      );

    }
  );


  // =========================================
  // DAYS LEFT
  // =========================================

  const getDays = (date) => {

    const today = new Date();

    const end = new Date(date);


    const diff =
      end - today;


    if (diff <= 0) {

      return "Expired";

    }


    return `${Math.ceil(
      diff /
      (1000 * 60 * 60 * 24)
    )} Days Left`;

  };


  // =========================================
  // RETURN
  // =========================================

  return (

    <>

      <Sidebar />

      <Navbar />


      <div className="deal-page">


        {/* =================================
            HEADER
        ================================= */}

        <div className="deal-header">

          <div>

            <h1>
              🛒 Campus Deals
            </h1>

            <p>
              Exclusive offers for campus students
            </p>

          </div>


          <button

            onClick={() => {

              setShowForm(!showForm);

              resetForm();

            }}

          >

            <FaPlus />

            Add Deal

          </button>

        </div>


        {/* =================================
            SEARCH
        ================================= */}

        <div className="deal-search">

          <input

            type="text"

            placeholder="🔍 Search Deals..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

          />


          <select

            value={filter}

            onChange={(e) =>
              setFilter(e.target.value)
            }

          >

            <option value="">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Stationery">
              Stationery
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Others">
              Others
            </option>

          </select>

        </div>


        {/* =================================
            FORM
        ================================= */}

        {showForm && (

          <div className="deal-form">

            <h2>

              {editIndex !== null

                ? "Update Deal"

                : "Create New Deal"}

            </h2>


            <form onSubmit={addDeal}>


              <label>
                Deal Image Upload
              </label>


              <input

                type="file"

                accept="image/*"

                onChange={
                  handleImageUpload
                }

              />


              {image && (

                <img

                  src={image}

                  alt="preview"

                  className="image-preview"

                />

              )}


              <label>
                Deal Product Name
              </label>


              <input

                type="text"

                placeholder="Enter product name"

                value={dealName}

                onChange={(e) =>
                  setDealName(e.target.value)
                }

              />


              <label>
                Category
              </label>


              <select

                value={category}

                onChange={(e) =>
                  setCategory(e.target.value)
                }

              >

                <option value="">
                  Select Category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Books">
                  Books
                </option>

                <option value="Stationery">
                  Stationery
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Others">
                  Others
                </option>

              </select>


              <label>
                Original Price
              </label>


              <input

                type="number"

                value={originalPrice}

                onChange={(e) =>
                  setOriginalPrice(e.target.value)
                }

              />


              <label>
                Deal Price
              </label>


              <input

                type="number"

                value={dealPrice}

                onChange={(e) =>
                  setDealPrice(e.target.value)
                }

              />


              <label>
                Coupon Code
              </label>


              <input

                value={coupon}

                placeholder="Example CAMPUS20"

                onChange={(e) =>
                  setCoupon(e.target.value)
                }

              />


              <label>
                Seller Name
              </label>


              <input

                value={seller}

                placeholder="Seller Name"

                onChange={(e) =>
                  setSeller(e.target.value)
                }

              />


              <label>
                Valid Till
              </label>


              <input

                type="date"

                value={validTill}

                onChange={(e) =>
                  setValidTill(e.target.value)
                }

              />


              <button

                className="submit-btn"

                type="submit"

              >

                {editIndex !== null

                  ? "Update Deal"

                  : "Save Deal"}

              </button>


            </form>

          </div>

        )}


        {/* =================================
            DEAL GRID
        ================================= */}

        <div className="deal-grid">


          {filteredDeals.length === 0 ? (

            <h2>
              No Deals Available
            </h2>

          ) : (

            filteredDeals.map(
              (deal, index) => (

                <div

                  className="deal-card"

                  key={deal._id}

                >


                  {/* ACTIONS */}

                  <div className="deal-actions">


                    <button

                      onClick={() =>
                        editDeal(
                          deal,
                          index
                        )
                      }

                    >

                      <FaEdit />

                    </button>


                    <button

                      onClick={() =>
                        deleteDeal(index)
                      }

                    >

                      <FaTrash />

                    </button>


                  </div>


                  {/* IMAGE */}

                  {deal.image ? (

                    <img

                      src={deal.image}

                      alt="deal"

                      className="deal-image"

                    />

                  ) : (

                    <div className="deal-icon">

                      <FaTags />

                    </div>

                  )}


                  {/* LIKE */}

                  <button

                    className="wishlist"

                    onClick={() =>
                      saveDeal(index)
                    }

                  >

                    {deal.liked ? (

                      <FaHeart />

                    ) : (

                      <FaRegHeart />

                    )}

                  </button>


                  {/* DEAL NAME */}

                  <h2>
                    {deal.dealName}
                  </h2>


                  <p>
                    📂 {deal.category}
                  </p>


                  <h3>
                    ₹{deal.dealPrice}
                  </h3>


                  <p className="old-price">

                    Original ₹
                    {deal.originalPrice}

                  </p>


                  <span className="discount">

                    🔥 {deal.discount}% OFF

                  </span>


                  <p>
                    👤 {deal.seller}
                  </p>


                  <p>
                    ⏳ {getDays(
                      deal.validTill
                    )}
                  </p>


                  {/* COUPON */}

                  {deal.coupon && (

                    <div className="coupon">

                      🎟️ {deal.coupon}


                      <button

                        onClick={() =>
                          copyCoupon(
                            deal.coupon
                          )
                        }

                      >

                        <FaCopy />

                      </button>

                    </div>

                  )}

                </div>

              )

            )

          )}

        </div>

      </div>

    </>

  );

};


export default CampusDeals;


