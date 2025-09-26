const { User, ValidateUserLogin, ValidateUserRegistration } = require("../models/User")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")



const signUp = asyncHandler(async (req, res) => {
    const { error } = ValidateUserRegistration(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email })
    if(!user)
    {

        user = await User.findOne({ username: req.body.username })
    }

    if (user) {
        return res.status(409).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    user = new User(
        {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
    )
    const result = await user.save()
    const token = user.generateToken()
    const { password, ...other } = result._doc
    res.status(201).json({ ...other, token })

})

const signIn = asyncHandler(async (req, res) => {
    
    const { error } = ValidateUserLogin(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let user = await User.findOne({ email: req.body.email })
    
    if (!user) {
        return res.status(404).json({ message: "Invalid Email or Password" })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    
    if (!isPasswordMatch) {
        return res.status(404).json({ message: "Invalid Email or Password" })
    }
    const token = user.generateToken()
    const { isAdmin, password, ...other } = user._doc
    res.status(200).json({ ...other, token })

})

module.exports = {
    signIn,
    signUp,
}