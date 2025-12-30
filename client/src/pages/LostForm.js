import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function LostForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null); // image file
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "YOUR_CLOUDINARY_PRESET"); // replace with your preset
        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_NAME/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await cloudRes.json();
        imageUrl = data.secure_url;
      }

      await API.post("/lost", {
        title,
        category,
        location,
        date,
        image: imageUrl,
      });

      alert("Lost item posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error posting lost item");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Post Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px" }}
        />
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px" }}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "10px 0" }}
        />
        <br />
        <button type="submit" style={{ padding: "8px 16px", marginTop: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LostForm;
