const mongoose = require("mongoose")
const Joi = require("joi");
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 50,
            unique: true,
        },
        username:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },
        password:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        isAdmin:
        {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
)

userSchema.methods.generateToken = function()
{
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY)
}

const User = mongoose.model("User", userSchema)




function ValidateUserRegistration(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(10).max(50).required(),
        username: Joi.string().trim().min(2).max(30).required(),
        password: Joi.string().trim().required().min(6),
    });

    return schema.validate(obj);
}

function ValidateUserLogin(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(10).max(50).required(),
        password: Joi.string().trim().required().min(6),
    });

    return schema.validate(obj);
}

function ValidateUpdateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(10).max(50),
        username: Joi.string().trim().min(2).max(30),
        password: Joi.string().trim().min(6),
    });

    return schema.validate(obj);
}


module.exports =
{
    User,
    ValidateUpdateUser,
    ValidateUserLogin,
    ValidateUserRegistration,
}


