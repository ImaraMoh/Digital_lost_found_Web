const mongoose = require("mongoose");

const LostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String } // optional
});

module.exports = mongoose.model("Lost", LostSchema);
