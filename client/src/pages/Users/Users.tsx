import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../../types/User";


const fetchUsers = async () => {

    const token = localStorage.getItem("token")
    const { data } = await axios.get<User[]>("http://localhost:5000/api/users",
        {
            headers:
            {
                token: token
            }
        }
    );
    return data;
};

function Users() {
    const { data: users, isLoading, isError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    if (isLoading) {
        return <p className="text-blue-500">Loading users...</p>;
    }

    if (isError) {
        return <p className="text-red-500">Error fetching users</p>;
    }

    if (!users || users.length === 0) {
        return <p className="text-gray-500">No users found.</p>;
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {users.map((user) => (
                <div
                    key={user._id}
                    className="flex justify-between items-center p-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl shadow-sm hover:shadow-md transition"
                >
                    <div>
                        <p className="text-[#075985] font-semibold">{user.name}</p>
                        <p className="text-[#0369a1] text-sm">{user.email}</p>
                    </div>
               
                </div>
            ))}
        </div>
    );
}

export default Users;
