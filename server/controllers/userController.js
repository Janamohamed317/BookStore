const asyncHandler = require("express-async-handler")
const { User, ValidateUpdateUser } = require("../models/User")
const bcrypt = require("bcryptjs")


const updateUser = asyncHandler(async (req, res) => {
    const { error } = ValidateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    const UpdatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:
        {
            email: req.body.email,
            username: req.body.username,
        }
    }, { new: true }).select('-password')

    res.status(200).json(UpdatedUser)
})


const getAllUsers = asyncHandler(async (req, res) => {
    const { blocked } = req.query
    let users

    // feh hena moshkla lw b false 
    if (blocked) {
        users = await User.find({ blocked: blocked }).select("-password")
    }
    else {
        users = await User.find().select("-password")
    }
    res.status(200).json(users)
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {

        res.status(200).json(user)
    }
    else {
        res.status(404).json({ message: " User Not Found " })
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).select("-password")
    if (user) {
        res.status(200).json({ message: " User has been deleted" })
    }
    else {
        res.status(404).json({ message: " User Not Found" })
    }
})

const blockUser = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            blocked: true
        }
    }, { new: true })
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.status(200).json({ user, message: "User is Blocked successfully" })
})


const unblockUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            blocked: false
        }
    }, { new: true })
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.status(200).json({ message: "User is Unblocked successfully" })
})

module.exports =
{
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
}