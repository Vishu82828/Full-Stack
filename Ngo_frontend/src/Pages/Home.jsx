import "../Styles/Home.css";
import React, { useState } from "react";
import axios from "axios";


const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [donationAmount, setDonationAmount] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleLoginChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    alert("Login successful! (You can integrate API here)");
  };

  const handleDonation = async () => {
    if (!donationAmount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/donate/", {
        amount: donationAmount,
      });

      // Redirect user to payment page (e.g., Stripe checkout)
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Empowering Communities, Changing Lives</h1>
          <p>Join us in making the world a better place.</p>
          <button className="cta-button">Donate Now</button>
        </div>
      </header>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          We strive to uplift underprivileged communities by providing education, healthcare, and resources for sustainable living.
        </p>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <div className="impact-item">
          <h3>50K+</h3>
          <p>Lives Impacted</p>
        </div>
        <div className="impact-item">
          <h3>200+</h3>
          <p>Communities Helped</p>
        </div>
        <div className="impact-item">
          <h3>10K+</h3>
          <p>Volunteers</p>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="get-involved">
      <h2>Get Involved</h2>
      <div className="buttons">
        <button className="member-btn" onClick={() => setShowForm(true)}>
          Become a Member
        </button>
        <button className="donate-btn" onClick={() => setShowDonation(true)}>
          Make a Donation
        </button>
      </div>

      {/* Popup Form for Membership */}
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            {!submitted ? (
              <>
                <h3>Become a Member</h3>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
                  <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                  <button type="submit">Submit</button>
                </form>
              </>
            ) : (
              <>
                <h3>Login</h3>
                <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required />
                <button onClick={handleLogin}>Login</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Popup for Donations */}
      {showDonation && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowDonation(false)}>&times;</span>
            <h3>Make a Donation</h3>
            <input
              type="number"
              placeholder="Enter Amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
            <button onClick={handleDonation}>Proceed to Pay</button>
          </div>
        </div>
      )}
    </section>
    </div>
  );
};

export default Home;
