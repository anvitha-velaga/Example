import React, { useState } from "react";
import api from "../../axiosConfig";
import "./UserLogin.css"; // same styles can be reused
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("UserLogin/register", {
        name,
        userName: username,
        password,
        Role: "User", // default role
      });
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/UserLogin"), 2000); // redirect after 2s
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg("Registration failed- Username already exist");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleRegister}>
        <h2 className="login-title">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {msg && <p className="info-msg">{msg}</p>}

        <button type="submit" className="primary-btn">Register</button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/UserDashboard")}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
