
import express from "express";

import {
  getDeals,
  addDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/campusDealController.js";

const router = express.Router();


// GET ALL DEALS
router.get("/", getDeals);


// ADD DEAL
router.post("/", addDeal);


// UPDATE DEAL
router.put("/:id", updateDeal);


// DELETE DEAL
router.delete("/:id", deleteDeal);


export default router;

