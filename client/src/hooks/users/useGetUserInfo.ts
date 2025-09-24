import { useQuery } from "@tanstack/react-query"
import type { User } from "../../types/User"
import { getUserInfo } from "../../services/UsersServices"


const useGetUserInfo = () => {
  const userId = localStorage.getItem("userId") 
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: getUserInfo,
    refetchOnWindowFocus: false
  })

}

export default useGetUserInfo