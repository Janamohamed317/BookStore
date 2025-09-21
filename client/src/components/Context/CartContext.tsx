import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { OrderedBooks } from "../../types/Order";

type CartContextType = {
    incrementCartItem: (book: OrderedBooks) => void
    decrementCartItem: (book: OrderedBooks) => void
    removeCartItem: (book: OrderedBooks) => void
    cartItems: OrderedBooks[]
    setCartItems: React.Dispatch<React.SetStateAction<OrderedBooks[]>>;
    getItemQuantity: (book: OrderedBooks) => number,
    clearCart: () => void
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
    children: ReactNode;
};

const CartContextProvider = ({ children }: CartContextProviderProps) => {
    const cart = localStorage.getItem("cart")
    const [cartItems, setCartItems] = useState<OrderedBooks[]>(cart ? JSON.parse(cart) : [])


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const incrementCartItem = (book: OrderedBooks) => {
        const item = cartItems.find((item) => item.book === book.book)
        if (item) {
            setCartItems(prev => prev.map((item => item.book === book.book ? { ...item, quantity: item.quantity + 1 } : item)))
        }
        else {
            setCartItems([...cartItems, {
                book: book.book,
                title: book.title,
                image: book.image,
                price: book.price,
                quantity: 1
            }])
        }
    }


    const decrementCartItem = (book: OrderedBooks) => {
        const item = cartItems.find((item) => item.book === book.book)
        if (item) {
            if (item.quantity > 1) {
                setCartItems(prev => prev.map((item => item.book === book.book ? { ...item, quantity: item.quantity - 1 } : item)))
            }
            else if (item.quantity === 1) {
                removeCartItem(book)
            }
        }
    }


    const removeCartItem = (book: OrderedBooks) => {
        setCartItems((prev) => prev.filter((item) => item.book !== book.book));
    }

    const getItemQuantity = (book: OrderedBooks) => {
        const item = cartItems.find((item) => item.book === book.book)
        return item ? item.quantity : 0
    }

    const clearCart = () => {
        setCartItems([])
    }

    const contextValue: CartContextType = {
        incrementCartItem,
        decrementCartItem,
        removeCartItem,
        setCartItems,
        cartItems,
        getItemQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
