const express = require("express");
const router = express.Router();
const { verifyTokenAndUser, verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const { getAllUsers, getUserById, updateUser, deleteUser, blockUser, unblockUser } = require("../controllers/userController")

// update User
router.put("/edit/:id", verifyTokenAndUser, updateUser)

// Get all Users
router.get("/", verifyTokenAndAdmin, getAllUsers)

// Get User by ID
router.get("/:id", verifyTokenAndUser, getUserById)

// Delete User
router.delete("/remove/:id", verifyTokenAndAdmin, deleteUser)

// block user 
router.put("/block/:id", verifyTokenAndAdmin, blockUser)

// unblock user
router.put("/unblock/:id", verifyTokenAndAdmin, unblockUser)



module.exports = router