import express from "express";

import {
  getLostFoundItems,
  addLostFoundItem,
  updateLostFoundItem,
  deleteLostFoundItem,
  markAsFound,
} from "../controllers/lostFoundController.js";

const router = express.Router();


// GET ALL ITEMS
router.get("/", getLostFoundItems);


// ADD ITEM
router.post("/", addLostFoundItem);


// UPDATE ITEM
router.put("/:id", updateLostFoundItem);


// DELETE ITEM
router.delete("/:id", deleteLostFoundItem);


// MARK AS FOUND
router.patch("/:id/found", markAsFound);


export default router;