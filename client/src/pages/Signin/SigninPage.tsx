import { useState } from "react";
import { useNavigate } from "react-router";
import type { Signin } from "../../types/User";
import useSignin from "../../hooks/Auth/useSignin";

function SigninPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Signin>({
        email: "",
        password: "",
    });

    const signinMutation = useSignin()

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
                    onClick={() => signinMutation.mutate(formData)}
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

export default SigninPage;
