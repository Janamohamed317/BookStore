import { useContext } from "react";
import { AppContext } from "../../components/Context/AppContext";
import BookCard from "../../components/BookCard/BookCard";

function DisplayBooks() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("DisplayBooks must be used within an AppContextProvider");
    }
    const { books } = context;

    return (
        <>
            <h2 className="text-center font-bold text-[#f5f5dc] text-4xl">Our Books</h2>
            <div className="mt-5 flex gap-3 justify-center flex-wrap">
                {books.map((book) => (
                    <div key={book._id} className="flex justify-around gap-2 mt-2">
                        <BookCard book={book} />
                    </div>
                ))}

            </div>
        </>
    )
}

export default DisplayBooks