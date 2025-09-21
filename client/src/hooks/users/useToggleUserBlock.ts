import { useMutation } from "@tanstack/react-query"
import { blockOrUnblockUser } from "../../services/UsersServices"

const useToggleUserBlock = () => {
    return useMutation({
        mutationFn: blockOrUnblockUser,
    })
}

export default useToggleUserBlock