import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "./DecodedToken";

function ProtectedAdminRoute() {
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    const isAdmin = decodeToken(token)

    if (!isAdmin) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
}

export default ProtectedAdminRoute;
