import { useContext } from "react"
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";
import type { Author } from "../../types/Author";

function GetAuthors() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("DisplayBooks must be used within an AppContextProvider");
    }
    const navigate = useNavigate()
    const { authors, getAuthors } = context;

    const NavigateToEditAuthor = (author: Author) => {
        navigate('/EditAuthor', {
            state: {
                author: author,
            }
        })
    }

    const token = localStorage.getItem("token")

    const handleDeleteAuthor = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/authors/delete/${id}`, {
                headers: {
                    token: token
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            getAuthors()
        }
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {authors.map((author) => (
                <div
                    key={author._id}
                    className="flex justify-between items-center p-3 bg-[#f5f5dc] rounded-lg shadow-sm"
                >
                    <span className="text-[#3e2723] font-medium">
                        {author.fullName}
                    </span>

                    <div className="flex gap-3">
                        <button
                            className="bg-[#7b2d26] text-[#f5f5dc] px-3 py-1 rounded-lg hover:bg-[#5c1f19] transition cursor-pointer"
                            onClick={() => handleDeleteAuthor(author._id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-[#a47148] text-[#f5f5dc] px-3 py-1 rounded-lg hover:bg-[#8b5e3c] transition cursor-pointer"
                            onClick={() => NavigateToEditAuthor(author)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GetAuthors
