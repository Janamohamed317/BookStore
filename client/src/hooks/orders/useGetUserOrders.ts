import { useQuery } from '@tanstack/react-query'
import type { Order } from '../../types/Order'
import { getUserPastOrders } from '../../services/OrdersServices'

const useGetUserOrders = () => {
    const userId = localStorage.getItem("userId")
    return useQuery<Order[]>({
        queryKey: ["PastOrders", userId],
        queryFn: getUserPastOrders,
        refetchOnWindowFocus: false
    })
}

export default useGetUserOrders