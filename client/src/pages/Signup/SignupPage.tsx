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

    const signupMutation = useSignup();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-start gap-5 bg-[#2B2118]/30 backdrop-blur-md p-6 
            rounded-2xl w-96  border border-[#6C584C]/90">
                <p className="text-center text-[#E6D5C3] font-bold text-2xl">Sign Up</p>

                <label htmlFor="email" className="text-[#F5EDE0]">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="bg-[#F5EDE0] text-[#2B2118] p-2 rounded-lg focus:outline-none"
                />

                <label htmlFor="username" className="text-[#F5EDE0]">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter your username"
                    className="bg-[#F5EDE0] text-[#2B2118] p-2 rounded-lg focus:outline-none"
                />

                <label htmlFor="password" className="text-[#F5EDE0]">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="bg-[#F5EDE0] text-[#2B2118] p-2 rounded-lg focus:outline-none"
                />

                <label htmlFor="confirmPassword" className="text-[#F5EDE0]">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm your password"
                    className="bg-[#F5EDE0] text-[#2B2118] p-2 rounded-lg focus:outline-none"
                />

                <button
                    onClick={() => signupMutation.mutate(formData)}
                    disabled={!formData.email || !formData.username || !formData.password || !formData.confirmPassword}
                    className="bg-[#D4A373] text-[#2B2118] font-semibold rounded-lg p-2 hover:bg-[#E5B185] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sign Up
                </button>

                <span className="text-center text-[#F5EDE0]">
                    Already have an account?{" "}
                    <span
                        className="underline cursor-pointer text-[#D4A373] hover:text-[#E5B185]"
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
