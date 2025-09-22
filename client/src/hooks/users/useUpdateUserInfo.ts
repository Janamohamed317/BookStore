import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "../../services/UsersServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

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
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Update failed",
                text: "Please try again later",
                confirmButtonText: "OK",
            });
        },
    });
};

export default useUpdateUserInfo;
