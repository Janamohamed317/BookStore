import axios from 'axios';
import type { Book } from '../../types/Book';
import { useEffect, useState } from 'react';

type BookInfoProps = {
    book: Book;
};

function BookCard({ book }: BookInfoProps) {
    const [authorName, setAuthorName] = useState<string>("")
    const authorId = book.author._id

    const getAuthorName = async (authorId: String) => {
        const res = await axios.get(`http://localhost:5000/api/authors/${book.author._id}`)
        setAuthorName(res.data.fullName)
    }

    useEffect(() => {
        getAuthorName(authorId)
    }, [book])

    return (
        <div className="w-80 bg-[#f5f5dc] border border-[#3e2723] rounded-lg shadow-md hover:shadow-lg transition">
            <img src={book.image} className="rounded-t-lg w-full h-100 " />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#3e2723]">
                    {book.title}
                </h5>
                <p className="text-[#a47148] font-semibold">Description</p>
                <p className="mb-2 font-normal text-[#4e342e]">{book.description}</p>
                <div className="flex justify-between items-center">
                    <p className="mb-1 font-medium text-[#3e2723] italic">
                        by {authorName}
                    </p>
                    <p className="mb-1 font-bold text-[#a47148]">
                        {book.price} $
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookCard
