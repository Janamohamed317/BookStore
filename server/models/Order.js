const mongoose = require("mongoose")
const Joi = require("joi");


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
                    min: 1
                }
            },
        ],
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        confirmed:
        {
            type: Boolean,
            required: true,
            default: false
        },
        subTotal: {
            type: Number,
            required: true,
            min: 1
        },
        status: {
            type: String,
            default: "Pending"
        }
    }
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
                        price: Joi.number().required(),
                    })
                )
                .min(1)
                .required(),
            user: Joi.string().required(),
            confirmed: Joi.boolean(),
            subTotal: Joi.number().required().min(1),
            status: Joi.boolean()

        }
    )
    return schema.validate(obj)
}


module.exports = {
    ValidateOrderCreation,
    Order,
}
