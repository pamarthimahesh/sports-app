const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let playgrounds = [
  { id: 1, name: "Green Valley Playground", location: "Hyderabad", sport_type: "Football" },
  { id: 2, name: "City Sports Arena", location: "Bangalore", sport_type: "Cricket" },
  { id: 3, name: "Ocean View Ground", location: "Chennai", sport_type: "Tennis" },
];

// Each slot belongs to a playground
let slots = [
  { id: 1, playgroundId: 1, startTime: "2025-09-03T09:00:00", endTime: "2025-09-03T10:00:00", isBooked: false },
  { id: 2, playgroundId: 1, startTime: "2025-09-03T10:00:00", endTime: "2025-09-03T11:00:00", isBooked: false },
  { id: 3, playgroundId: 2, startTime: "2025-09-03T14:00:00", endTime: "2025-09-03T15:00:00", isBooked: true },
  { id: 4, playgroundId: 3, startTime: "2025-09-04T16:00:00", endTime: "2025-09-04T17:00:00", isBooked: false },
];

// ✅ Get all playgrounds
app.get("/api/playgrounds", (req, res) => {
  res.json(playgrounds);
});

// ✅ Get details of a playground by ID
app.get("/api/playgrounds/:id", (req, res) => {
  const playground = playgrounds.find((p) => p.id === parseInt(req.params.id));
  if (!playground) {
    return res.status(404).json({ message: "Playground not found" });
  }
  res.json(playground);
});

// ✅ Get slots for a playground
app.get("/api/playgrounds/:id/slots", (req, res) => {
  const id = parseInt(req.params.id);
  const playgroundSlots = slots.filter((slot) => slot.playgroundId === id);
  res.json(playgroundSlots);
});

// ✅ Book a slot
app.post("/api/slots/:id/book", (req, res) => {
  const id = parseInt(req.params.id);
  const slot = slots.find((s) => s.id === id);

  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  if (slot.isBooked) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  slot.isBooked = true;
  res.json({ message: "Slot booked successfully", slot });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
