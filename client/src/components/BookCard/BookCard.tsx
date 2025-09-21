import axios from "axios";
import type { Book } from "../../types/Book";
import { useQuery } from "@tanstack/react-query";
import type { Author } from "../../types/Author";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import type { OrderedBooks } from "../../types/Order";

type BookInfoProps = {
    book: Book;
};

function BookCard({ book }: BookInfoProps) {
    const authorId = book.author._id;

    const context = useContext(CartContext);
    if (!context) {
        throw new Error("BookCard must be used within a CartContextProvider");
    }

    const { incrementCartItem, decrementCartItem, getItemQuantity } = context;

    const { data } = useQuery<Author>({
        queryKey: ["authorName", authorId],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:5000/api/authors/${authorId}`
            );
            return res.data;
        },
        refetchOnWindowFocus: false,
    });
    
    const bookToOrder: OrderedBooks = {
        book: book._id,
        title: book.title,
        image: book.image,
        price: book.price,
        quantity: 1
    };

    const quantityInCart = getItemQuantity(bookToOrder);
    return (
        <div className="w-80 bg-[#f5f5dc] border border-[#3e2723] rounded-lg shadow-md hover:shadow-lg transition">
            <img src={book.image} className="rounded-t-lg w-full h-100" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#3e2723]">
                    {book.title}
                </h5>
                <p className="text-[#a47148] font-semibold">Description</p>
                <p className="mb-2 font-normal text-[#4e342e]">{book.description}</p>
                <div className="flex justify-between items-center">
                    <p className="mb-1 font-medium text-[#3e2723] italic">
                        by {data?.fullName}
                    </p>
                    <p className="mb-1 font-bold text-[#a47148]">{book.price} $</p>
                </div>
                <p>Available: {book.quantity}</p>
                <div className="flex gap-2 mt-2">
                    <button
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() => incrementCartItem(bookToOrder)}
                        disabled={quantityInCart >= book.quantity}
                    >
                        +
                    </button>
                    <p>{quantityInCart}</p>

                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => decrementCartItem(bookToOrder)}
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
