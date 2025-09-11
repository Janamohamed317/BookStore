import { useContext } from 'react'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import type { ErrorResponse } from "../../types/Error"
import Swal from 'sweetalert2';

function AddBook() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AddBook must be used within an AppContextProvider");
    }
    const { authors, getBooks, getAuthorID, setBookData, bookData} = context;

    const token = localStorage.getItem("token")
    
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
        <div className='flex justify-center items-center h-screen text-white'>
            <div className="flex flex-col gap-5 w-80 bg-yellow-900 p-5">
                <p className='font-bold text-center'>Add New Book</p>
                <label htmlFor="bookName">Book Name: </label>
                <input
                    id='bookName'
                    type="text" className="bg-gray-300 p-2" placeholder="Enter Book Name"
                    value={bookData.title}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />

                <label htmlFor="bookDescription">Book Description: </label>
                <input
                    id='bookDescription'
                    type="text" className="bg-gray-300 p-2" placeholder="Enter Book Description"
                    value={bookData.description}
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })} />


                <label htmlFor="bookPrice">Book Price: </label>
                <input
                    id='bookPrice'
                    type="number" className="bg-gray-300 p-2" placeholder="Enter Book Price"
                    value={bookData.price}
                    onChange={(e) => setBookData({ ...bookData, price: Number(e.target.value) })} />


                <label htmlFor="bookCover">Book Cover: </label>
                <div className="flex gap-4" id='bookCover'>
                    <input
                        id="soft"
                        type="radio"
                        className="bg-gray-300 p-2"
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
                        className="bg-gray-300 p-2"
                        value="Hard Cover"
                        checked={bookData.cover === "Hard Cover"}
                        onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
                    />
                    <label htmlFor="hard">Hard Cover</label>
                </div>
                
                <label htmlFor='authors'>Author Name: </label>
                <select
                    id="authors"
                    onChange={(e) => getAuthorID(e.target.value)}
                >
                    <option value="">--Choose an author--</option>
                    {authors.map((author) => (
                        <option key={author._id} value={author.fullName}>
                            {author.fullName}
                        </option>
                    ))}
                </select>
                <button onClick={handleBookCreation} className="bg-amber-100 p-2 cursor-pointer">Add Book</button>

            </div>

        </div>
    )
}

export default AddBook