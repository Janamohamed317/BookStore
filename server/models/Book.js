const mongoose = require("mongoose")
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 250,
        unique: true
    },
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author",
    },
    description:
    {
        type: String,
        required: true,
        trim: true,
    },
    price:
    {
        type: Number,
        required: true,
        min: 1
    },
    image:
    {
        type: String,
        default: "image.png"
    },
    cover:
    {
        type: String,
        required: true,
        enum: ["Soft Cover", "Hard Cover"],
    }

}, {
    timestamps: true,
})

const Book = mongoose.model("Book", bookSchema)


function ValidateBookCreation(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().min(1).required(),
        cover: Joi.string().valid("Soft Cover", "Hard Cover").required(),
    });

    return schema.validate(obj);
}

function ValidateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().trim(),
        price: Joi.number().min(1),
        cover: Joi.string().valid("Soft Cover", "Hard Cover"),
    });

    return schema.validate(obj);
}
module.exports =
{
    Book,
    ValidateBookCreation,
    ValidateUpdateBook,
}