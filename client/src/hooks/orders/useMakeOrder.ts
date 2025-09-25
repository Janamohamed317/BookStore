import { useMutation } from '@tanstack/react-query';
import type { CheckOut, OrderedBooks } from '../../types/Order';
import { newOrder } from '../../services/OrdersServices';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';

const useMakeOrder = (cartItems: OrderedBooks[], shippingInfo: CheckOut, clearCart: () => void) => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["order", cartItems],
        mutationFn: () => newOrder(cartItems, shippingInfo),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "Order Placed Successfully",
                confirmButtonText: "OK",
            });
            navigate('/')
            clearCart()
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "There is an error",
                    text: error.response?.data.message || "Network error",
                    confirmButtonText: "OK",
                });
            }
        },

    })

}
export default useMakeOrder