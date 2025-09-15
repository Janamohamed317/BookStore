import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

function ResetPasswordForm() {
    const { id, token } = useParams<{ id: string; token: string }>();
    const [password, setPassword] = useState<string>("");
    const [invalid, setInvalid] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyLink = async () => {
            try {
                await axios.get(`http://localhost:5000/api/password/reset-password/${id}/${token}`);
            } catch {
                setInvalid(true)
            }
        };
        verifyLink();
    }, [id, token]);

    const resetPasswordMutation = useMutation({
        mutationFn: async () => {
            return await axios.post(
                `http://localhost:5000/api/password/reset-password/${id}/${token}`,
                { password }
            );
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "Your password has been reset successfully!",
                confirmButtonText: "OK",
            });
            navigate("/login");
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message || "Reset link is invalid or expired.",
                    confirmButtonText: "OK",
                });
            }
        },
    });

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
                </button>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
