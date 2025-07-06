const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userDBM");

const SECRET = "your_jwt_secret_key";

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password) return res.status(400).json({ message: "Password is required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, isGoogleUser: false });

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "7d" });

        res.status(201).json({
            message: "User created successfully",
            token,
            user: { email: user.email }
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email" });
    if (user.isGoogleUser) return res.status(400).json({ message: "Please login with Google" });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "7d" });
    res.json({ token, user: { email: user.email } });
};

const googleLogin = async (req, res) => {

    const { email } = req.body;

    let user = await User.findOne({ email });
    
    if (!user) {
        user = await User.create({
            email,
            password: "",
            isGoogleUser: true
        });
    }

    if (!user.isGoogleUser) {
        return res.status(400).json({ message: "Please login with Email & Password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "7d" });
    res.json({ token, user: { email: user.email } });
};

module.exports = { signup, login, googleLogin };

