const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


// Send reset password email
module.exports.sendForgotPasswordEmail = asyncHandler(async (req, res) => {
    const { email } = req.body; 
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "10m" });

    const link = `http://localhost:5173/reset-password/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click the link below to reset your password:</p><a href="${link}">${link}</a>`,
    });

    res.json({ message: "Password reset email sent!" });
});

// Verify reset link
module.exports.verifyResetLink = asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        jwt.verify(token, secret);
        res.status(200).json({ message: "Token valid, proceed to reset password" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});

// Reset password
module.exports.resetPassword = asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        jwt.verify(token, secret);

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});
