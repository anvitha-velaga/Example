// src/Pages/User/SubmittedFeedbacks.js
import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./UserPages.css";
import { Link } from "react-router-dom";

const SubmittedFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/UserLogin");

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"]);

    fetchFeedbacks();
  }, [navigate]);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("Feedback/my-feedbacks");
      setFeedbacks(res.data);
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };
  const users = localStorage.getItem("userName");


  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Welcome, {users}</h2>
        <Link to="/SubmitFeedback" className="link-nav">Submit new feedback</Link>
        <Link to="/ViewStatus" className="link-nav">View Recents</Link>
        <Link to="/SubmittedFeedbacks" className="link-nav">Submitted Feedbacks</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="content-container">
        <h3>All Submitted Feedbacks</h3>
        <div className="table-container">
          {feedbacks.length === 0 ? (
            <p>No feedbacks submitted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Week</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(f => (
                  <tr key={f.id}>
                    <td>{f.mentorName}</td>
                    <td>{f.week}</td>
                    <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                    <td>{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;
