import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/Context/AppContext';
import useAddBook from '../../hooks/books/useAddBook';
import { resetBookData } from '../../utils/ResetBookData';
import Swal from 'sweetalert2';

function AddBook() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AddBook must be used within an AppContextProvider");
    }

    const { authors, AssignAuthorIdToAddedBook, setBookData, bookData } = context;
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        resetBookData(setBookData)
    }, []);

    const addBook = useAddBook(bookData, file, setBookData)
    if (addBook.isPending) {
        Swal.fire({
            icon: "info",
            title: "Adding Book",
            text: "Please wait...",
            allowOutsideClick: false,
            showConfirmButton: false
        });
    }

    return (
        <div className="flex justify-center items-center p-3">
            <div className="flex flex-col gap-5 w-96 bg-[#2B2118]/90 backdrop-blur-md border border-[#6C584C]/30 p-6 rounded-2xl shadow-lg">
                <p className="font-bold text-center text-[#f5f5dc] text-lg">Add New Book</p>

                <label htmlFor="bookName" className="text-[#f5f5dc]">Book Name:</label>
                <input
                    id="bookName"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    placeholder="Enter Book Name"
                    value={bookData.title}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                />

                <label htmlFor="bookDescription" className="text-[#f5f5dc]">Book Description:</label>
                <input
                    id="bookDescription"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    placeholder="Enter Book Description"
                    value={bookData.description}
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                />

                <label htmlFor="bookQuantity" className="text-[#f5f5dc]">Book Quantity:</label>
                <input
                    id="bookQuantity"
                    type="number"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    placeholder="Enter Book Quantity"
                    value={bookData.quantity}
                    onChange={(e) => setBookData({ ...bookData, quantity: Number(e.target.value) })}
                />

                <label htmlFor="bookPrice" className="text-[#f5f5dc]">Book Price:</label>
                <input
                    id="bookPrice"
                    type="number"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    placeholder="Enter Book Price"
                    value={bookData.price}
                    onChange={(e) => setBookData({ ...bookData, price: Number(e.target.value) })}
                />

                <label htmlFor="bookCover" className="text-[#f5f5dc]">Book Cover:</label>
                <div className="flex gap-4 items-center text-[#f5f5dc]" id="bookCover">
                    <input
                        id="soft"
                        type="radio"
                        checked={bookData.cover === "Soft Cover"}
                        name="cover"
                        value="Soft Cover"
                        onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
                    />
                    <label htmlFor="soft">Soft Cover</label>

                    <input
                        id="hard"
                        name="cover"
                        type="radio"
                        value="Hard Cover"
                        checked={bookData.cover === "Hard Cover"}
                        onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
                    />
                    <label htmlFor="hard">Hard Cover</label>
                </div>

                <label htmlFor="authors" className="text-[#f5f5dc]">Author Name:</label>
                <select
                    id="authors"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    onChange={(e) => AssignAuthorIdToAddedBook(e.target.value)}
                >
                    <option value="">--Choose an author--</option>
                    {authors?.map((author) => (
                        <option key={author._id} value={author.fullName}>
                            {author.fullName}
                        </option>
                    ))}
                </select>

                <label htmlFor="img" className="text-[#f5f5dc]">Upload book Image:</label>
                <input
                    id="img"
                    type="file"
                    className="text-[#f5f5dc]"
                    onChange={(e) => {
                        if (e.target.files) setFile(e.target.files[0]);
                    }}
                />

                <button
                    onClick={() => addBook.mutate()}
                    className="bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] p-2 rounded-lg font-semibold transition cursor-pointer"
                >
                    Add Book
                </button>
            </div>
        </div>
    )
}

export default AddBook
