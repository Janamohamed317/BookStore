import { useMutation } from '@tanstack/react-query';
import type { OrderedBooks } from '../../types/Order';
import { newOrder } from '../../services/OrdersServices';
import Swal from 'sweetalert2';
import axios from 'axios';

const useMakeOrder = (cartItems: OrderedBooks[]) => {
    return useMutation({
        mutationKey: ["order", cartItems],
        mutationFn: () => newOrder(cartItems),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "Order Placed Successfully",
                confirmButtonText: "OK",
            });
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