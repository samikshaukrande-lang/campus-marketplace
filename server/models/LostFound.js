import mongoose from "mongoose";

const lostFoundSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Lost", "Found"],
      default: "Lost",
    },

    lostDate: {
      type: Date,
      required: true,
    },

    college: {
      type: String,
      default: "Not Mentioned",
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    contactName: {
      type: String,
      required: true,
    },

    contactDetails: {
      type: String,
      required: true,
    },

    reward: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const LostFound = mongoose.model("LostFound", lostFoundSchema);

export default LostFound;