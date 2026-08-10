import React, { useState } from "react";
import "./Login.css";

import { FaGoogle, FaWindows } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            // Save Token
            localStorage.setItem("token", response.data.token);

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful ✅");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="auth-container">

            {/* Left Illustration */}

            <div className="auth-left">

                <div className="brand">

                    Campus
                    <span>Market</span>

                </div>

                <h1>

                    Buy & Sell Smartly
                    <br />
                    Inside Your Campus

                </h1>

                <p>

                    A student marketplace where you can
                    buy, sell and connect with students.

                </p>

                <div className="illustration">

                    🛒📚💻

                </div>

            </div>

            {/* Login Card */}

            <div className="auth-card">

                <h2>

                    Welcome Back 👋

                </h2>

                <p className="subtitle">

                    Login to your account

                </p>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="main-btn"
                    onClick={handleLogin}
                >

                    Login

                </button>

                <div className="divider">

                    <span></span>
                    OR
                    <span></span>

                </div>

                <button className="social google">

                    <FaGoogle />

                    Continue with Google

                </button>

                <button className="social microsoft">

                    <FaWindows />

                    Continue with Microsoft

                </button>

                <p className="bottom-text">

                    Don't have account?

                    <Link to="/register">

                        <span>

                            Register

                        </span>

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;