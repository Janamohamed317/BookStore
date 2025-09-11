import { useEffect, useState } from "react";
import Authors from "../Authors/Authors";
import DeleteBook from "../../components/DeleteBook/DeleteBook";
import { decodeToken } from "../../utils/DecodedToken";
import SideBar from "../../components/SideBar/SideBar";

function Admin() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("books");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAdmin(decodeToken(token));
        }
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case "authors":
                return <Authors />;
            case "books":
                return <DeleteBook />;
            case "users":
                return <div>Users management coming soon...</div>;
            default:
                return <Authors />;
        }
    };

    return (
        <>
            {!isAdmin ? (
                <span>Not Authorized</span>
            ) : (
                <div className="flex gap-8">
                    <SideBar setActiveTab={setActiveTab} />
                    <div className="flex flex-col">
                        <h1 className="mt-8 font-bold text-2xl">Admin Dashboard</h1>
                        {renderContent()}
                    </div>
                </div>
            )}
        </>
    );
}

export default Admin;
