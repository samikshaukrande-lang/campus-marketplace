
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(
    "930909343892-7uiks646kiv9v1jjnd55g92685s6ud36.apps.googleusercontent.com"
);

// ================= REGISTER USER =================

export const registerUser = async (req, res) => {

    try {

        console.log("Received Data:", req.body);

        const {
            name,
            email,
            college,
            password
        } = req.body;

        if (!name || !email || !college || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({

            name,
            email,
            college,
            password: hashedPassword,
            role: "student"

        });

        res.status(201).json({

            message: "Register Successful",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                role: user.role

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// ================= LOGIN USER =================

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and Password are required"
            });

        }

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                role: user.role

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// ================= GOOGLE LOGIN =================

export const googleLogin = async (req, res) => {

    try {

        const { credential } = req.body;

        if (!credential) {

            return res.status(400).json({
                message: "Google credential is required"
            });

        }

        const ticket = await googleClient.verifyIdToken({

            idToken: credential,

            audience:
                "930909343892-7uiks646kiv9v1jjnd55g92685s6ud36.apps.googleusercontent.com"

        });

        const payload = ticket.getPayload();

        const {
            name,
            email,
            picture
        } = payload;

        if (!email) {

            return res.status(400).json({
                message: "Google account email not found"
            });

        }

        let user = await User.findOne({
            email
        });

        // Create new user if not found

        if (!user) {

            user = await User.create({

                name: name || "Google User",

                email,

                college: "Not Provided",

                password:
                    "google-" +
                    Math.random()
                        .toString(36)
                        .slice(2) +
                    Date.now(),

                profileImage: picture || "",

                role: "student"

            });

        }

        // Create JWT Token

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            message: "Google Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                role: user.role,
                profileImage: user.profileImage

            }

        });

    } catch (error) {

        console.log(
            "Google Login Error:",
            error
        );

        res.status(500).json({

            message: "Google Login Failed"

        });

    }

};

