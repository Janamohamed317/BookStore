import { useQuery } from '@tanstack/react-query'
import type { User } from '../../types/User'
import { fetchUsers } from '../../services/UsersServices'

const useGetUsers = (blocked: string) => {
  return useQuery<User[]>({
    queryKey: ["users",blocked],
    queryFn: () => fetchUsers(blocked),
    refetchOnWindowFocus: false
  })
}

export default useGetUsers