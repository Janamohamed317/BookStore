import { useContext } from "react";
import { CartContext } from "../../components/Context/CartContext";
import { calculateTotalPrice } from "../../services/OrdersServices";
import useMakeOrder from "../../hooks/orders/useMakeOrder";

const Cart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart must be used within a CartContextProvider");
    }

    const { cartItems, incrementCartItem, decrementCartItem, removeCartItem, clearCart } = context;

    const grandTotal = calculateTotalPrice(cartItems)


    const makeOrder = useMakeOrder(cartItems, clearCart)

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-[#3e2723] mb-6">
                Your Cart
            </h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-white">
                        <thead className="bg-[#a47148] text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">Book</th>
                                <th className="px-4 py-2 text-center">Quantity</th>
                                <th className="px-4 py-2 text-right">Price</th>
                                <th className="px-4 py-2 text-right">Operations</th>
                                <th className="px-4 py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr
                                    key={item.book}
                                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <td className="px-4 py-2 font-medium text-[#3e2723]">
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="px-4 py-2 text-right">${item.price}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button onClick={() => incrementCartItem(item)}>+</button>
                                        <button onClick={() => decrementCartItem(item)}>-</button>
                                        <button onClick={() => removeCartItem(item)}>x</button>
                                    </td>
                                    <td className="px-4 py-2 text-right font-semibold">
                                        ${item.price * item.quantity}
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 border-t border-gray-300">
                                <td colSpan={3} className="px-4 py-3 text-right font-bold">
                                    Grand Total:
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-[#a47148]">
                                    ${grandTotal}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <button className="p-2 bg-amber-50" onClick={() => makeOrder.mutate()}>Checkout</button>
        </div>
    );
};

export default Cart;
