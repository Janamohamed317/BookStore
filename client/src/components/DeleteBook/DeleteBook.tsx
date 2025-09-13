import { useNavigate } from "react-router";
import { AppContext } from "../../components/Context/AppContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import type { Book } from "../../types/Book";
import Swal from "sweetalert2";
import type { ErrorResponse } from "../../types/Error";

function DeleteBook() {
    const context = useContext(AppContext);
    const navigate = useNavigate()
    if (!context) {
        throw new Error("DisplayBooks must be used within an AppContextProvider");
    }
    const { books, getBooks } = context;

    const token = localStorage.getItem("token")

    const NavigateToEdit = (book: Book) => {
        navigate('/EditBook', {
            state: {
                book: book,
            }
        })
    }

    useEffect(() => {
        getBooks()
    }, books)

    const handleDeleteBook = async (bookId: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/delete/${bookId}`, {
                headers: {
                    token: token
                }
            })
            await getBooks()

        } catch (error) {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error',
                    text: error.response?.data.message,
                    confirmButtonText: 'OK',
                });
            }
        }

    }

    return (
        <div className="mt-6 flex flex-col p-4 bg-[#f5f5dc] rounded-lg shadow-md">
            <button
                onClick={() => navigate('/addBook')}
                className="bg-[#f5f5dc] text-[#3e2723] border border-[#3e2723] px-4 py-2 rounded-lg self-end hover:bg-[#e6ddc4] transition"
            >
                Add new book
            </button>

            {books?.map((book) => (
                <div
                    className="flex justify-between gap-5 items-center mt-5 p-3 bg-white/70 rounded-lg shadow-sm"
                    key={book._id}
                >
                    <span className="text-[#3e2723] font-medium">{book.title}</span>
                    <span className="text-[#4e342e]">{book.author.fullName}</span>
                    <span className="text-[#3e2723]">${book.price}</span>
                    <span className="text-[#3e2723] italic">{book.cover}</span>

                    <div className="flex gap-3">
                        <button
                            className="bg-[#7b2d26] text-[#f5f5dc] px-3 py-2 rounded-lg hover:bg-[#5c1f19] transition"
                            onClick={() => handleDeleteBook(book._id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-[#a47148] text-[#f5f5dc] px-3 py-2 rounded-lg hover:bg-[#8b5e3c] transition"
                            onClick={() => NavigateToEdit(book)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DeleteBook
