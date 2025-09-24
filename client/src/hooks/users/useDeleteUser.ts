import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../../services/UsersServices"

const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.refetchQueries({ queryKey: ["users"] });
        }
    })
}

export default useDeleteUser