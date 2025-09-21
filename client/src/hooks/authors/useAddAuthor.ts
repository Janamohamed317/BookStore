import { useMutation } from '@tanstack/react-query';
import { addNewAuthor } from '../../services/AuthorsServices';
import type { NewAuthor } from '../../types/Author';
import Swal from 'sweetalert2';
import axios from 'axios';

const useAddAuthor = (authorData: NewAuthor, setAuthorData: any) => {

    return useMutation({
        mutationFn: () => addNewAuthor(authorData),
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Author is Added Successfully',
                confirmButtonText: 'OK',
            });
            setAuthorData({
                fullName: "",
                nationality: ""
            })

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

export default useAddAuthor