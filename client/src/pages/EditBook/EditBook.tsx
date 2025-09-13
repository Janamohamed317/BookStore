import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../../components/Context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { UploadImg } from "../../utils/UploadImg";
import { resetBookData } from "../../utils/ResetBookData";

function EditBook() {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    if (!context) {
        throw new Error("EditBook must be used within an AppContextProvider");
    }
    const { authors, getAuthorID, setBookData, bookData } = context;
    const location = useLocation();
    const { book } = location.state;

    const token = localStorage.getItem("token");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        setBookData({
            title: book.title,
            author: book.author._id,
            description: book.description,
            cover: book.cover,
            price: book.price,
            image: "",
        });
    }, [book, setBookData]);

    const handleEditBook = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/books/edit/${book._id}`,
                {
                    title: bookData.title,
                    author: bookData.author,
                    description: bookData.description,
                    cover: bookData.cover,
                    price: bookData.price,
                },
                { headers: { token } }
            );

            await UploadImg(book, file);

            resetBookData(setBookData);

            Swal.fire({
                icon: "success",
                text: "Book is successfully updated",
                confirmButtonText: "OK",
            });

            navigate("/admin");
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "There was an error",
                text: error.response?.data || error.message,
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-96 bg-[#3e2723] p-6 rounded-xl shadow-md">
                <p className="font-bold text-center text-[#f5f5dc] text-lg">
                    Edit Book
                </p>

                <label htmlFor="bookName" className="text-[#f5f5dc]">
                    Book Name:
                </label>
                <input
                    id="bookName"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    placeholder="Enter Book Name"
                    value={bookData.title}
                    onChange={(e) =>
                        setBookData({ ...bookData, title: e.target.value })
                    }
                />

                <label htmlFor="bookDescription" className="text-[#f5f5dc]">
                    Book Description:
                </label>
                <input
                    id="bookDescription"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    placeholder="Enter Book Description"
                    value={bookData.description}
                    onChange={(e) =>
                        setBookData({ ...bookData, description: e.target.value })
                    }
                />

                <label htmlFor="bookPrice" className="text-[#f5f5dc]">
                    Book Price:
                </label>
                <input
                    id="bookPrice"
                    type="number"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    placeholder="Enter Book Price"
                    value={bookData.price}
                    onChange={(e) =>
                        setBookData({ ...bookData, price: Number(e.target.value) })
                    }
                />

                <label className="text-[#f5f5dc]">Book Cover:</label>
                <div className="flex gap-4">
                    <input
                        id="soft"
                        type="radio"
                        className="cursor-pointer"
                        checked={bookData.cover === "Soft Cover"}
                        name="cover"
                        value="Soft Cover"
                        onChange={(e) =>
                            setBookData({ ...bookData, cover: e.target.value })
                        }
                    />
                    <label htmlFor="soft" className="text-[#f5f5dc]">
                        Soft Cover
                    </label>

                    <input
                        id="hard"
                        name="cover"
                        type="radio"
                        className="cursor-pointer"
                        value="Hard Cover"
                        checked={bookData.cover === "Hard Cover"}
                        onChange={(e) =>
                            setBookData({ ...bookData, cover: e.target.value })
                        }
                    />
                    <label htmlFor="hard" className="text-[#f5f5dc]">
                        Hard Cover
                    </label>
                </div>

                <label htmlFor="author" className="text-[#f5f5dc]">
                    Author:
                </label>
                <select
                    id="author"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    onChange={(e) => getAuthorID(e.target.value)}
                    value={bookData.author}
                >
                    <option value="">--Choose an author--</option>
                    {authors?.map((author) => (
                        <option key={author._id} value={author._id}>
                            {author.fullName}
                        </option>
                    ))}
                </select>

                <label htmlFor="img" className="text-[#f5f5dc]">
                    Upload Book Image:
                </label>
                <input
                    id="img"
                    type="file"
                    className="text-[#f5f5dc]"
                    onChange={(e) => {
                        if (e.target.files) setFile(e.target.files[0]);
                    }}
                />

                <button
                    onClick={handleEditBook}
                    className="bg-[#a47148] text-[#f5f5dc] p-2 rounded hover:bg-[#8b5e3c] transition cursor-pointer"
                >
                    Update Book
                </button>
            </div>
        </div>
    );
}

export default EditBook;
