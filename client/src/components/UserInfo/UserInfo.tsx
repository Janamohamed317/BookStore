import { useNavigate } from "react-router";
import useGetUserInfo from "../../hooks/users/useGetUserInfo";

const UserInfo = () => {

    const { data } = useGetUserInfo();
    const navigate = useNavigate();

    return (
        <div className="flex justify-center p-8">
            <div className="bg-[#2B2118]/60 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-md text-[#E6D5C3] flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-center">Profile Information</h1>
            <button
                className="bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] px-4 py-2 rounded-xl font-semibold cursor-pointer"
                onClick={() => navigate("/user/edit")}
            >
                Edit
            </button>

                <div className="flex justify-between items-center border-b border-[#6C584C]/40 pb-3">
                    <p className="font-medium">{data?.username}</p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="font-medium">{data?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
