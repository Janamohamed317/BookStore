const { Book } = require("../models/Book")
const { User } = require("../models/User")
const { Order, ValidateOrderCreation } = require("../models/Order")
const asyncHandler = require("express-async-handler")


// get all orders
const getAllOrders = asyncHandler(async (req, res) => {
    const { orderStatus } = req.query
    let orderList
    if (orderStatus) {
        orderList = await Order.find({ status: orderStatus })
    }
    else {
        orderList = await Order.find()
    }
    if (!orderList) {
        return res.status(404).json({ message: "Orders Not Found" })
    }
    res.status(200).json(orderList)

})

// make an order
const makeOrder = asyncHandler(async (req, res) => {
    const { error } = ValidateOrderCreation(req.body)
    const user = await User.findById(req.body.user)
    if (user.blocked) {
        return res.status(400).json({ message: "You are Blocked, You Can't Make an Order" })
    }

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
    let subTotal = 30
    for (const book of req.body.books) {
        const orderedBook = await Book.findById(book.book)
        subTotal += (book.quantity * book.price)
        orderedBook.quantity -= book.quantity
        await orderedBook.save()
    }

    const newOrder = new Order({
        user: req.body.user,
        books: req.body.books,
        address: req.body.address,
        notes: req.body.notes,
        phone: req.body.phone,
        subTotal: subTotal
    })

    const result = await newOrder.save()
    res.status(201).json(result);

})

// get orders for user
const getOrdersForUser = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const orderList = await Order.find({ user: userId })

    if (!orderList) {
        return res.status(404).json({ message: "Orders Not Found" })
    }
    return res.status(200).json(orderList)
})


// get order with its ID
const getOrderByOrderId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const order = await Order.findById(id)
    if (!order) {
        res.status(404).json({ message: "Order Not Found" })
    }
    res.status(200).json(order)
})

// delete ll order
const deleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndDelete(id)
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" })
    }
    return res.status(200).json({ message: "Order is Deleted" })
})

// confirm ll order
const confirmOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: "Confirmed"
        },
        { new: true }
    );
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" })
    }


    res.status(200).json({ message: "Order confirmed", order });
})


const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" })
    }
    for (orderedBook of order.books) {
        const book = await Book.findById(orderedBook.book)
        book.quantity += orderedBook.quantity
        await book.save()

    }
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Order Canceled" });
})

module.exports =
{
    getAllOrders,
    getOrderByOrderId,
    getOrdersForUser,
    makeOrder,
    deleteOrder,
    confirmOrder,
    cancelOrder,
}