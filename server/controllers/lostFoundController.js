import LostFound from "../models/LostFound.js";

// GET ALL LOST & FOUND ITEMS
export const getLostFoundItems = async (req, res) => {
  try {
    const items = await LostFound.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Lost & Found items",
      error: error.message,
    });
  }
};


// ADD LOST & FOUND ITEM
export const addLostFoundItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      status,
      lostDate,
      college,
      location,
      description,
      contactName,
      contactDetails,
      reward,
      image,
    } = req.body;

    const newItem = await LostFound.create({
      itemName,
      category,
      status,
      lostDate,
      college,
      location,
      description,
      contactName,
      contactDetails,
      reward,
      image,
    });

    res.status(201).json({
      message: "Lost & Found item added successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add Lost & Found item",
      error: error.message,
    });
  }
};


// UPDATE LOST & FOUND ITEM
export const updateLostFoundItem = async (req, res) => {
  try {
    const updatedItem = await LostFound.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};


// DELETE LOST & FOUND ITEM
export const deleteLostFoundItem = async (req, res) => {
  try {
    const deletedItem = await LostFound.findByIdAndDelete(
      req.params.id
    );

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete item",
      error: error.message,
    });
  }
};


// MARK ITEM AS FOUND
export const markAsFound = async (req, res) => {
  try {
    const updatedItem = await LostFound.findByIdAndUpdate(
      req.params.id,
      { status: "Found" },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item marked as Found",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark item as Found",
      error: error.message,
    });
  }
};