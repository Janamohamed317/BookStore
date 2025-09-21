import useGetUsers from "../../hooks/users/useGetUsers";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useToggleUserBlock from "../../hooks/users/useToggleUserBlock";


function Users() {
    const { data, isLoading, isError } = useGetUsers()
    const deleteUser = useDeleteUser()
    const handleBlockState = useToggleUserBlock()

    if (isLoading) {
        return <p className="text-blue-500">Loading users...</p>;
    }

    if (isError) {
        return <p className="text-red-500">Error fetching users</p>;
    }

    if (!data || data.length === 0) {
        return <p className="text-gray-500">No users found.</p>;
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {data.map((user) => (
                <div
                    key={user._id}
                    className="flex justify-between items-center p-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl shadow-sm hover:shadow-md transition"
                >
                    <div>
                        <p className="text-[#075985] font-semibold">{user.username}</p>
                        <p className="text-[#0369a1] text-sm">{user.email}</p>
                    </div>

                    <div>
                        <button className="mx-2 cursor-pointer"
                            onClick={() => handleBlockState.mutate(user)}>
                            {user.blocked ? "Unblock" : "Block"}
                        </button>
                        <button className="cursor-pointer" onClick={() => deleteUser.mutate(user._id)}>Delete</button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Users;
