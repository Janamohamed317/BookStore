import { useState } from "react";
import type { Signup } from "../../types/User";
import useSignup from "../../hooks/Auth/useSignup";
import { useNavigate } from "react-router";

function SignupPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Signup>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const signupMutation = useSignup()

    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="flex flex-col justify-start gap-5 bg-[#3e2723] p-6 rounded-2xl w-80 shadow-md">
                <p className="text-center text-[#f5f5dc] font-bold text-xl">Sign Up</p>

                <label htmlFor="email" className="text-[#f5f5dc]">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded-2xl"
                />

                <label htmlFor="username" className="text-[#f5f5dc]">Username</label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="username"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded-2xl"
                />

                <label htmlFor="password" className="text-[#f5f5dc]">Password</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="password"
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded-2xl"
                />

                <label htmlFor="confirmPassword" className="text-[#f5f5dc]">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded-2xl"
                />

                <button
                    onClick={() => signupMutation.mutate(formData)}
                    className="bg-[#a47148] text-[#f5f5dc] rounded-2xl p-2 hover:bg-[#8b5e3c] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sign Up
                </button>

                <span className="text-center text-[#f5f5dc]">
                    Already have an account?{" "}
                    <span
                        className="underline cursor-pointer text-[#a47148]"
                        onClick={() => navigate("/signin")}
                    >
                        Sign in
                    </span>
                </span>
            </div>
        </div>
    );
}

export default SignupPage;
