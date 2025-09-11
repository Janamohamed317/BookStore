import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

function ResetPasswordForm() {
    const { id, token } = useParams<{ id: string; token: string }>();
    const [password, setPassword] = useState<string>("");
    const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
    const navigate = useNavigate();


    useEffect(() => {
        const verifyLink = async () => {
            try {
                await axios.get(`http://localhost:5000/api/password/reset-password/${id}/${token}`);
                setStatus("valid");
            } catch (error) {
                setStatus("invalid");
            }
        };
        verifyLink();
    }, [id, token]);

    const handlePasswordReset = async () => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/password/reset-password/${id}/${token}`,
                { password }
            );
            console.log("form", res.data);

            navigate("/login");
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            alert("Reset link is invalid or expired.");
        }
    };
    if (status === "loading") return <p>Verifying link...</p>;
    if (status === "invalid") return <p>❌ This reset link is invalid or has expired.</p>;
    return (
        <div className="flex flex-col">
            <label htmlFor="password">Enter New Password</label>
            <input
                type="password"
                id="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
    );
}

export default ResetPasswordForm