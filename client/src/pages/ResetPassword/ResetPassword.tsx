import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  const resetPassword = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:5000/api/password/forgot-password",
        { email }
      );
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "Password reset link has been sent to your email.",
        confirmButtonText: "OK",
      });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message,
          confirmButtonText: "OK",
        });
      }
    },
  });

  const handleEmailSubmission = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || !emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonText: "OK",
      });
      return;
    }

    resetPassword.mutate();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-96 bg-[#3e2723] p-6 rounded-xl shadow-md">
        <p className="font-bold text-center text-[#f5f5dc] text-lg">
          Reset Password
        </p>

        <label htmlFor="email" className="text-[#f5f5dc]">
          Enter Your Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
        />

        <button
          onClick={handleEmailSubmission}
          className="bg-[#a47148] text-[#f5f5dc] p-2 rounded hover:bg-[#8b5e3c] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
