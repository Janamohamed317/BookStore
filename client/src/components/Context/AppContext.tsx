import { createContext, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Author, NewAuthor } from "../../types/Author";
import type { NewBook } from "../../types/Book";

type AppContextType = {
    authors: Author[] ;
    bookData: NewBook;
    setBookData: React.Dispatch<React.SetStateAction<NewBook>>;
    setAuthorData: React.Dispatch<React.SetStateAction<NewAuthor>>;
    authorData: NewAuthor;
    AssignAuthorIdToAddedBook: (firstName: string) => void;
    getAuthors: () => void,

};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
    children: ReactNode;
};


const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [bookData, setBookData] = useState<NewBook>({
        title: "",
        author: "",
        description: "",
        cover: "",
        price: 0,
        image: "",
        quantity: 0
    });

    const [authorData, setAuthorData] = useState<NewAuthor>({
        fullName: "",
        nationality: "",
    });


    const {
        data: authors = [], refetch: getAuthors
    } = useQuery<Author[]>({
        queryKey: ["authors"],
        queryFn: async () => {
            const res = await axios.get("https://book-store-seven-tan.vercel.app/api/authors");
            return res.data;
        },
        refetchOnWindowFocus: false

    });


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
