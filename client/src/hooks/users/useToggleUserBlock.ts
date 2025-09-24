import { useMutation, useQueryClient } from "@tanstack/react-query"
import { blockOrUnblockUser } from "../../services/UsersServices"

const useToggleUserBlock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blockOrUnblockUser,
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["users"] });
        }

    })
}

export default useToggleUserBlock