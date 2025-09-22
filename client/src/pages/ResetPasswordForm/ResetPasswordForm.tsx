
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

    const resetPasswordMutation = useResetPassword(password, id!,token!)

    if (invalid === true) {
        return <p>This reset link is invalid or has expired. </ p>
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 w-96 bg-[#3e2723] p-6 rounded-xl shadow-md">
                <p className="font-bold text-center text-[#f5f5dc] text-lg">
                    Reset Your Password
                </p>

                <label htmlFor="password" className="text-[#f5f5dc]">
                    Enter New Password:
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                />

                <button
                    onClick={() => resetPasswordMutation.mutate()}
                    className="bg-[#a47148] text-[#f5f5dc] p-2 rounded hover:bg-[#8b5e3c] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
