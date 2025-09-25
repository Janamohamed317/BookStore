import { useNavigate } from "react-router";
import useGetUserOrders from "../../hooks/orders/useGetUserOrders";
import useConfirmOrder from "../../hooks/orders/useConfirmOrder";
import useCancelOrder from "../../hooks/orders/useCancelOrder";

const PastOrders = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetUserOrders();
    const confirmOrder = useConfirmOrder();
    const cancelOrder = useCancelOrder()


    if (isLoading) {
        return <p className="text-center text-[#E6D5C3]">Loading...</p>;
    }
    if (data?.length === 0) {
        return <p className="text-center text-gray-400">No Orders Yet</p>;
    }

    return (
        <div className="text-[#E6D5C3] p-6">
            <h1 className="font-bold text-2xl mb-6">Past Orders</h1>

            <table className="table-auto w-full bg-[#2B2118]/60 backdrop-blur-md rounded-xl shadow-lg">
                <thead className="bg-[#3D2C22]/70 text-[#F5EDE0]">
                    <tr>
                        <th className="text-left px-5 py-3">Order Number</th>
                        <th className="text-left px-5 py-3">Date</th>
                        <th className="text-left px-5 py-3">Total</th>
                        <th className="text-left px-5 py-3">Status</th>
                        <th className="text-left px-5 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((order) => (
                        <tr
                            key={order._id}
                            className="border-b border-[#6C584C]/30 hover:bg-[#3D2C22]/40 transition"
                        >
                            <td className="px-5 py-3">{order.orderNumber}</td>
                            <td className="px-5 py-3">12-5-2025</td>
                            <td className="px-5 py-3">{order.subTotal} $</td>
                            <td className="px-5 py-3">{order.status}</td>
                            <td className="px-5 py-3 space-x-2">
                                <button
                                    className="cursor-pointer px-4 py-2 rounded-xl bg-[#3A5A78] hover:bg-[#4F7191] text-white font-medium transition"
                                    onClick={() => navigate(`/user/orders/${order._id}`)}
                                >
                                    View
                                </button>

                                <button
                                    disabled={order.status === "Confirmed"}
                                    className="cursor-pointer px-4 py-2 rounded-xl bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] font-semibold transition"
                                    onClick={() => confirmOrder.mutate(order._id)}
                                >
                                    Confirm
                                </button>

                                <button
                                    disabled={order.status === "Confirmed"}
                                    className="cursor-pointer px-4 py-2 rounded-xl bg-[#7B2D26] hover:bg-[#5C1F19] text-[#f5f5dc] font-semibold transition"
                                    onClick={() => cancelOrder.mutate(order._id)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PastOrders;
