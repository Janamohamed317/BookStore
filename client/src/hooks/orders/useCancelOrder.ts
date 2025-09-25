import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "../../services/OrdersServices"


const useCancelOrder = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId")
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PastOrders", userId] });
            queryClient.refetchQueries({ queryKey: ["PastOrders", userId] });
        }
    })
}

export default useCancelOrder