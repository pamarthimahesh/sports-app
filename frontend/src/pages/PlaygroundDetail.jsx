import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./PlaygroundDetail.css";

const PlaygroundDetail = () => {
  const { id } = useParams();
  const [playground, setPlayground] = useState(null);
  const [slots, setSlots] = useState([]);
  const [msg, setMsg] = useState("");

  // Load playground and slots data
  const loadData = async () => {
    try {
      const playgroundRes = await API.get("/playgrounds");
      const pg = playgroundRes.data.flatMap(group => group.grounds).find(pg => pg.id === parseInt(id));
      setPlayground(pg);

      const slotsRes = await API.get(`/playgrounds/${id}/slots`);
      setSlots(slotsRes.data);
    } catch (error) {
      setMsg("❌ Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBooking = async (slotId) => {
    try {
      await API.post("/book-slot", { playground_id: parseInt(id), slot_id: slotId });
      alert("✅ Slot booked successfully!");
      loadData(); // Reload slots to show updated status
    } catch (error) {
      alert("❌ Booking failed or slot already booked");
    }
  };

  if (!playground) return <h2>Loading...</h2>;

  return (
    <div className="playground-detail">
      <h2>{playground.name}</h2>
      <p>📍 Location: {playground.location}</p>
      <p>⚽ Sport: {playground.sport}</p>

      <h3>Available Slots</h3>
      {msg && <div style={{ color: "crimson" }}>{msg}</div>}
      <div className="slots-container">
        {slots.map((slot) => (
          <div key={slot.id} className={`slot-card ${slot.booked ? "booked" : ""}`}>
            <span>{slot.time}</span>
            {slot.booked ? (
              <button disabled>Booked</button>
            ) : (
              <button onClick={() => handleBooking(slot.id)}>Book</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaygroundDetail;
