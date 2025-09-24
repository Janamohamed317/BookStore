import axios from "axios";
import type { Book, NewBook } from "../types/Book";
import { UploadImg } from "../utils/UploadImg";

const token = localStorage.getItem("token")

export const getAllBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    return res.data;
}

export const deleteBook = async (bookId: string) => {
    axios.delete(`http://localhost:5000/api/books/delete/${bookId}`, {
        headers: {
            token: token
        }
    })
}

export const updateBook = async (bookData: NewBook, file: File | null, book: Book) => {
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
}

export const addNewBook = async (bookData: NewBook, file: File | null) => {
    const res = await axios.post("http://localhost:5000/api/books/add", {
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        cover: bookData.cover,
        price: bookData.price,
        quantity: bookData.quantity
    }, {
        headers: {
            token: token
        }
    })
    await UploadImg(res.data, file)
}

export const getBooksPerPage = async (pageNumber: number) => {
    const res = await axios.get(`http://localhost:5000/api/books?pageNumber=${pageNumber}`);
    return res.data
}

export const searchForBook = (searchedBook: string, data: Book[]) => {
    if (!searchedBook.trim()) {
        return data;
    }
    return data.filter((book) =>
        book.title.toLowerCase().includes(searchedBook.toLowerCase())
    );
};
