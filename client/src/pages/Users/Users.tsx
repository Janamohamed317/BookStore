import useGetUsers from "../../hooks/users/useGetUsers";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useToggleUserBlock from "../../hooks/users/useToggleUserBlock";
import { useState } from "react";
import { userTypes } from "../../assets/assets";
import { searchForUser } from "../../services/UsersServices";
import Search from "../../components/Search/Search";

function Users() {
    const [filterOption, setFilterOption] = useState<string>("")
    const { data, isLoading, isError } = useGetUsers(filterOption)
    const deleteUser = useDeleteUser()
    const handleBlockState = useToggleUserBlock()

    const [searchedItem, setSearchedItem] = useState("")
    const FilteredData = searchForUser(searchedItem, data!)

    if (isLoading) {
        return <p className="text-[#D4A373]">Loading users...</p>;
    }

    if (isError) {
        return <p className="text-red-500">Error fetching users</p>;
    }

    if (!data || data.length === 0) {
        return (
            <>
                <p className="text-gray-400">No users found.</p>
                <select
                    className="px-3 py-2 rounded-lg bg-[#3D2C22]/70 text-[#F5EDE0] focus:outline-none"
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="">All Users</option>
                    {userTypes.map((user) => (
                        <option key={user.id} value={String(user.blocked)}>
                            {user.UserType}
                        </option>
                    ))}
                </select>
            </>
        )
    }

    return (
        <div className="p-6 h-screen">
            <p className="font-bold text-3xl text-center text-[#E6D5C3] mb-6">
                Users
            </p>

            <div className="flex items-center justify-between mb-4">
                <Search sendDataToParent={setSearchedItem} />
                <select
                    className="ml-4 px-3 py-2 rounded-lg bg-[#3D2C22]/70 text-[#F5EDE0] focus:outline-none"
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="">All Users</option>
                    {userTypes.map((user) => (
                        <option key={user.id} value={String(user.blocked)}>
                            {user.UserType}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {FilteredData.map((user) => (
                    <div
                        key={user._id}
                        className="flex justify-between items-center p-4 bg-[#2B2118]/50 backdrop-blur-md border border-[#6C584C]/30 rounded-xl shadow-sm hover:bg-[#3D2C22]/40 transition"
                    >
                        <div>
                            <p className="text-[#E6D5C3] font-semibold">{user.username}</p>
                            <p className="text-[#F5EDE0] text-sm">{user.email}</p>
                        </div>

                        <div className="space-x-3">
                            <button
                                className="px-3 py-1 bg-[#3A5A78] hover:bg-[#4F7191] text-white rounded-lg cursor-pointer"
                                onClick={() => handleBlockState.mutate(user)}
                            >
                                {user.blocked ? "Unblock" : "Block"}
                            </button>
                            <button
                                className="px-3 py-1 bg-[#7B2D26] hover:bg-[#5C1F19] text-[#f5f5dc] rounded-lg cursor-pointer"
                                onClick={() => deleteUser.mutate(user._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;
