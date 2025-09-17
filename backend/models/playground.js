import mongoose from "mongoose";

const playgroundSchema = new mongoose.Schema({
  name: String,
  location: String,
  pricePerHour: Number,
  availableSlots: [String],
});

export default mongoose.model("Playground", playgroundSchema);
