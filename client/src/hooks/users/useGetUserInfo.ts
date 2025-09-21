import { useQuery } from "@tanstack/react-query"
import type { User } from "../../types/User"
import { getUserInfo } from "../../services/UsersServices"


const useGetUserInfo = () => {
  return useQuery<User>({
        queryKey: ["user"],
        queryFn: getUserInfo,
        refetchOnWindowFocus: false
    })

}

export default useGetUserInfo