// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
    sendForgotPasswordEmail,
    verifyResetLink,
    resetPassword
} = require("../controllers/passwordController");

router.post("/forgot-password", sendForgotPasswordEmail);
router.get("/reset-password/:id/:token", verifyResetLink);
router.post("/reset-password/:id/:token", resetPassword);

module.exports = router;
