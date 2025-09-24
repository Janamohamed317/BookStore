import { useQuery } from '@tanstack/react-query'
import type { Order } from '../../types/Order'
import { getAllOrders } from '../../services/OrdersServices'

const useGetAllOrders = (status: string) => {
  return useQuery<Order[]>({
    queryKey: ["orders", status],
    queryFn: () => getAllOrders(status),
    refetchOnWindowFocus: false
  })
}

export default useGetAllOrders