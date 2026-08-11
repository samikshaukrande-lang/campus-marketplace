import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <GoogleOAuthProvider
            clientId="930909343892-7uiks646kiv9v1jjnd55g92685s6ud36.apps.googleusercontent.com"
        >
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>
);