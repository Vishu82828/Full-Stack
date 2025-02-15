import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Get email from URL
import axios from "axios";
import "../Styles/Status.css";

function StatusPage() {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialEmail) {
      checkStatus(initialEmail);
    }
  }, [initialEmail]);

  const checkStatus = async (emailToCheck) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/status/${emailToCheck}/`);
      setStatus(response.data.status);
    } catch {
      setStatus("No form found");
    }
  };

  return (
    <div className="status-page">
      <h2>Check Application Status</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => checkStatus(email)}>Check Status</button>
      <p className="status-result">Status: {status}</p>
    </div>
  );
}

export default StatusPage;
