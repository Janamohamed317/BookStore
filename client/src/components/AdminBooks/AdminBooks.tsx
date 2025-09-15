import { useNavigate } from "react-router";
import axios from "axios";
import type { Book } from "../../types/Book";
import Swal from "sweetalert2";
import type { ErrorResponse } from "../../types/Error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function AdminBooks() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const queryClient = useQueryClient();

    const NavigateToEdit = (book: Book) => {
        navigate('EditBook', {
            state: {
                book: book,
            }
        })
    }

    const { data, isLoading } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/api/books");
            return res.data;
        },
    })


    const deleteBook = useMutation({
        mutationFn: async (bookId: string) => {
            axios.delete(`http://localhost:5000/api/books/delete/${bookId}`, {
                headers: {
                    token: token
                }
            })
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "The Book has been removed.",
                confirmButtonText: "OK",
            });
            queryClient.invalidateQueries({ queryKey: ["books"] });

        },
        onError: (error) => {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error',
                    text: error.response?.data.message,
                    confirmButtonText: 'OK',
                });
            }
        }
    })

    if (isLoading) {
        return <p>Loading Books</p>
    }

    return (
        <div className="mt-6 flex flex-col p-4 bg-[#f5f5dc] rounded-lg shadow-md">
            <button
                onClick={() => navigate('addBook')}
                className="bg-[#f5f5dc] text-[#3e2723] border border-[#3e2723] px-4 py-2 rounded-lg self-end hover:bg-[#e6ddc4] transition"
            >
                Add new book
            </button>

            {data?.map((book) => (
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
                            onClick={() => deleteBook.mutate(book._id)}
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

export default AdminBooks
