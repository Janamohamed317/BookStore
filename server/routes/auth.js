const express = require("express");
const router = express.Router();
const {signIn , signUp} = require ("../controllers/authController")

// SignUp
router.post("/register", signUp)


// Login
router.post("/login", signIn)




module.exports = router