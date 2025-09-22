import { useContext, useEffect } from "react"
import { AppContext } from "../Context/AppContext"
import useAddAuthor from "../../hooks/authors/useAddAuthor"
import Swal from "sweetalert2";

function AddAuthor() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Authors must be used within an AppContextProvider");
    }

    const { setAuthorData, authorData } = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAuthorData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        setAuthorData({
            fullName: "",
            nationality: "",
        });
    }, []);

    const addAuthor = useAddAuthor(authorData, setAuthorData)
    if (addAuthor.isPending) {
        Swal.fire({
            icon: "info",
            title: "Adding Author",
            text: "Please wait...",
            allowOutsideClick: false,
            showConfirmButton: false
        });
    }

    return (
        <div className="flex justify-center items-center gap-3 mt-6 bg-[#3e2723]/90 p-4 rounded-lg shadow-md">
            <p className="font-bold text-[#f5f5dc]">Add New Author</p>

            <input
                type="text"
                placeholder="Enter Author Name"
                value={authorData.fullName}
                className="bg-[#f5f5dc] text-[#3e2723] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#a47148] outline-none"
                name="fullName"
                onChange={handleChange}
            />

            <input
                type="text"
                placeholder="Enter Author Nationality"
                value={authorData.nationality}
                name="nationality"
                onChange={handleChange}
                className="bg-[#f5f5dc] text-[#3e2723] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#a47148] outline-none"
            />

            <button
                onClick={() => addAuthor.mutate()}
                className="bg-[#a47148] hover:bg-[#8b5e3c] px-4 py-2 rounded-lg text-[#f5f5dc] font-semibold transition"
            >
                Submit
            </button>
        </div>
    )
}

export default AddAuthor
