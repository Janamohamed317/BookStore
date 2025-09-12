import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  const handleEmailSubmission = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/password/forgot-password",
        { email }
      );

      Swal.fire({
        icon: "success",
        text: "Password reset link has been sent to your email.",
        confirmButtonText: "OK",
      });
      console.log(res);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonText: "OK",
      });
    }
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
          className="bg-[#a47148] text-[#f5f5dc] p-2 rounded hover:bg-[#8b5e3c] transition cursor-pointer"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
