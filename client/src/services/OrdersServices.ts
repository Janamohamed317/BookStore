import axios from "axios"
import type { OrderedBooks } from "../types/Order"

const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId")


export const getUserPastOrders = async () => {
    const res = await axios.get(`http://localhost:5000/api/order/user/${userId}`,
        {
            headers: {
                token: token
            }
        }
    )
    return res.data
}


export const getAllOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/order", {
        headers: {
            token: token
        }
    })
    return res.data
}

export const getOrderInfo = async (orderId: string) => {
    const res = await axios.get(`http://localhost:5000/api/order/${orderId}`, {
        headers: { token }
    })
    return res.data
}


export const newOrder = async (orderBooks: OrderedBooks[]) => {
    await axios.post("http://localhost:5000/api/order/newOrder",
        {
            books: orderBooks,
            user: localStorage.getItem("userId")
        },
        {
            headers: {
                token: token
            }
        }
    )
}

export const calculateTotalPrice = (cartItems: OrderedBooks[]) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
}