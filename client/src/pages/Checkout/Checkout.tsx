import { useContext, useState } from "react";
import { CartContext } from "../../components/Context/CartContext";
import useMakeOrder from "../../hooks/orders/useMakeOrder";
import Cart from "../Cart/Cart";
import type { CheckOut } from "../../types/Order";

const Checkout = () => {
    const [shippingInfo, setShippingInfo] = useState<CheckOut>({
        address: "",
        phone: "",
        notes: "",
    });
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart must be used within a CartContextProvider");
    }
    const { cartItems, clearCart } = context;

    const makeOrder = useMakeOrder(cartItems, shippingInfo, clearCart);

    return (
        <div className="flex flex-col md:flex-row justify-between gap-6 p-6  min-h-screen text-[#F5EDE0]">
            <div className="md:w-2/3">
                <Cart checkout={"yes"} />
            </div>

            <div className="md:w-1/3 bg-[#2B2118]/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#6C584C]/50 flex flex-col gap-4">
                <h2 className="font-bold text-2xl text-[#E6D5C3] mb-4">Shipping Info</h2>

                <label htmlFor="address" className="text-[#F5EDE0]">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter Your Address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                    }
                    className="bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />

                <label htmlFor="phone" className="text-[#F5EDE0]">Phone</label>
                <input
                    type="text"
                    id="phone"
                    placeholder="Enter Your Phone Number"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                    className="bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />

                <label htmlFor="notes" className="text-[#F5EDE0]">Additional Note</label>
                <input
                    type="text"
                    id="notes"
                    placeholder="Enter Your Notes"
                    value={shippingInfo.notes}
                    onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, notes: e.target.value })
                    }
                    className="bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />

                <button
                    disabled={makeOrder.isPending}
                    onClick={() => {
                        makeOrder.mutate();
                    }}
                    className="mt-4 bg-[#D4A373] text-[#2B2118] font-semibold p-3 rounded-xl hover:bg-[#E5B185]"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
