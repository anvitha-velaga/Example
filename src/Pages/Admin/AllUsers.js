import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./AdminPages.css"; // unified CSS
import { Link } from "react-router-dom";

const AllFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("Feedback/all-feedbacks");
      setFeedbacks(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load feedbacks");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  const adminName = localStorage.getItem("userName");

  if (loading) return <p className="center-text">Loading feedbacks...</p>;
  if (error) return <p className="center-text error-text">{error}</p>;

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <h2>Welcome, {adminName}</h2>
        <Link to="/AllUsers" className="link-nav">All Users</Link>
        <Link to="/PendingFeedbacks" className="link-nav">Approve Feedbacks</Link>
        <Link to="/ApproveFeedbackById" className="link-nav">Approve by ID</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
        
      </header>

      <h2 className="page-title">All Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="center-text">No feedbacks found</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Mentor</th>
                <th>Week</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Lines Of Code</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f.id}>
                  <td>{f.userName || "N/A"}</td>
                  <td>{f.mentorName}</td>
                  <td>{f.week}</td>
                  <td>{f.rating}</td>
                  <td>{f.status}</td>
                  <td>{f.linesOfCode}</td>
                  <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllFeedbacks;

