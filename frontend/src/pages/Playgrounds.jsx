import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Playgrounds.css";

function Playgrounds() {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [msg, setMsg] = useState("");

  const loadPlaygrounds = async () => {
    try {
      const res = await API.get("/playgrounds");
      setPlaygrounds(res.data);
    } catch (error) {
      setMsg("❌ Failed to load playgrounds");
    }
  };

  useEffect(() => {
    loadPlaygrounds();
  }, []);

  return (
    <div className="playgrounds-page">
      <h2>Playgrounds</h2>
      {msg && <div className="error-msg">{msg}</div>}

      {playgrounds.map((sportGroup, idx) => (
        <div key={idx} className="sport-group">
          <h3 className="sport-type">{sportGroup.sport}</h3>
          <div className="grounds-grid">
            {sportGroup.grounds.map((pg) => (
              <div key={pg.id} className="playground-card">
                <img
                  src={`https://source.unsplash.com/300x200/?${sportGroup.sport}`}
                  alt={pg.name}
                  className="playground-img"
                />
                <h4>{pg.name}</h4>
                <p>📍 {pg.location}</p>
                <Link to={`/playgrounds/${pg.id}`}>
                  <button className="details-btn">View Slots</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Playgrounds;
