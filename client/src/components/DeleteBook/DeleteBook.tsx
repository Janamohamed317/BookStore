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
    const { books, getBooks} = context;

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

    const handleDeleteBook = (bookId: string) => {
        try {
            const res = axios.delete(`http://localhost:5000/api/books/delete/${bookId}`, {
                headers: {
                    token: token
                }
            })
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
        finally {
            getBooks()
        }
    }


    return (
        <div className="mt-5 flex flex-col p-2">
            <button onClick={() => (navigate('/addBook'))} className="bg-amber-100 p-2 self-end">Add new book</button>
            {books.map((book) => (
                <div className="flex justify-between gap-5 items-center mt-5" key={book._id}>
                    <span>{book.title} </span>
                    <span>{book.author.fullName}</span>
                    <span>{book.price} </span>
                    <span>{book.cover} </span>
                    <div className="flex gap-2 ">
                        <button className="bg-red-500 p-2 cursor-pointer" onClick={() => handleDeleteBook(book._id)}>Delete</button>
                        <button className="bg-blue-400 p-2 cursor-pointer" onClick={() => NavigateToEdit(book)}>Edit</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DeleteBook