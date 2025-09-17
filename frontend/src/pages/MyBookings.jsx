// src/pages/MyBookings.jsx
import React, { useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // Example: simulate booking from PlaygroundDetail
  // In real app, this will come from backend or global state
  const addBooking = (playgroundId, slotTime) => {
    const newBooking = {
      id: Date.now(), // unique id
      playgroundId,
      slotTime,
      status: "confirmed",
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet. Go to Playgrounds and book a slot!</p>
      ) : (
        <div style={{ display: "grid", gap: "12px", marginTop: "15px" }}>
          {bookings.map((b) => (
            <div
              key={b.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <p>
                <strong>Playground ID:</strong> {b.playgroundId}
              </p>
              <p>
                <strong>Slot:</strong> {b.slotTime}
              </p>
              <p>
                <strong>Status:</strong> {b.status}
              </p>
              <button
                onClick={() => cancelBooking(b.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
