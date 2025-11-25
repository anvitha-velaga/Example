// src/Pages/User/SubmitFeedback.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubmitFeedback.css";
import { Link } from "react-router-dom";

export default function SubmitFeedback() {
  const navigate = useNavigate();
  const [mentorName, setMentorName] = useState("");
  const [week, setWeek] = useState("");
  const [queries, setQueries] = useState("");
  const [openQueries, setOpenQueries] = useState("");
  const [linesOfCode, setLinesOfCode] = useState("");
  const [rating, setRating] = useState(1);
  const [user, setUser] = useState("");

  // Fetch username from token/localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }

    // Decode token to get username
    const payload = JSON.parse(atob(token.split(".")[1]));
    const username =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"];
    setUser(username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    const feedbackData = {
      mentorName,
      week,
      queries,
      openQueries,
      linesOfCode,
      rating: Number(rating),
    };

    try {
      const res = await fetch("https://localhost:7079/api/Feedback/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Failed to submit feedback");
      }

      alert("Feedback submitted successfully!");

      // Reset form
      setMentorName("");
      setWeek("");
      setQueries("");
      setOpenQueries("");
      setLinesOfCode("");
      setRating(1);

    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting feedback. Check console.");
    }
  };
   const users = localStorage.getItem("userName");

  return (
    <div className="form-container-wrapper">
      {/* Header identical to ViewStatus */}
      <header className="form-header">
        <h2>Welcome, {users}</h2>
        <Link to="/SubmitFeedback" className="link-nav">Submit new feedback</Link>
        <Link to="/ViewStatus" className="link-nav">View Recents</Link>
        <Link to="/SubmittedFeedbacks" className="link-nav">Submitted Feedbacks</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="form-container">
        <h2 className="form-title">
          Freshers 2025 - AppDev - Feedback survey about your Mentor
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Your Mentor full name</label>
          <input
            type="text"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
            required
          />

          <label>Choose the Week you are providing review for</label>
          <select value={week} onChange={(e) => setWeek(e.target.value)} required>
            <option value="">Select Week</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={`Week ${i + 1}`}>Week {i + 1}</option>
            ))}
          </select>

          <label>Did your mentor answer all your questions this week?</label>
          <select value={queries} onChange={(e) => setQueries(e.target.value)} required>
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>If you have open queries, describe them</label>
          <input
            type="text"
            value={openQueries}
            onChange={(e) => setOpenQueries(e.target.value)}
            placeholder="Type NA if no open queries"
          />

          <label>How many lines of code did you write this week?</label>
          <input
            type="text"
            value={linesOfCode}
            onChange={(e) => setLinesOfCode(e.target.value)}
          />

          <label>Overall rating for your mentor</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}
