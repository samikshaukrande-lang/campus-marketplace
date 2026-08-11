
import React, { useState } from "react";
import "./Login.css";

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
                "https://campus-marketplace-14dq.onrender.com/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.log("Login Error:", error);

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-left">

                <div className="brand">
                    Campus<span>Market</span>
                </div>

                <h1>
                    Welcome Back 👋
                </h1>

                <p>
                    Login to your account and
                    continue exploring Campus Marketplace.
                </p>

                <div className="illustration">
                    🛒📚💻
                </div>

            </div>


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
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />


                <button
                    className="main-btn"
                    onClick={handleLogin}
                >
                    Login
                </button>


                <p className="bottom-text">

                    Don't have account?{" "}

                    <Link to="/register">
                        <span>Register</span>
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;

