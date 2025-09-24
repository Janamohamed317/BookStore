import { useNavigate } from "react-router";
import useGetAllBooks from "../../hooks/books/useGetAllBooks";
import useDeleteBook from "../../hooks/books/useDeleteBook";
import type { Book } from "../../types/Book";
import { useState } from "react";
import Search from "../../components/Search/Search";
import { searchForBook } from "../../services/BooksServices";

function AdminBooks() {
    const { data, isLoading } = useGetAllBooks();
    const removeBook = useDeleteBook();

    const navigate = useNavigate();
    const [searchedItem, setSearchedItem] = useState("");

    const FilteredData = searchForBook(searchedItem, data!);

    const NavigateToEdit = (book: Book) => {
        navigate("EditBook", {
            state: {
                book: book,
            },
        });
    };

    if (isLoading) {
        return <p className="text-[#f5f5dc]">Loading Books...</p>;
    }

    return (
        <div className="mt-6 flex flex-col p-6 rounded-2xl shadow-lg h-screen">
            <Search sendDataToParent={setSearchedItem} />

            <button
                onClick={() => navigate("addBook")}
                className="bg-[#a47148] hover:bg-[#8b5e3c] text-[#f5f5dc] px-5 py-2 rounded-xl self-end mt-4 transition cursor-pointer"
            >
                ➕ Add new book
            </button>

            {FilteredData?.map((book) => (
                <div
                    className="flex justify-between gap-5 items-center mt-5 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-[#6C584C]/30 hover:shadow-lg transition"
                    key={book._id}
                >
                    <span className="text-[#f5f5dc] font-semibold text-lg">{book.title}</span>
                    <span className="text-[#d4a373] italic">{book.author.fullName}</span>
                    <span className="text-green-400 font-medium">${book.price}</span>
                    <span className="text-sm text-gray-400">{book.cover}</span>

                    <div className="flex gap-3">
                        <button
                            className="cursor-pointer bg-[#7B2D26] hover:bg-[#5C1F19] text-[#f5f5dc] px-4 py-2 rounded-lg transition shadow-sm"
                            onClick={() => removeBook.mutate(book._id)}
                        >
                            🗑 Delete
                        </button>
                        <button
                            className="cursor-pointer bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] px-4 py-2 rounded-lg font-semibold transition shadow-sm"
                            onClick={() => NavigateToEdit(book)}
                        >
                            ✏️ Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminBooks;
