import express from "express";
import Playground from "../models/playground.js";

const router = express.Router();

// Get all playgrounds
router.get("/", async (req, res) => {
  const playgrounds = await Playground.find();
  res.json(playgrounds);
});

// Book a slot
router.post("/book/:id", async (req, res) => {
  const { slot } = req.body;
  const playground = await Playground.findById(req.params.id);

  if (!playground.availableSlots.includes(slot)) {
    return res.status(400).json({ message: "Slot not available" });
  }

  playground.availableSlots = playground.availableSlots.filter(s => s !== slot);
  await playground.save();

  res.json({ message: "Booking successful", playground });
});

export default router;
