import { generateToken } from '../lib/utils.js';
import User from '../modules/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';

// Sign Up Controller Method
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10); // 🔧 FIXED: was bcrypt.getSalt()
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save(); // Save first

        // Generate JWT
        generateToken(newUser._id, res);

        // Respond
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic || null, // optional fallback
        });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again." }); // 🎯 Clean error message
    }
};

// Sign In && Log In controller Method
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email }); // ✅ FIXED

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        generateToken(user._id, res);

        // Send response
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || null,
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again." }); // 🎯 Clean error message
    }
};

// Sign Out && Log Out Controller Method
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update Controller Method
export const updateProfilen = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.Uploader.Upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                profilePic: uploadResponse.secure_url
            },
            { new: true }
        );

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// -- check auth
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}