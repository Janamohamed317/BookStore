import { useQuery } from '@tanstack/react-query'
import type { Order } from '../../types/Order'
import { getOrderInfo } from '../../services/OrdersServices'

const useGetOrderInfo = (orderId: string) => {
  return useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderInfo(orderId!),
    enabled: !!orderId,
    refetchOnWindowFocus: false
  })
}

export default useGetOrderInfo