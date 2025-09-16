import { createContext, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Author, newAuthor } from "../../types/Author";
import type { newBook } from "../../types/Book";

type AppContextType = {
    authors: Author[] | undefined;
    bookData: newBook;
    setBookData: React.Dispatch<React.SetStateAction<newBook>>;
    setAuthorData: React.Dispatch<React.SetStateAction<newAuthor>>;
    authorData: newAuthor;
    AssignAuthorIdToAddedBook: (firstName: string) => void;
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
        data: authors, refetch: getAuthors
    } = useQuery<Author[]>({
        queryKey: ["authors"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/api/authors");
            return res.data;
        },

    });

    // remove setBookData ????
    const AssignAuthorIdToAddedBook = async (firstName: string) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/authors/name/${firstName}`
            );
            setBookData((prev) => ({
                ...prev,
                author: res.data._id,
            }));
        } catch (error) {
            console.error("Error fetching author ID:", error);
        }
    };

    const contextValue: AppContextType = {
        authors,
        bookData,
        setBookData,
        AssignAuthorIdToAddedBook,
        authorData,
        setAuthorData,
        getAuthors,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
