const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Place title is required"],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      //required: [true, "Image is required"],
    },
    // TO DO: Vamos a incluir creator en el place????
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
    openingHours: {
      type: [String],
    },

    city: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    geometry: {
      longitude: String,
      latitude: String,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    tags: [String],
    rating: Number,
    priceLevel: Number,
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
