const express = require("express");
const { verifyTokenAndAdmin, verifyTokenAndUser, verifyToken, verifyTokenAndOrderOwner,
    verifyOrderDetails, verifyOrderConfirmationAndCancelation } = require("../middlewares/verifyToken")
const { deleteOrder, getOrderByOrderId, getOrdersForUser,
    getAllOrders, makeOrder, confirmOrder,
    cancelOrder } = require("..//controllers/orderController")

const router = express.Router();

// get all orders
router.get("/", verifyTokenAndAdmin, getAllOrders)

// get order by order Id 
router.get("/:id", verifyOrderDetails, getOrderByOrderId)

// get User's orders 
router.get("/user/:id", verifyTokenAndOrderOwner, getOrdersForUser)

// delete order
router.delete("/remove/:id", verifyTokenAndAdmin, deleteOrder)

// make an order
router.post("/newOrder", verifyToken, makeOrder)

// confirm order
router.put("/confirmOrder/:id", verifyOrderConfirmationAndCancelation, confirmOrder)

// cancel order
router.delete("/cancel/:id", verifyOrderConfirmationAndCancelation, cancelOrder)

module.exports = router

