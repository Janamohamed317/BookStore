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
        confirmed:
        {
            type: Boolean,
            required: true,
            default: false
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
            confirmed: Joi.boolean(),
            subTotal: Joi.number().min(0),
            status: Joi.boolean()

        }
    )
    return schema.validate(obj)
}


module.exports = {
    ValidateOrderCreation,
    Order,
}
