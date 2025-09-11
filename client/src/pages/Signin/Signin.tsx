import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router'
import type { ErrorResponse } from '../../types/Error'
import { handleNavigate } from '../../utils/HandleNavigation'
import type { signin } from '../../types/User'



function Signin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<signin>({
        email: "",
        password: "",
    })

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password
            })
            const token = res.data.token
            localStorage.setItem("token", token);
            const path = handleNavigate(token)
            navigate(path)

        } catch (error) {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Logging in',
                    text: error.response?.data.message,
                    confirmButtonText: 'OK',
                });
            }
        }

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-start gap-5 bg-blue-600/10 p-5 rounded-2xl w-80">
                <label htmlFor="email">Email:</label>
                <input type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email"
                    className="bg-white p-2 rounded-2xl" />

                <label htmlFor="password">Password</label>
                <input type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="password"
                    className="bg-white p-2 rounded-2xl" />

                <span
                    className='self-end cursor-pointer'
                    onClick={() => navigate('/resetPassword')}>Forgot Password?
                </span>

                <button onClick={handleSubmit} className="bg-blue-950 text-white rounded-2xl p-2">Submit</button>
                <span className="text-center">Doesn't have an account? <span className="underline cursor-pointer"
                    onClick={() => navigate('/signup')}>Sign up</span></span>
            </div>
        </div>
    )
}

export default Signin