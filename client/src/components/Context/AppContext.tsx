import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { Author, newAuthor } from "../../types/Author";
import type { Book, newBook } from "../../types/Book";


type AppContextType = {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    getBooks: () => void;
    authors: Author[]
    setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    getAuthors: () => void
    setBookData: React.Dispatch<React.SetStateAction<newBook>>;
    bookData: newBook
    getAuthorID: (firstName: string) => void
    setAuthorData: React.Dispatch<React.SetStateAction<newAuthor>>
    authorData: newAuthor
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [bookData, setBookData] = useState<newBook>(
        {
            title: "",
            author: "",
            description: "",
            cover: "",
            price: 0,
            image: ""
        }
    )

    const [authorData , setAuthorData] = useState<newAuthor>(
        {
            fullName: " ",
            nationality: " "
        }
    )

    const getBooks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/books")
            setBooks(res.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getAuthors = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/authors")
            setAuthors(res.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getAuthorID = async (firstName: string) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/authors/${firstName}`);
            const authorId = res.data._id;
            setBookData(prev => ({
                ...prev,
                author: authorId
            }));
            // console.log(res.data._id);  

        } catch (error) {
            console.error("Error fetching author ID:", error);
        }
    }


    useEffect(() => {
        getBooks();
        getAuthors();
    }, []);

    const contextValue: AppContextType = {
        books,
        setBooks,
        getBooks,
        authors,
        setAuthors,
        getAuthors,
        setBookData,
        bookData,
        getAuthorID,
        authorData,
        setAuthorData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
