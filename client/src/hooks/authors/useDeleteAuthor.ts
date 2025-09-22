import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeAuthor } from "../../services/AuthorsServices"
import Swal from "sweetalert2"

const useDeleteAuthor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeAuthor,
        onSuccess: async () => {
            // await queryClient.invalidateQueries({ queryKey: ["authors"] })
            await queryClient.refetchQueries({ queryKey: ["authors"] });
            Swal.fire({
                icon: "success",
                text: "Author Deleted Successfully"
            })
        },
        onError: () =>
            Swal.fire({
                icon: "error",
                text: "Failed to Delete Author"
            })
    })
}

export default useDeleteAuthor