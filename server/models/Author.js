const mongoose = require("mongoose")
const Joi = require("joi");



const AuthorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
        trim: true,
        unique: true
    },
    nationality: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    image:
    {
        type: String,
        default: "image.png"
    },
    isDeleted:
    {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
})

const Author = mongoose.model("Author", AuthorSchema)


function ValidateAddAuthor(obj) {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(40).required().trim(),
        nationality: Joi.string().min(2).max(50).required().trim(),
    })
    return schema.validate(obj);
}


function ValidateUpdateAuthor(obj) {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(40).required().trim(),
        nationality: Joi.string().min(2).max(50).trim(),
    })
    return schema.validate(obj);
}


module.exports = {
    Author,
    ValidateAddAuthor,
    ValidateUpdateAuthor,
}