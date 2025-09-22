import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from '../../services/BooksServices';
import Swal from 'sweetalert2';
import axios from 'axios';

const useDeleteBook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookId: string) => deleteBook(bookId),
        onSuccess: async () => {
            Swal.fire({
                icon: "success",
                text: "The Book has been removed.",
                confirmButtonText: "OK",
            });
            // await queryClient.invalidateQueries({ queryKey: ["books"] })
            await queryClient.refetchQueries({ queryKey: ["books"] });
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error',
                    text: error.response?.data.message,
                    confirmButtonText: 'OK',
                });
            }
        }
    })
}

export default useDeleteBook