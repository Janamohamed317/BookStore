import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteOrder } from "../../services/OrdersServices"


const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.refetchQueries({ queryKey: ["orders"] });
        }
    })
}

export default useDeleteOrder