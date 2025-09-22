import { useState } from "react";
import Swal from "sweetalert2";
import useForgotPassword from "../../hooks/Auth/useForgotPassword";

function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");

  const forgetPassword = useForgotPassword()

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
    forgetPassword.mutate(email);
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

export default ForgotPasswordForm;
