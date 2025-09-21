import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "../../services/UsersServices"

const useDeleteUser = () => {
    return useMutation({
        mutationFn: deleteUser
    })
}

export default useDeleteUser