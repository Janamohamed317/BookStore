import { useLocation } from "react-router";
import { AppContext } from "../../components/Context/AppContext";
import { useContext, useEffect } from "react";
import useUpdateAuthor from "../../hooks/authors/useUpdateAuthor";

function EditAuthor() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("EditAuthor must be used within an AppContextProvider");
    }

    const { authorData, setAuthorData } = context;

    const location = useLocation();
    const { author } = location.state;

    useEffect(() => {
        setAuthorData({
            fullName: author.fullName,
            nationality: author.nationality,
        });
    }, [author]);

    const editAuthor = useUpdateAuthor(authorData, author);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-96 bg-[#2B2118]/90 backdrop-blur-md border border-[#6C584C]/30 p-6 rounded-2xl shadow-lg">
                <p className="font-bold text-center text-[#f5f5dc] text-lg">
                    Edit Author
                </p>

                <label htmlFor="authorName" className="text-[#f5f5dc]">
                    Author Name:
                </label>
                <input
                    id="authorName"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    placeholder="Enter Author Name"
                    value={authorData.fullName}
                    onChange={(e) =>
                        setAuthorData({ ...authorData, fullName: e.target.value })
                    }
                />

                <label htmlFor="authorNationality" className="text-[#f5f5dc]">
                    Author Nationality:
                </label>
                <input
                    id="authorNationality"
                    type="text"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                    placeholder="Enter Author Nationality"
                    value={authorData.nationality}
                    onChange={(e) =>
                        setAuthorData({ ...authorData, nationality: e.target.value })
                    }
                />

                <button
                    onClick={() => editAuthor.mutate()}
                    className="bg-[#a47148] hover:bg-[#8b5e3c] text-[#f5f5dc] p-2 rounded-lg font-semibold transition cursor-pointer"
                >
                    Update Author
                </button>
            </div>
        </div>
    );
}

export default EditAuthor;
