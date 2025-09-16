const express = require("express");
const router = express.Router();
const { verifyTokenAndUser, verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController")

// update User
router.put("/edit/:id", verifyTokenAndUser, updateUser)


// Get all Users
router.get("/", verifyTokenAndAdmin, getAllUsers)


// Get User by ID
router.get("/:id", verifyTokenAndUser, getUserById)


// Delete User
router.delete("/remove/:id", verifyTokenAndUser, deleteUser)

module.exports = router