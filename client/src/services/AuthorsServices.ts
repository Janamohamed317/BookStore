import axios from "axios"
import type { Author, NewAuthor } from "../types/Author"


const Base_URL = "https://book-store-git-main-jana-mohameds-projects.vercel.app"

export const addNewAuthor = async (authorData: NewAuthor) => {
    const token = localStorage.getItem("token")
    await axios.post(`${Base_URL}/api/authors/add`, {
        fullName: authorData.fullName,
        nationality: authorData.nationality,
    }, {
        headers: {
            token: token
        }
    })
}

export const removeAuthor = async (id: string) => {
    const token = localStorage.getItem("token")

    await axios.delete(`${Base_URL}/api/authors/delete/${id}`, {
        headers: {
            token: token
        }
    })
}

export const updateAuthor = async (authorData: NewAuthor, author: Author) => {
    const token = localStorage.getItem("token")

    const res = await axios.put(
        `${Base_URL}/api/authors/edit/${author._id}`,
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

export const searchForAuthor = (searchedAuthor: string, data: Author[]) => {
    if (searchedAuthor.trim() === "") {
        return data
    }
    searchedAuthor.toLowerCase()
    return data.filter((author) => author.fullName.toLowerCase().includes(`${searchedAuthor}`))
}


