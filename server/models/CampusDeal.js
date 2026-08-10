
import mongoose from "mongoose";

const campusDealSchema = new mongoose.Schema(
  {
    dealName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    dealPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    validTill: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    coupon: {
      type: String,
      default: "",
    },

    seller: {
      type: String,
      required: true,
    },

    liked: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const CampusDeal = mongoose.model(
  "CampusDeal",
  campusDealSchema
);

export default CampusDeal;
