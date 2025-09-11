import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import type { ErrorResponse } from "../../types/Error"
import type { signup } from "../../types/User"

function Signup() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<signup>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })


    const validateData = (formData: signup) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: "error",
                title: "Email must match that format email@gm.com",
                text: "Invalid Email Foramt",
            })
        }
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords don't match",
                text: "Passwords Should match",
            })
        }

    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                email: formData.email,
                username: formData.username,
                password: formData.password

            }).catch()
            {

            }
            localStorage.setItem("token", res.data.token);
            navigate("/")

        } catch (error: any) {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Signup Failed',
                    text: error.response?.data.message,
                    confirmButtonText: 'OK',
                });
            }
        }

    }


    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="flex flex-col justify-start gap-5 bg-blue-600/10 p-5 rounded-2xl w-80">
                <label htmlFor="email">Email:</label>
                <input type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email"
                    className="bg-white p-2 rounded-2xl" />

                <label htmlFor="username">Username</label>
                <input type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="username"
                    className="bg-white p-2 rounded-2xl" />

                <label htmlFor="password">Password</label>
                <input type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="password"
                    className="bg-white p-2 rounded-2xl" />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="bg-white p-2 rounded-2xl"
                />
                <button onClick={handleSubmit} className="bg-blue-950 text-white rounded-2xl p-2">Submit</button>
                <span className="text-center">already have an account? <span className="underline cursor-pointer"
                    onClick={() => navigate('/signin')}>Sign in</span></span>
            </div>
        </div>
    )
}

export default Signup