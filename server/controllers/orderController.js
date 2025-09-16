const { Book } = require("../models/Book")
const { Order, ValidateOrderCreation } = require("../models/Order")
const asyncHandler = require("express-async-handler")


// get all orders
const getAllOrders = asyncHandler(async (req, res) => {
    const orderList = await Order.find()
    if (orderList) {
        res.status(200).json(orderList)
    }
    else {
        res.status(404).json({ message: "Orders Not Found" })
    }
})


// make an order
const makeOrder = asyncHandler(async (req, res) => {
    const { error } = ValidateOrderCreation(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    for (const book of req.body.books) {
        const orderedBook = await Book.findById(book.book)
        if (!orderedBook) {
            return res.status(404).json({ message: "Book Not Found" })
        }
        if (orderedBook.quantity < book.quantity) {
            return res.status(400).json({ message: `Only ${orderedBook.quantity} Copies of ${orderedBook.title} are Available` })
        }
    }

    const newOrder = new Order({
        user: req.body.user,
        books: req.body.books,
        subTotal: req.body.subTotal
    })

    const result = await newOrder.save()
    res.status(201).json(result);

})


// get orders for user
const getOrdersForUser = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const orderList = await Order.find({ user: userId })

    if (orderList) {
        return res.status(200).json(orderList)
    }
    else {
        return res.status(404).json({ message: "Orders Not Found" })
    }
})


// get order with its ID
const getOrderByOrderId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const order = await Order.findById(id)
    if (order) {
        res.status(200).json(order)
    }
    else {
        res.status(404).json({ message: "Order Not Found" })
    }

})


// delete ll order
const deleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndDelete(id)
    if (order) {
        return res.status(200).json({ message: "Order is Deleted" })
    }
    else {
        return res.status(404).json({ message: "Order Not Found" })
    }

})

// confirm ll order
const confirmOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            confirmed: true,
            status: "Confirmed"
        },
        { new: true }
    );
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" })
    }

    for (const book of order.books) {
        const orderedBook = await Book.findById(book.book)
        orderedBook.quantity -= book.quantity
        await orderedBook.save()
    }

    res.status(200).json({ message: "Order confirmed", order });
})


module.exports =
{
    getAllOrders,
    getOrderByOrderId,
    getOrdersForUser,
    makeOrder,
    deleteOrder,
    confirmOrder,
}