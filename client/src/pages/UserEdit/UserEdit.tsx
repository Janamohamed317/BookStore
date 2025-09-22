import { useState } from "react";
import useGetUserInfo from "../../hooks/users/useGetUserInfo";
import useUpdateUserInfo from "../../hooks/users/useUpdateUserInfo";
import type { UpdatedUser } from "../../types/User";

const UserEdit = () => {
    const { data } = useGetUserInfo();
    const updateMutation = useUpdateUserInfo();

    const [updatedData, setUpdatedData] = useState<UpdatedUser>({
        username: data?.username,
        email: data?.email,
    });

    ;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate(updatedData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-[#3e2723] p-6 rounded-xl shadow-md w-96 flex flex-col gap-4"
            >
                <h2 className="text-xl font-bold text-[#f5f5dc] text-center">
                    Edit Profile
                </h2>

                <label className="text-[#f5f5dc]" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={updatedData.username}
                    onChange={(e) =>
                        setUpdatedData({ ...updatedData, username: e.target.value })
                    }
                    className="p-2 rounded text-[#3e2723] bg-[#f5f5dc]"
                />

                <label className="text-[#f5f5dc]" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={updatedData.email}
                    onChange={(e) =>
                        setUpdatedData({ ...updatedData, email: e.target.value })
                    }
                    className="p-2 rounded text-[#3e2723] bg-[#f5f5dc]"
                />

                <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="bg-[#a47148] text-[#f5f5dc] p-2 rounded hover:bg-[#8b5e3c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default UserEdit;
