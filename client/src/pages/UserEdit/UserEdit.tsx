import { useState, useEffect } from "react";
import useGetUserInfo from "../../hooks/users/useGetUserInfo";
import useUpdateUserInfo from "../../hooks/users/useUpdateUserInfo";
import type { UpdatedUser } from "../../types/User";

const UserEdit = () => {
  const { data } = useGetUserInfo();
  const updateMutation = useUpdateUserInfo();

  const [updatedData, setUpdatedData] = useState<UpdatedUser>({
    username: data?.username || "",
    email: data?.email || "",
  });

  useEffect(() => {
    if (data) {
      setUpdatedData({
        username: data.username,
        email: data.email,
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(updatedData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2B2118]/70 backdrop-blur-md p-6 rounded-2xl shadow-lg w-96 flex flex-col gap-4 border border-[#6C584C]/30"
      >
        <h2 className="text-2xl font-bold text-[#E6D5C3] text-center">
          Edit Profile
        </h2>

        <label className="text-[#F5EDE0]" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={updatedData.username}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, username: e.target.value })
          }
          className="p-2 rounded-lg text-[#2B2118] bg-[#F5EDE0] focus:outline-none"
        />

        <label className="text-[#F5EDE0]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={updatedData.email}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, email: e.target.value })
          }
          className="p-2 rounded-lg text-[#2B2118] bg-[#F5EDE0] focus:outline-none"
        />

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-[#D4A373] text-[#2B2118] font-semibold p-2 rounded-lg hover:bg-[#E5B185] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
