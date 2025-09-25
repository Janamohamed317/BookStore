import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "../../services/UsersServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axios from "axios";

const useUpdateUserInfo = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: updateUserInfo,
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                text: "Profile updated successfully",
                confirmButtonText: "OK",
            });
            navigate('/user')
        },
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "There was an error",
                    text: error.response?.data.message || "There is an Error Try Again Later",
                    confirmButtonText: "OK",
                });
            }
        },
    });
};

export default useUpdateUserInfo;
