import { generateToken } from '../lib/utils.js';
import User from '../modules/user.model.js';
import bcrypt from 'bcryptjs';

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
export const login = (req, res) => {
    res.send("login route");
}
export const logout = (req, res) => {
    res.send("logout route");
}