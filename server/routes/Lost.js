const express = require("express");
const router = express.Router();
const LostItem = require("../models/Lost");

// GET all lost items
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error("Error fetching lost items:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
