import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router";
import type { Author } from "../../types/Author";
import useDeleteAuthor from "../../hooks/authors/useDeleteAuthor";
import Search from "../Search/Search";
import { searchForAuthor } from "../../services/AuthorsServices";

function GetAuthors() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    const deleteAuthor = useDeleteAuthor();
    const { authors } = context;

    const [searchedItem, setSearchedItem] = useState("");
    const FilteredData = searchForAuthor(searchedItem, authors);

    const navigate = useNavigate();

    const NavigateToEditAuthor = (author: Author) => {
        navigate("EditAuthor", {
            state: {
                author: author,
            },
        });
    };

    return (
        <div className="mt-6 flex flex-col gap-4">
            <Search sendDataToParent={setSearchedItem} />
            {FilteredData?.map((author) => (
                <div
                    key={author._id}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-md"
                >
                    <span className="text-white font-medium">{author.fullName}</span>

                    <div className="flex gap-3">
                        <button
                            className="cursor-pointer bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg font-medium transition"
                            onClick={() => deleteAuthor.mutate(author._id)}
                        >
                            Delete
                        </button>

                        <button
                            className="cursor-pointer bg-[#a47148] hover:bg-[#8b5e3c] text-white px-4 py-2 rounded-lg font-semibold transition"
                            onClick={() => NavigateToEditAuthor(author)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GetAuthors;
