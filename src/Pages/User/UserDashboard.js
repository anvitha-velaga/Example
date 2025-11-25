import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";
import "./UserDashboard.css";
import "./ViewStatus";
import "./SubmittedFeedbacks";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [view, setView] = useState("submitted"); // default view

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("Feedback/my-feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  //Handle delete feedbacks
  const handleDelete = async (id) => {
    if (alert("Are you sure you want to delete this feedback?")) return;
    try {
      await api.delete(`Feedback/delete/${id}`);
      // Refresh list
      setFeedbacks(feedbacks.filter(f => f.id !== id));
      alert("Feedback deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete feedback.");
    }
  };

  //fetch userName
  const user = localStorage.getItem("userName");

  return (
    <div className="dashboard-container">
      {/* Top nav/header */}
      <header className="dashboard-header">
        <h2>Welcome, {user ? user : ""}</h2> {/*conditional rendering */}
        <nav>
        <Link to="/SubmitFeedback" className="link-nav">Submit new feedback</Link>
        <Link to="/ViewStatus" className="link-nav">View Recents</Link>
        <Link to="/SubmittedFeedbacks" className="link-nav">Submitted Feedbacks</Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {/* Page content-table */}
      <main className="dashboard-content">
        {view === "recent" && (
          <div>
            <h3>Recent Feedback Status</h3>
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
                {feedbacks.slice(-5).reverse().map(f => (
                  <tr key={f.id}>
                    <td>{f.mentorName}</td>
                    <td>{f.week}</td>
                    <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                    <td>{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "submitted" && (
          <div>
            <h3>All Submitted Feedbacks</h3>
            <table>
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Week</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? feedbacks.map(f => (
                  <tr key={f.id}>
                    <td>{f.mentorName}</td>
                    <td>{f.week}</td>
                    <td>{f.submittedOn ? new Date(f.submittedOn).toLocaleDateString() : "N/A"}</td>
                    <td>{f.status}</td>
                    <td >
                      <button 
                      className="Trash" 
                      onClick={() => handleDelete(f.id)}>
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4">No feedbacks submitted yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
