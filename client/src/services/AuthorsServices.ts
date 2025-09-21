import axios from "axios"
import type { Author, NewAuthor } from "../types/Author"

const token = localStorage.getItem("token")


export const addNewAuthor = async (authorData: NewAuthor) => {
    await axios.post("http://localhost:5000/api/authors/add", {
        fullName: authorData.fullName,
        nationality: authorData.nationality,
    }, {
        headers: {
            token: token
        }
    })
}


export const removeAuthor = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/authors/delete/${id}`, {
        headers: {
            token: token
        }
    })
}

export const updateAuthor = async (authorData: NewAuthor, author: Author) => {
    const res = await axios.put(
        `http://localhost:5000/api/authors/edit/${author._id}`,
        {
            fullName: authorData.fullName,
            nationality: authorData.nationality,
        },
        {
            headers: { token },
        }
    );
    return res.data;
}
