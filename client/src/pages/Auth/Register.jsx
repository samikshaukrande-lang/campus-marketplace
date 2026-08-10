import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

import {
  FaGoogle,
  FaWindows
} from "react-icons/fa";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if (!name || !email || !college || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          college,
          password
        }
      );

      alert(response.data.message);

      // Register झाल्यावर fields clear
      setName("");
      setEmail("");
      setCollege("");
      setPassword("");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration Failed"
      );

    }

  };

  return (

    <div className="register-container">

      <div className="register-card">

        <div className="logo">

          Campus
          <span>Market</span>

        </div>

        <h2>Create Account</h2>

        <p>Join your campus marketplace</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="College Name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="register-btn"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="or">
          OR
        </div>

        <button className="social-btn">
          <FaGoogle />
          Google
        </button>

        <button className="social-btn">
          <FaWindows />
          Microsoft
        </button>

      </div>

    </div>

  );

};

export default Register;