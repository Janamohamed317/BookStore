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
        <div className="w-80 bg-white border border-yellow-950 rounded-lg shadow-sm dark:bg-yellow-900 ">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{book.title}</h5>
                <p className='text-white font-bold'>Description</p>
                <p className="mb-3 font-normal text-white">{book.description}</p>
                <div className='flex justify-between'>
                    <p className="mb-3 font-normal text-white">by   {authorName}</p>
                    <p className="mb-3 font-normal text-white">{book.price} $</p>
                </div>
            </div>
        </div>

    )
}

export default BookCard