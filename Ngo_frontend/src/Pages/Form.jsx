import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../api";
import axios from "axios";
import "../Styles/Form.css";

const Form = () => {
  const navigate = useNavigate(); 
  const [ngos, setNgos] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    father_name: "",
    birth_date: "",
    address: "",
    qualification: "",
    email: "",
    phone: "",
    password: "",
    passport_photo: null,
  });

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    api.get("ngos/")
      .then((response) => setNgos(response.data))
      .catch((error) => console.error("Error fetching NGOs:", error));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "passport_photo") {
      setFormData({ ...formData, passport_photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/submit/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatusMessage(response.data.message);

      // Redirect to Status Page after form submission
      navigate(`/status?email=${formData.email}`);

    } catch (error) {
      setStatusMessage("Error submitting form");
    }
  };

  return (
    <div className="form-page">
      {/* NGO List Section */}
      <section className="ngo-list">
        <h1>Registered NGOs</h1>
        <ul>
          {ngos.map((ngo) => (
            <li key={ngo.id}>{ngo.name}</li>
          ))}
        </ul>
      </section>

      {/* Button to Open Form Popup */}
      <button className="open-form-btn" onClick={() => setShowPopup(true)}>
        Open Form
      </button>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h1>Submit Your Details</h1>
            <form onSubmit={handleSubmit} className="form">
              <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="middle_name" placeholder="Middle Name" onChange={handleChange} />
              <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
              <input type="text" name="father_name" placeholder="Father's Name" onChange={handleChange} required />
              <input type="date" name="birth_date" onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
              <input type="text" name="qualification" placeholder="Qualification" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <input type="file" name="passport_photo" onChange={handleChange} required />
              <button type="submit" className="submit-btn">Submit</button>
            </form>
            <p className="status-message">{statusMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
