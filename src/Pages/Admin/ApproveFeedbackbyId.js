import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import "./AdminPages.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ApproveFeedbackById = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchPendingFeedbacks();
  }, []);

  const fetchPendingFeedbacks = async () => {
    try {
      const res = await api.get("Feedback/all-feedbacks");
      const pending = res.data.filter(f => f.status === "Pending");
      setFeedbacks(pending);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending feedbacks");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`Feedback/approve/${id}`);
      setMsg(`Feedback #${id} approved`);
      fetchPendingFeedbacks();
    } catch (err) {
      console.error(err);
      setMsg(`Failed to approve feedback #${id}`);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading pending feedbacks...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  const users = localStorage.getItem("userName");

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <h2>Welcome, {users}</h2>
        <Link to="/AllUsers" className="link-nav">All Users</Link>
          <Link to="/PendingFeedbacks" className="link-nav">Approve Feedbacks</Link>
          <Link to="/ApproveFeedbackById" className="link-nav">Approve by ID</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <h2>Approve pending Feedbacks</h2>
      {msg && <p className="info-msg">{msg}</p>}

      {feedbacks.length === 0 ? (
        <p>No pending feedbacks</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Mentor</th>
              <th>Week</th>
              <th>Lines Of Code</th>
              <th>Rating</th>
              <th>Submitted On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.userName || "N/A"}</td>
                <td>{f.mentorName}</td>
                <td>{f.week}</td>
                <td>{f.linesOfCode}</td>
                <td>{f.rating}</td>
                <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(f.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveFeedbackById;
