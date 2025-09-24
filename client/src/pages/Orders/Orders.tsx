import { useNavigate } from "react-router"
import useGetAllOrders from "../../hooks/orders/useGetAllOrders"
import { searchForOrder } from "../../services/OrdersServices"
import { useState } from "react"
import Search from "../../components/Search/Search"
import { orderStatus } from "../../assets/assets"

const Orders = () => {

    const [searchedItem, setSearchedItem] = useState("")
    const [filterOption, setFilterOption] = useState("")

    const { data } = useGetAllOrders(filterOption)

    const FilteredData = searchForOrder(searchedItem, data!)

    const navigate = useNavigate()

    return (
        <div className="p-6 h-screen">
            <p className="font-bold text-3xl text-center text-[#E6D5C3] mb-6">
                Orders
            </p>

            <div className="flex items-center justify-between mb-4">
                <Search sendDataToParent={setSearchedItem} />
                <select
                    className="ml-4 px-3 py-2 rounded-lg bg-[#3D2C22]/70 text-[#F5EDE0]"
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="">All Orders</option>
                    {orderStatus.map((order) => (
                        <option key={order.id} value={order.status}>
                            {order.status}
                        </option>
                    ))}
                </select>
            </div>

            <table className="w-full bg-[#2B2118]/50 backdrop-blur-md text-[#F5EDE0] rounded-xl overflow-hidden">
                <thead className="bg-[#3D2C22]/70 text-[#E6D5C3]">
                    <tr>
                        <th className="px-4 py-3 text-left">Order Number</th>
                        <th className="px-4 py-3 text-left">Order Status</th>
                        <th className="px-4 py-3 text-left">User</th>
                        <th className="px-4 py-3 text-left">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {FilteredData?.map((order) => (
                        <tr
                            key={order._id}
                            className="border-b border-[#6C584C]/30 hover:bg-[#3D2C22]/40 transition"
                        >
                            <td className="px-4 py-2">{order.orderNumber}</td>
                            <td className="px-4 py-2">{order.status}</td>
                            <td className="px-4 py-2">{order.user}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="px-3 py-1 bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] font-semibold rounded-lg cursor-pointer"
                                    onClick={() => navigate(`/user/orders/${order._id}`)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders
