import { useContext, useState } from 'react'
import { AppContext } from '../../components/Context/AppContext';
import axios from 'axios';
import type { ErrorResponse } from "../../types/Error"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { UploadImg } from '../../utils/UploadImg';
import { resetBookData } from '../../utils/ResetBookData';

function AddBook() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AddBook must be used within an AppContextProvider");
    }

    const { authors, getAuthorID, setBookData, bookData } = context;
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [file, setFile] = useState<File | null>(null);

    const handleBookCreation = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/books/add", {
                title: bookData.title,
                author: bookData.author,
                description: bookData.description,
                cover: bookData.cover,
                price: bookData.price,
            }, {
                headers: {
                    token: token
                }
            })
            await UploadImg(res.data._id, file)
            navigate("/admin")
            resetBookData(setBookData)
            Swal.fire({
                icon: 'success',
                text: "Book Created",
                confirmButtonText: 'OK',
            });
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
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-5 w-96 bg-[#3e2723] p-6 rounded-xl shadow-md">
                <p className="font-bold text-center text-[#f5f5dc] text-lg">Add New Book</p>

                <label htmlFor="bookName" className="text-[#f5f5dc]">Book Name:</label>
                <input
                    id="bookName"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    placeholder="Enter Book Name"
                    value={bookData.title}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                />

                <label htmlFor="bookDescription" className="text-[#f5f5dc]">Book Description:</label>
                <input
                    id="bookDescription"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    placeholder="Enter Book Description"
                    value={bookData.description}
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                />

                <label htmlFor="bookPrice" className="text-[#f5f5dc]">Book Price:</label>
                <input
                    id="bookPrice"
                    type="number"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
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
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                    onChange={(e) => getAuthorID(e.target.value)}
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
                    onClick={handleBookCreation}
                    className="bg-[#a47148] text-[#f5f5dc] p-2 rounded hover:bg-[#8b5e3c] transition"
                >
                    Add Book
                </button>
            </div>
        </div>
    )
}

export default AddBook
