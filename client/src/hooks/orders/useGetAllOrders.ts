import { useQuery } from '@tanstack/react-query'
import type { Order } from '../../types/Order'
import { getAllOrders } from '../../services/OrdersServices'

const useGetAllOrders = () => {
  return useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: getAllOrders,
        refetchOnWindowFocus: false
    })
}

export default useGetAllOrders