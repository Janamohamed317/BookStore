import { useContext } from "react"
import { AppContext } from "../Context/AppContext";
import axios from "axios";

function GetAuthors() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("DisplayBooks must be used within an AppContextProvider");
    }
    const { authors, getAuthors, token } = context;
    const NavigateToEditAuthor = () => {

    }
    const handleDeleteAuthor = async (id: string) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/authors/delete/${id}`, {
                headers: {
                    token: token
                }
            })
        } catch (error) {
            console.log(error);

        }
        finally {
            getAuthors()
        }
    }

    return (
        <div>
            {authors.map((author) => (
                <div key={author._id} className="flex justify-between gap-5 items-center">
                    <span>
                        {author.fullName}
                    </span>
                    <div className="flex gap-2 p-2 mt-0.2">
                        <button className="bg-red-500 p-2 cursor-pointer" onClick={() => handleDeleteAuthor(author._id)}>Delete</button>
                        <button className="bg-blue-400 p-2 cursor-pointer" onClick={() => NavigateToEditAuthor()}>Edit</button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default GetAuthors