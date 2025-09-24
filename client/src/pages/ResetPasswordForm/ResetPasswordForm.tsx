import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useResetPassword from "../../hooks/Auth/useResetPassword";
import { verifyLink } from "../../services/UsersServices";

function ResetPasswordForm() {
    const { id, token } = useParams<{ id: string; token: string }>();
    const [password, setPassword] = useState<string>("");
    const [invalid, setInvalid] = useState<boolean>(false);

    useEffect(() => {
        verifyLink(id!, setInvalid, token!);
    }, [id, token]);

    const resetPasswordMutation = useResetPassword(password, id!, token!);

    if (invalid === true) {
        return (
            <p className="text-center text-red-500 font-semibold">
                This reset link is invalid or has expired.
            </p>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#2B2118]">
            <div className="flex flex-col gap-4 w-96 bg-[#2B2118]/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#6C584C]/30">
                <p className="font-bold text-center text-[#E6D5C3] text-xl">
                    Reset Your Password
                </p>

                <label htmlFor="password" className="text-[#F5EDE0]">
                    Enter New Password:
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#F5EDE0] text-[#2B2118] p-2 rounded-lg focus:outline-none"
                />

                <button
                    onClick={() => resetPasswordMutation.mutate()}
                    disabled={!password}
                    className="bg-[#D4A373] text-[#2B2118] font-semibold p-2 rounded-lg hover:bg-[#E5B185] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
