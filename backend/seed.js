const mongoose = require("mongoose");

const PlaygroundSchema = new mongoose.Schema({
  name: String,
  location: String,
  sport_type: String,
});

const SlotSchema = new mongoose.Schema({
  playgroundId: mongoose.Schema.Types.ObjectId,
  startTime: String,
  endTime: String,
  isBooked: { type: Boolean, default: false },
});

const Playground = mongoose.model("Playground", PlaygroundSchema);
const Slot = mongoose.model("Slot", SlotSchema);

const seedData = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/playground_booking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected...");

    // Clear existing data
    await Playground.deleteMany({});
    await Slot.deleteMany({});

    // Insert playgrounds
    const playgrounds = await Playground.insertMany([
      { name: "Green Valley Playground", location: "Hyderabad", sport_type: "Football" },
      { name: "City Sports Arena", location: "Bangalore", sport_type: "Cricket" },
      { name: "Ocean View Ground", location: "Chennai", sport_type: "Tennis" },
    ]);

    console.log("✅ Playgrounds added");

    // Insert slots
    const slots = [
      { playgroundId: playgrounds[0]._id, startTime: "2025-09-03T09:00:00", endTime: "2025-09-03T10:00:00" },
      { playgroundId: playgrounds[0]._id, startTime: "2025-09-03T10:00:00", endTime: "2025-09-03T11:00:00" },
      { playgroundId: playgrounds[1]._id, startTime: "2025-09-03T14:00:00", endTime: "2025-09-03T15:00:00", isBooked: true },
      { playgroundId: playgrounds[2]._id, startTime: "2025-09-04T16:00:00", endTime: "2025-09-04T17:00:00" },
    ];

    await Slot.insertMany(slots);
    console.log("✅ Slots added");

    mongoose.connection.close();
    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedData();
