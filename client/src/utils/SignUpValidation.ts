import Swal from "sweetalert2";
import type { Signup } from "../types/User";

export const validateData = (formData: Signup) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email Format",
            text: "Email must match format email@gm.com",
        });
        return false;
    }
    if (formData.password !== formData.confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Passwords don't match",
            text: "Passwords should match",
        });
        return false;
    }
    return true;
};

