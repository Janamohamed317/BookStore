import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../components/Context/AppContext";
import useEditBook from "../../hooks/books/useEditBook";

function EditBook() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("EditBook must be used within an AppContextProvider");
    }

    const { authors, AssignAuthorIdToAddedBook, setBookData, bookData } = context;
    const location = useLocation();
    const { book } = location.state;

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        setBookData({
            title: book.title,
            author: book.author._id,
            description: book.description,
            cover: book.cover,
            price: book.price,
            image: book.image,
            quantity: book.quantity,
        });
    }, [book]);

    const editBook = useEditBook(bookData, file, book, setBookData);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-96 bg-[#2B2118]/90 backdrop-blur-md border border-[#6C584C]/30 p-6 rounded-2xl shadow-lg">
                <p className="font-bold text-center text-[#f5f5dc] text-lg">
                    Edit Book
                </p>

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

                <label className="text-[#f5f5dc]">Book Cover:</label>
                <div className="flex gap-4 text-[#f5f5dc]">
                    <input
                        id="soft"
                        type="radio"
                        className="cursor-pointer"
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
                        className="cursor-pointer"
                        value="Hard Cover"
                        checked={bookData.cover === "Hard Cover"}
                        onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
                    />
                    <label htmlFor="hard">Hard Cover</label>
                </div>

                <label htmlFor="author" className="text-[#f5f5dc]">Author:</label>
                <select
                    id="author"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    onChange={(e) => AssignAuthorIdToAddedBook(e.target.value)}
                    value={bookData.author}
                >
                    <option value="">--Choose an author--</option>
                    {authors?.map((author) => (
                        <option key={author._id} value={author._id}>
                            {author.fullName}
                        </option>
                    ))}
                </select>

                <label htmlFor="img" className="text-[#f5f5dc]">Upload Book Image:</label>
                <input
                    id="img"
                    type="file"
                    className="text-[#f5f5dc]"
                    onChange={(e) => {
                        if (e.target.files) setFile(e.target.files[0]);
                    }}
                />

                <button
                    onClick={() => editBook.mutate()}
                    className="bg-[#a47148] hover:bg-[#8b5e3c] text-[#f5f5dc] p-2 rounded-lg font-semibold transition cursor-pointer"
                >
                    Update Book
                </button>
            </div>
        </div>
    );
}

export default EditBook;
