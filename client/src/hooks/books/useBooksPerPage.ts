import { useQuery } from '@tanstack/react-query';
import type { Book } from '../../types/Book';
import { getBooksPerPage } from '../../services/BooksServices';

const useBooksPerPage = (pageNumber: number) => {
    return useQuery<Book[]>({
        queryKey: ["books", pageNumber],
        queryFn: () => getBooksPerPage(pageNumber),
        refetchOnWindowFocus: false,
    });
}

export default useBooksPerPage