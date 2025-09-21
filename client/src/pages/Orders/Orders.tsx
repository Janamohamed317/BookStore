import { useNavigate } from "react-router"
import useGetAllOrders from "../../hooks/orders/useGetAllOrders"

const Orders = () => {
    
    const { data } = useGetAllOrders()
    
    const navigate = useNavigate()

    return (
        <div className="mt-6">
            <p className="font-bold text-2xl text-[#3e2723] mb-4">Orders</p>
            <table className="w-full border-collapse rounded-lg shadow-sm overflow-hidden">
                <thead>
                    <tr className="bg-[#a47148] text-[#f5f5dc]">
                        <th className="px-4 py-2 text-left">Order Number</th>
                        <th className="px-4 py-2 text-left">Order Status</th>
                        <th className="px-4 py-2 text-left">User</th>
                        <th className="px-4 py-2 text-left">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((order) => (
                        <tr
                            key={order._id}
                            className="bg-[#f5f5dc] text-[#3e2723] hover:bg-[#e6dec5] transition"
                        >
                            <td className="px-4 py-2">{order.orderNumber}</td>
                            <td className="px-4 py-2">{order.status}</td>
                            <td className="px-4 py-2">{order.user}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => navigate(`/user/orders/${order._id}`)}>
                                    View</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders
