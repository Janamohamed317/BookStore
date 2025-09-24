import { useMutation, useQueryClient } from '@tanstack/react-query'
import { confirmOrder } from '../../services/OrdersServices'
import Swal from 'sweetalert2'

const useConfirmOrder = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId")

    return useMutation({
        mutationFn: confirmOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PastOrders",userId] })
            queryClient.refetchQueries({ queryKey: ["PastOrders", userId] })
            Swal.fire({
                icon: "success",
                title: "Order Confirmed",
                text: "Thanks For Ordering From Our Store",
                confirmButtonText: "Ok"
            })
        },

    })
}

export default useConfirmOrder