
import React, { useState, useEffect } from "react";
import "./LostFound.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import axios from "axios";

const LostFound = () => {

  // =========================================
  // ITEMS
  // =========================================

  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editIndex, setEditIndex] = useState(null);


  // =========================================
  // FORM STATES
  // =========================================

  const [itemName, setItemName] = useState("");

  const [category, setCategory] = useState("");

  const [status, setStatus] = useState("Lost");

  const [lostDate, setLostDate] = useState("");

  const [college, setCollege] = useState("");

  const [otherCollege, setOtherCollege] = useState("");

  const [location, setLocation] = useState("");

  const [description, setDescription] = useState("");

  const [contactName, setContactName] = useState("");

  const [contactDetails, setContactDetails] = useState("");

  const [reward, setReward] = useState("");

  const [image, setImage] = useState("");


  // =========================================
  // GET ALL ITEMS
  // =========================================

  const fetchItems = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/lost-found"
      );

      setItems(response.data);

    } catch (error) {

      console.error(
        "Fetch Lost & Found Error:",
        error
      );

      alert("Failed to load Lost & Found items");

    }

  };


  // =========================================
  // PAGE LOAD
  // =========================================

  useEffect(() => {

    fetchItems();

  }, []);


  // =========================================
  // IMAGE UPLOAD
  // =========================================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setImage(reader.result);

    };

    reader.readAsDataURL(file);

  };


  // =========================================
  // CLEAR FORM
  // =========================================

  const clearForm = () => {

    setItemName("");
    setCategory("");
    setStatus("Lost");
    setLostDate("");

    setCollege("");
    setOtherCollege("");

    setLocation("");
    setDescription("");

    setContactName("");
    setContactDetails("");

    setReward("");
    setImage("");

    setEditIndex(null);

  };


  // =========================================
  // SAVE / UPDATE ITEM
  // =========================================

  const saveItem = async (e) => {

    e.preventDefault();

    try {

      const newItem = {

        itemName,

        category,

        status,

        lostDate,

        college:
          college === "Other"
            ? otherCollege
            : college || "Not Mentioned",

        location,

        description,

        contactName,

        contactDetails,

        reward,

        image

      };


      // =====================================
      // ADD ITEM
      // =====================================

      if (editIndex === null) {

        const response = await axios.post(
          "http://localhost:5000/api/lost-found",
          newItem
        );

        setItems((prevItems) => [
          response.data.item,
          ...prevItems
        ]);

        alert("Item Added Successfully");

      }


      // =====================================
      // UPDATE ITEM
      // =====================================

      else {

        const itemId = items[editIndex]._id;

        const response = await axios.put(
          `http://localhost:5000/api/lost-found/${itemId}`,
          newItem
        );

        setItems((prevItems) => {

          const updatedItems = [...prevItems];

          updatedItems[editIndex] =
            response.data.item;

          return updatedItems;

        });

        alert("Item Updated Successfully");

      }


      clearForm();

      setShowForm(false);

    } catch (error) {

      console.error(
        "Save Item Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to save item"
      );

    }

  };


  // =========================================
  // EDIT ITEM
  // =========================================

  const editItem = (index) => {

    const item = items[index];

    setItemName(item.itemName || "");

    setCategory(item.category || "");

    setStatus(item.status || "Lost");

    setLostDate(
      item.lostDate
        ? item.lostDate.substring(0, 10)
        : ""
    );

    setCollege(item.college || "");

    setOtherCollege("");

    setLocation(item.location || "");

    setDescription(item.description || "");

    setContactName(item.contactName || "");

    setContactDetails(
      item.contactDetails || ""
    );

    setReward(item.reward || "");

    setImage(item.image || "");

    setEditIndex(index);

    setShowForm(true);

  };


  // =========================================
  // DELETE ITEM
  // =========================================

  const deleteItem = async (index) => {

    const item = items[index];

    if (!item?._id) {

      alert("Item ID not found");

      return;

    }


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;


    try {

      await axios.delete(
        `http://localhost:5000/api/lost-found/${item._id}`
      );

      setItems((prevItems) =>
        prevItems.filter(
          (_, i) => i !== index
        )
      );

      alert("Item Deleted Successfully");

    } catch (error) {

      console.error(
        "Delete Item Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete item"
      );

    }

  };


  // =========================================
  // MARK AS FOUND
  // =========================================

  const markAsFound = async (index) => {

    const item = items[index];

    if (!item?._id) {

      alert("Item ID not found");

      return;

    }


    try {

      const response = await axios.patch(
        `http://localhost:5000/api/lost-found/${item._id}/found`
      );

      setItems((prevItems) => {

        const updatedItems = [...prevItems];

        updatedItems[index] =
          response.data.item;

        return updatedItems;

      });

      alert("Item Marked As Found");

    } catch (error) {

      console.error(
        "Mark As Found Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to mark item as Found"
      );

    }

  };


  // =========================================
  // CANCEL FORM
  // =========================================

  const cancelForm = () => {

    clearForm();

    setShowForm(false);

  };


  // =========================================
  // RETURN
  // =========================================

  return (

    <>

      <Sidebar />

      <Navbar />


      <div className="lost-page">


        {/* =================================
            HEADER
        ================================= */}

        <div className="lost-header">

          <h1>
            Lost & Found
          </h1>

          <p>
            Report lost items and help others
            find their belongings.
          </p>


          <button
            onClick={() => {

              if (showForm) {

                cancelForm();

              } else {

                setShowForm(true);

              }

            }}
          >

            <FaPlus />

            {showForm
              ? "Close"
              : "Add Item"}

          </button>

        </div>


        {/* =================================
            FORM
        ================================= */}

        {showForm && (

          <div className="lost-form">

            <h2>

              {editIndex !== null
                ? "Edit Item"
                : "Add Lost / Found Item"}

            </h2>


            <form onSubmit={saveItem}>


              {/* ITEM NAME */}

              <input
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) =>
                  setItemName(e.target.value)
                }
                required
              />


              {/* STATUS */}

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >

                <option value="Lost">
                  Lost
                </option>

                <option value="Found">
                  Found
                </option>

              </select>


              {/* CATEGORY */}

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
              >

                <option value="">
                  Select Category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Personal Item">
                  Personal Item
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="Books">
                  Books
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              {/* DATE */}

              <input
                type="date"
                value={lostDate}
                onChange={(e) =>
                  setLostDate(e.target.value)
                }
                required
              />


              {/* COLLEGE */}

              <select
                value={college}
                onChange={(e) =>
                  setCollege(e.target.value)
                }
                required
              >

                <option value="">
                  Select College
                </option>

                <option value="Shri Siddheshwar Women's Polytechnic">
                  Shri Siddheshwar Women's Polytechnic
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              {/* OTHER COLLEGE */}

              {college === "Other" && (

                <input
                  type="text"
                  placeholder="Enter College Name"
                  value={otherCollege}
                  onChange={(e) =>
                    setOtherCollege(e.target.value)
                  }
                  required
                />

              )}


              {/* LOCATION */}

              <input
                type="text"
                value={location}
                placeholder="College Campus / Hostel"
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                required
              />


              {/* DESCRIPTION */}

              <textarea
                value={description}
                placeholder="Describe the item..."
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />


              {/* CONTACT NAME */}

              <input
                type="text"
                value={contactName}
                placeholder="Enter contact name"
                onChange={(e) =>
                  setContactName(e.target.value)
                }
                required
              />


              {/* CONTACT DETAILS */}

              <input
                type="text"
                value={contactDetails}
                placeholder="Phone / Email"
                onChange={(e) =>
                  setContactDetails(e.target.value)
                }
                required
              />


              {/* REWARD */}

              <input
                type="text"
                value={reward}
                placeholder="Reward (Optional)"
                onChange={(e) =>
                  setReward(e.target.value)
                }
              />


              {/* IMAGE */}

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />


              {/* IMAGE PREVIEW */}

              {image && (

                <img
                  src={image}
                  alt="Lost item"
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "15px"
                  }}
                />

              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-btn"
              >

                {editIndex !== null
                  ? "Update Item"
                  : "Save Item"}

              </button>


              {/* CANCEL */}

              {editIndex !== null && (

                <button
                  type="button"
                  onClick={cancelForm}
                  style={{
                    marginLeft: "10px",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >

                  Cancel

                </button>

              )}

            </form>

          </div>

        )}


        {/* =================================
            ITEMS GRID
        ================================= */}

        <div className="lost-grid">


          {items.length === 0 ? (

            <h2>
              No Lost & Found Items
            </h2>

          ) : (

            items.map((item, index) => (

              <div
                className="lost-card"
                key={item._id}
              >


                {/* IMAGE */}

                {item.image && (

                  <img
                    src={item.image}
                    alt={item.itemName}
                  />

                )}


                {/* ITEM NAME */}

                <h2>
                  {item.itemName}
                </h2>


                {/* STATUS */}

                <span>
                  {item.status}
                </span>


                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {item.category}
                </p>


                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {item.lostDate
                    ? new Date(
                        item.lostDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>


                <p>
                  <strong>
                    College:
                  </strong>{" "}
                  {item.college}
                </p>


                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {item.location}
                </p>


                <p>
                  <strong>
                    Description:
                  </strong>{" "}
                  {item.description}
                </p>


                <p>
                  <strong>
                    Contact:
                  </strong>{" "}
                  {item.contactName}
                </p>


                <p>
                  <strong>
                    Contact Details:
                  </strong>{" "}
                  {item.contactDetails}
                </p>


                {item.reward && (

                  <p>
                    <strong>
                      Reward:
                    </strong>{" "}
                    {item.reward}
                  </p>

                )}


                {/* ACTIONS */}

                <div className="card-actions">


                  {item.status !== "Found" && (

                    <button
                      className="found-btn"
                      onClick={() =>
                        markAsFound(index)
                      }
                    >

                      Mark as Found

                    </button>

                  )}


                  <button
                    className="edit-btn"
                    onClick={() =>
                      editItem(index)
                    }
                  >

                    <FaEdit />

                    Edit

                  </button>


                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteItem(index)
                    }
                  >

                    <FaTrash />

                    Delete

                  </button>


                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </>

  );

};

export default LostFound;

