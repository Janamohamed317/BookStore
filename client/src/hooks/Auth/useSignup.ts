import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/UsersServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';

const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data._id);
            Swal.fire({
                icon: "success",
                title: "Signup Successful",
                text: "Welcome to Bookstore!",
                confirmButtonText: "OK",
            });
            navigate("/");
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "warning",
                    title: "Signup Failed",
                    text: error.response?.data.message || "Something went wrong",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useSignup