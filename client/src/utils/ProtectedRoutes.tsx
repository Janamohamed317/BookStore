import { Navigate } from "react-router";
import type { ProtectedRoutesProps } from "../types/ProtectedRoutes";


function ProtectedRoutes({ children }: ProtectedRoutesProps) {
    const token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    else {
        return children
    }

}

export default ProtectedRoutes