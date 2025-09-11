import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../../components/Context/AppContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { ErrorResponse } from "../../types/Error";

function EditBook() {
    const context = useContext(AppContext);
    const navigate = useNavigate()
    if (!context) {
        throw new Error("DisplayBooks must be used within an AppContextProvider");
    }
    const { authors, getAuthorID, setBookData, bookData, token } = context;
    const location = useLocation();
    const { book } = location.state

    useEffect(() => {
        setBookData({
            title: book.title,
            author: book.author._id,
            description: book.description,
            cover: book.cover,
            price: book.price,
        });
    }, [book, setBookData]);

    const handleEditBook = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/books/edit/${book._id}`,
                {
                    title: bookData.title,
                    author: bookData.author,
                    description: bookData.description,
                    cover: bookData.cover,
                    price: bookData.price
                },
                {
                    headers: {
                        token: token
                    }
                }
            )
            Swal.fire({
                icon: 'success',
                text: "Book is successfully Updated",
                confirmButtonText: 'OK',
            });
            navigate("/admin")
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
        <div className="flex flex-col gap-2 w-60">
            <input type="text" className="bg-gray-300" placeholder="Enter BookName"
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
            
            <input type="text" className="bg-gray-300" placeholder="Enter Book Description"
                value={bookData.description}
                onChange={(e) => setBookData({ ...bookData, description: e.target.value })} />
            
            <input type="number" className="bg-gray-300" placeholder="Enter Book Price"
                value={bookData.price}
                onChange={(e) => setBookData({ ...bookData, price: Number(e.target.value) })} />
            
            <div className="flex gap-4">
                <input
                    id="soft"
                    type="radio"
                    className="bg-gray-300"
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
                    className="bg-gray-300"
                    value="Hard Cover"
                    checked={bookData.cover === "Hard Cover"}
                    onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
                />
                <label htmlFor="hard">Hard Cover</label>
            </div>

            <select
                id="author"
                onChange={(e) => getAuthorID(e.target.value)}
            >
                <option value="">--Choose an author--</option>
                {authors.map((author) => (
                    <option key={author._id} value={author.fullName}>
                        {author.fullName}
                    </option>
                ))}
            </select>
            <button onClick={handleEditBook} className="bg-amber-100 p-2 cursor-pointer">edit Book</button>

        </div>
    )
}

export default EditBook