import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAuthor } from '../../services/AuthorsServices';
import type { Author, NewAuthor } from '../../types/Author';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';

const useUpdateAuthor = (authorData: NewAuthor, author: Author) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => updateAuthor(authorData, author),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authors"] });
            Swal.fire({
                icon: "success",
                text: "Author successfully updated",
                confirmButtonText: "OK",
            });
            navigate("/admin");
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "There is an error",
                    text: error.response?.data.message || "Network error",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useUpdateAuthor