import { createContext, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Author, newAuthor } from "../../types/Author";
import type { Book, newBook } from "../../types/Book";

type AppContextType = {
    books: Book[] | undefined;
    authors: Author[] | undefined;
    isLoadingBooks: boolean;
    isLoadingAuthors: boolean;
    bookData: newBook;
    setBookData: React.Dispatch<React.SetStateAction<newBook>>;
    getAuthorID: (firstName: string) => Promise<void>;
    authorData: newAuthor;
    setAuthorData: React.Dispatch<React.SetStateAction<newAuthor>>;
    getBooks: () => void
    getAuthors: () => void
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [bookData, setBookData] = useState<newBook>({
        title: "",
        author: "",
        description: "",
        cover: "",
        price: 0,
        image: "",
    });

    const [authorData, setAuthorData] = useState<newAuthor>({
        fullName: "",
        nationality: "",
    });

    const {
        data: books,
        isLoading: isLoadingBooks,
        refetch: getBooks,
    } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/api/books");
            return res.data;
        },
    });

    const {
        data: authors,
        isLoading: isLoadingAuthors,
        refetch: getAuthors,
    } = useQuery<Author[]>({
        queryKey: ["authors"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/api/authors");
            return res.data;
        },
    });


    const getAuthorID = async (firstName: string) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/authors/${firstName}`
            );
            const authorId = res.data._id;
            setBookData((prev) => ({
                ...prev,
                author: authorId,
            }));
        } catch (error) {
            console.error("Error fetching author ID:", error);
        }
    };

    const contextValue: AppContextType = {
        books,
        authors,
        isLoadingBooks,
        isLoadingAuthors,
        bookData,
        setBookData,
        getAuthorID,
        authorData,
        setAuthorData,
        getAuthors,
        getBooks,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
