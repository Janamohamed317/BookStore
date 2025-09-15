import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { ErrorResponse } from "../../types/Error";
import { handleNavigate } from "../../utils/HandleNavigation";
import type { signin } from "../../types/User";

function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<signin>({
        email: "",
        password: "",
    });

    const signinMutation = useMutation({
        mutationFn: async () => {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            return res.data;
        },
        onSuccess: (data) => {
            const token = data.token;
            localStorage.setItem("token", token);

            const path = handleNavigate(token);
            navigate(path);
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Error Logging in",
                    text: error.response?.data.message || "Something went wrong",
                    confirmButtonText: "OK",
                });
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-start gap-5 bg-[#3e2723] p-6 rounded-2xl w-80 shadow-md">
                <p className="text-center text-[#f5f5dc] font-bold text-xl">Sign In</p>

                <label htmlFor="email" className="text-[#f5f5dc]">
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded-2xl"
                />

                <label htmlFor="password" className="text-[#f5f5dc]">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded-2xl"
                />

                <span
                    className="self-end cursor-pointer text-[#a47148] hover:underline"
                    onClick={() => navigate("/resetPassword")}
                >
                    Forgot Password?
                </span>

                <button
                    onClick={() => signinMutation.mutate()}
                    className="bg-[#a47148] text-[#f5f5dc] rounded-2xl p-2 hover:bg-[#8b5e3c] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sign in
                </button>

                <span className="text-center text-[#f5f5dc]">
                    Doesn't have an account?{" "}
                    <span
                        className="underline cursor-pointer text-[#a47148]"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Signin;
