import axios from "axios"
import type { Order, OrderedBooks } from "../types/Order"




export const getUserPastOrders = async () => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const res = await axios.get(`http://localhost:5000/api/order/user/${userId}`,
        {
            headers: {
                token: token
            }
        }
    )
    return res.data
}


export const getAllOrders = async (orderStatus: string) => {
    const token = localStorage.getItem("token")

    const url = orderStatus === " " ? "http://localhost:5000/api/order" : `http://localhost:5000/api/order?orderStatus=${orderStatus}`
    const res = await axios.get(url, {
        headers: {
            token: token
        }
    })
    return res.data
}

export const getOrderInfo = async (orderId: string) => {
    const token = localStorage.getItem("token")

    const res = await axios.get(`http://localhost:5000/api/order/${orderId}`, {
        headers: { token }
    })
    return res.data
}


export const newOrder = async (orderBooks: OrderedBooks[]) => {
    const token = localStorage.getItem("token")

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
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 30)
}

export const searchForOrder = (searchedOrder: string, data?: Order[]) => {
    if (!data) {
        return []
    }
    if (searchedOrder.trim() === "") {
        return data
    }
    return data.filter((user) => user.orderNumber.toLowerCase().includes(`${searchedOrder}`))
}

export const confirmOrder = async (orderId: string) => {
    const token = localStorage.getItem("token")

    const res = await axios.put(`http://localhost:5000/api/order/confirmOrder/${orderId}`,
        {},
        {
            headers: {
                token: token
            }
        }
    )
    return res.data
}