import axios from "axios";
import type { Book, NewBook } from "../types/Book";
import { UploadImg } from "../utils/UploadImg";


const Base_URL = "https://book-store-git-main-jana-mohameds-projects.vercel.app"

export const getAllBooks = async () => {
    const res = await axios.get(`${Base_URL}/api/books`);
    return res.data;
}

export const deleteBook = async (bookId: string) => {
    const token = localStorage.getItem("token")

    axios.delete(`${Base_URL}/api/books/delete/${bookId}`, {
        headers: {
            token: token
        }
    })
}

export const updateBook = async (bookData: NewBook, file: File | null, book: Book) => {
    const token = localStorage.getItem("token")

    await axios.put(
        `${Base_URL}/api/books/edit/${book._id}`,
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
    const token = localStorage.getItem("token")

    const res = await axios.post(`${Base_URL}/api/books/add`, {
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
    const res = await axios.get(`${Base_URL}/api/books?pageNumber=${pageNumber}`);
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
