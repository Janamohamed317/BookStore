import { useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import { pages } from "../../assets/assets";
import useBooksPerPage from "../../hooks/books/useBooksPerPage";

function DisplayBooks() {
    const [pageNumber, setPageNumber] = useState<number>(1)

    const { data, isLoading, error } = useBooksPerPage(pageNumber)

    if (isLoading) {
        return <p className="text-center text-[#f5f5dc]">Loading books...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load books.</p>;
    }


    return (
        <>
            <h2 className="text-center font-bold text-[#f5f5dc] text-4xl">Our Books</h2>
            <div className="mt-5 flex gap-3 justify-center flex-wrap">
                {data?.map((book) => (
                    <div key={book._id} className="flex justify-around gap-2 mt-2">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
            <div className="flex text-[#f5f5dc] gap-2 justify-center items-center mt-5">
                {pages.map((page) => (
                    <div key={page.id} className="border-2 py-2 px-3 cursor-pointer" onClick={() => setPageNumber(page.page)}>
                        {page.page}
                    </div>
                ))}
            </div >
        </>
    )
}

export default DisplayBooks