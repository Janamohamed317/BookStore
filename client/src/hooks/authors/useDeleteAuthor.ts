import { useMutation } from "@tanstack/react-query"
import { removeAuthor } from "../../services/AuthorsServices"
import Swal from "sweetalert2"



const useDeleteAuthor = () => {
    return useMutation({
        mutationFn: removeAuthor,
        onSuccess: () => {
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