const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, unique: true },
  address: String,
  photos: [String],
  description: String,
  perks: { Object },
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});

const Places = mongoose.model("Place", placeSchema);

module.exports = Places;
