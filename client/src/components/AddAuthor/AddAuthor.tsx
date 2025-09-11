import axios from "axios"
import { useContext, useState } from "react"
import type { newAuthor } from "../../types/Author"
import Swal from "sweetalert2"
import type { ErrorResponse } from "../../types/Error"
import { AppContext } from "../Context/AppContext"
function AddAuthor() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Authors must be used within an AppContextProvider");
    }
    const { getAuthors } = context;

    const token = localStorage.getItem("token")

    const [formData, setFormData] = useState<newAuthor>({
        fullName: "",
        nationality: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/authors/add", {
                fullName: formData.fullName,
                nationality: formData.nationality,
            }, {
                headers: {
                    token: token
                }
            })
        } catch (error) {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error',
                    text: error.response?.data.message,
                    confirmButtonText: 'OK',
                });
            }
        }
        finally {
            getAuthors()
        }

    }

    return (
        <div className="flex justify-center items-center gap-2 mt-5">
            <p className="font-bold">Add New Author</p>
            <input
                type="text"
                placeholder="Enter Author Name"
                value={formData.fullName}
                className="bg-amber-200 rounded-2xl p-2"
                name="fullName" onChange={handleChange} />

            <input
                type="text"
                placeholder="Enter Author Nationality"
                value={formData.nationality}
                name="nationality"
                onChange={handleChange}
                className="bg-amber-200 rounded-2xl p-2"
            />

            <button
                onClick={handleSubmit}
                className="bg-amber-950 p-2 rounded-2xl text-white">
                Submit
            </button>
        </div >
    )
}

export default AddAuthor