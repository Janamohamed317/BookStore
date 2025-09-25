const mongoose = require("mongoose")
const Joi = require("joi");
const { nanoid } = require("nanoid");


const orderSchema = new mongoose.Schema(
    {
        books: [
            {
                _id: false,
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Book"
                },
                quantity:
                {
                    type: Number,
                    required: true,
                },
                title:
                {
                    type: String,
                    required: true,
                },
                image:
                {
                    type: String,
                    default: "image",
                },
                price:
                {
                    type: Number,
                    required: true,
                    min: 0
                }
            },
        ],
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        subTotal: {
            type: Number,
            min: 30,
            default: 30
        },
        status: {
            type: String,
            default: "Pending"
        },
        orderNumber: {
            type: String,
            unique: true,
            required: true,
            default: () => "ORD-" + nanoid(10),
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        notes:
        {
            type: String,
            default: ""
        }
    },
    { timestamps: true }

)

const Order = mongoose.model("Order", orderSchema)

function ValidateOrderCreation(obj) {
    const schema = Joi.object(
        {
            books: Joi.array()
                .items(
                    Joi.object({
                        book: Joi.string().required(),
                        quantity: Joi.number().required().min(1),
                        title: Joi.string().required(),
                        image: Joi.string(),
                        price: Joi.number().required().min(0),
                    })
                )
                .min(1)
                .required(),
            user: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.string().pattern(/^\d{11,}$/).required(),
            notes: Joi.string().allow("").optional()
        }
    )
    return schema.validate(obj)
}


module.exports = {
    ValidateOrderCreation,
    Order,
}
