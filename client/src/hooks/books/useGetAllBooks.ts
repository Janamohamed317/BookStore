import { useQuery } from '@tanstack/react-query'
import type { Book } from '../../types/Book'
import { getAllBooks } from '../../services/BooksServices'

const useGetAllBooks = () => {
    return useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: getAllBooks,
        refetchOnWindowFocus: false,
    })

}

export default useGetAllBooks