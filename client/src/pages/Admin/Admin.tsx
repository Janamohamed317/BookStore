import { useState } from "react";
import Authors from "../Authors/Authors";
import SideBar from "../../components/SideBar/SideBar";
import Users from "../Users/Users";
import AdminBooks from "../../components/AdminBooks/AdminBooks";

function Admin() {

    const [activeTab, setActiveTab] = useState<string>("books");
    const renderContent = () => {
        switch (activeTab) {
            case "Authors":
                return <Authors />;
            case "Books":
                return <AdminBooks />;
            case "Users":
                return <Users />
            default:
                return <Authors />;
        }
    };

    return (
        <>
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
        </>
    );
}

export default Admin;
