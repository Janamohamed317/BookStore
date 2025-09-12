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
                <span className="text-red-700 font-bold">Not Authorized</span>
            ) : (
                <div className="flex h-screen bg-[#f5f5dc] w-full">
                    <SideBar setActiveTab={setActiveTab} />
                    <div className="flex flex-col flex-1 p-8">
                        <h1 className="text-3xl font-bold text-[#3e2723] mb-6">
                            Admin Dashboard
                        </h1>
                        <div className="bg-white rounded-xl shadow-md p-6 flex-1 overflow-auto">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Admin;
