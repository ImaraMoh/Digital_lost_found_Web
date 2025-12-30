import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await API.get("/Lost"); // Ensure backend route is correct
        setLostItems(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load lost items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLostItems();
  }, []);

  const handleAddLost = () => {
    navigate("/LostForm");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Lost & Found Dashboard</h1>
        <button onClick={handleAddLost}>Post Lost Item</button>
      </header>

      {loading ? (
        <p className="status-message">Loading lost items...</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : lostItems.length === 0 ? (
        <p className="status-message">No lost items posted yet.</p>
      ) : (
        <div className="items-grid">
          {lostItems.map((item) => (
            <div key={item._id} className="item-card">
              <img
                src={
                  item.image
                    ? item.image
                    : "https://via.placeholder.com/200x140?text=No+Image"
                }
                alt={item.title}
              />
              <h3>{item.title}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
