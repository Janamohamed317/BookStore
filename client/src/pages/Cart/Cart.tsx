import { useContext, useMemo } from "react";
import { CartContext } from "../../components/Context/CartContext";
import { calculateTotalPrice } from "../../services/OrdersServices";
import { useNavigate } from "react-router";

type cartProps =
    {
        checkout: string
    }

const Cart = ({ checkout }: cartProps) => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart must be used within a CartContextProvider");
    }

    const { cartItems, incrementCartItem, decrementCartItem, removeCartItem, clearCart } = context;
    const navigate = useNavigate()

    const grandTotal = useMemo(() => {
        return calculateTotalPrice(cartItems)
    }, [cartItems])


    return (
        <div className="p-6 h-screen">
            <h2 className="text-3xl font-bold text-center text-[#E6D5C3] mb-6">
                Your Cart
            </h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-400">Your cart is empty.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-[#2B2118]/50 backdrop-blur-md text-[#F5EDE0] rounded-xl">
                        <thead className="bg-[#3D2C22]/70 text-[#E6D5C3]">
                            <tr>
                                <th className="px-4 py-3 text-left">Book</th>
                                <th className="px-4 py-3 text-center">Quantity</th>
                                <th className="px-4 py-3 text-right">Price</th>
                                <th className="px-4 py-3 text-right">Operations</th>
                                <th className="px-4 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr
                                    key={item.book}
                                    className="border-b border-[#6C584C]/30 hover:bg-[#3D2C22]/40"
                                >
                                    <td className="px-4 py-2 font-medium">{item.title}</td>
                                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="px-4 py-2 text-right">${item.price}</td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <button
                                            className="px-2 py-1 bg-[#3A5A78] hover:bg-[#4F7191] rounded text-white cursor-pointer"
                                            onClick={() => incrementCartItem(item)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-[#a47148] hover:bg-[#c68958] rounded text-white cursor-pointer"
                                            onClick={() => decrementCartItem(item)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white cursor-pointer"
                                            onClick={() => removeCartItem(item)}
                                        >
                                            x
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 text-right font-semibold">
                                        ${item.price * item.quantity}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-right font-bold">
                                    Grand Total:
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-[#D4A373]">
                                    ${grandTotal}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {cartItems.length !== 0 && checkout === "no" &&

                <div className="flex justify-center mt-6 gap-2">
                    <button
                        className="px-6 py-3 bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] font-semibold rounded-xl cursor-pointer"
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </button>
                    <button
                        className="px-6 py-3 bg-[#7B2D26] hover:bg-[#5C1F19] text-[#f5f5dc] font-semibold rounded-xl cursor-pointer"
                        onClick={() => clearCart()}
                    >
                        Clear Cart
                    </button>
                </div>
            }
        </div>

    );
};

export default Cart;
