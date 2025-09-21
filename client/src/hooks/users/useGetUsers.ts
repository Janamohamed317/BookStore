import { useQuery } from '@tanstack/react-query'
import type { User } from '../../types/User'
import { fetchUsers } from '../../services/UsersServices'

const useGetUsers = () => {
  return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
    })
}

export default useGetUsers