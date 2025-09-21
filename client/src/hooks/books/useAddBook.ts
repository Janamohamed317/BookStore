import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { addNewBook } from '../../services/BooksServices';
import { resetBookData } from '../../utils/ResetBookData';
import type { NewBook } from '../../types/Book';

const useAddBook = (bookData: NewBook, file: File | null, setBookData: any) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => addNewBook(bookData, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            navigate("/admin")
            resetBookData(setBookData)
            Swal.fire({
                icon: 'success',
                text: "Book Created",
                confirmButtonText: 'OK',
            });
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "There is an error",
                    text: error.response?.data.message,
                    confirmButtonText: "OK",
                });
            }
        },
    })
}

export default useAddBook