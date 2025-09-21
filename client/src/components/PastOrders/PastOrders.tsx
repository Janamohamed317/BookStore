import { useNavigate } from "react-router"
import useGetUserOrders from "../../hooks/orders/useGetUserOrders"


const PastOrders = () => {
    const navigate = useNavigate()
    const { data } = useGetUserOrders()

    return (
        <div className="text-white ">
            <h1 className="font-bold text-2xl px-5">Past Orders</h1>
            <table className="table-auto w-full mt-9">
                <thead >
                    <tr >
                        <th className="text-left px-5 py-2">Order Number</th>
                        <th className="text-left px-5 py-2">Date</th>
                        <th className="text-left px-5 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((order) => (
                        <tr key={order._id}>
                            <td className="px-5 py-2">
                                {order.orderNumber}
                            </td>
                            <td className="px-5 py-2">
                                12-5-2025
                            </td>
                            <td className="px-5 py-2">
                                {order.subTotal} $
                            </td>
                            <td className="px-5 py-2">
                                <button className="bg-yellow-900 p-2 rounded-2xl py-2 cursor-pointer"
                                    onClick={() => navigate(`/user/orders/${order._id}`)}>
                                    view
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
}

export default PastOrders