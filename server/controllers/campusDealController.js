
import CampusDeal from "../models/CampusDeal.js";


// =========================================
// GET ALL CAMPUS DEALS
// =========================================

export const getDeals = async (req, res) => {

  try {

    const deals = await CampusDeal.find()
      .sort({ createdAt: -1 });

    res.status(200).json(deals);

  } catch (error) {

    console.error(
      "Get Campus Deals Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch Campus Deals",
      error: error.message,
    });

  }

};


// =========================================
// ADD CAMPUS DEAL
// =========================================

export const addDeal = async (req, res) => {

  try {

    const {
      dealName,
      category,
      originalPrice,
      dealPrice,
      validTill,
      image,
      coupon,
      seller,
    } = req.body;


    // Required fields

    if (
      !dealName ||
      !category ||
      !originalPrice ||
      !dealPrice ||
      !validTill ||
      !seller
    ) {

      return res.status(400).json({
        message: "Please fill all required fields",
      });

    }


    // Calculate discount

    const discount = Math.round(
      (
        (Number(originalPrice) -
          Number(dealPrice)) /
        Number(originalPrice)
      ) * 100
    );


    // Create deal

    const deal = await CampusDeal.create({

      dealName,

      category,

      originalPrice,

      dealPrice,

      discount,

      validTill,

      image: image || "",

      coupon: coupon || "",

      seller,

    });


    res.status(201).json({

      message:
        "Campus Deal added successfully",

      deal,

    });

  } catch (error) {

    console.error(
      "Add Campus Deal Error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to add Campus Deal",

      error: error.message,

    });

  }

};


// =========================================
// UPDATE CAMPUS DEAL
// =========================================

export const updateDeal = async (req, res) => {

  try {

    const {
      dealName,
      category,
      originalPrice,
      dealPrice,
      validTill,
      image,
      coupon,
      seller,
      liked,
    } = req.body;


    const discount = Math.round(
      (
        (Number(originalPrice) -
          Number(dealPrice)) /
        Number(originalPrice)
      ) * 100
    );


    const updatedDeal =
      await CampusDeal.findByIdAndUpdate(

        req.params.id,

        {

          dealName,

          category,

          originalPrice,

          dealPrice,

          discount,

          validTill,

          image: image || "",

          coupon: coupon || "",

          seller,

          liked,

        },

        {
          returnDocument: "after",
          runValidators: true,
        }

      );


    if (!updatedDeal) {

      return res.status(404).json({

        message: "Campus Deal not found",

      });

    }


    res.status(200).json({

      message:
        "Campus Deal updated successfully",

      deal: updatedDeal,

    });

  } catch (error) {

    console.error(
      "Update Campus Deal Error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to update Campus Deal",

      error: error.message,

    });

  }

};


// =========================================
// DELETE CAMPUS DEAL
// =========================================

export const deleteDeal = async (req, res) => {

  try {

    const deletedDeal =
      await CampusDeal.findByIdAndDelete(
        req.params.id
      );


    if (!deletedDeal) {

      return res.status(404).json({

        message: "Campus Deal not found",

      });

    }


    res.status(200).json({

      message:
        "Campus Deal deleted successfully",

    });

  } catch (error) {

    console.error(
      "Delete Campus Deal Error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to delete Campus Deal",

      error: error.message,

    });

  }

};

