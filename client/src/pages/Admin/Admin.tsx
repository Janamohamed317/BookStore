import { useState } from "react";
import Authors from "../Authors/Authors";
import SideBar from "../../components/SideBar/SideBar";
import Users from "../Users/Users";
import AdminBooks from "../AdminBooks/AdminBooks";
import Orders from "../Orders/Orders";

function Admin() {
    const [activeTab, setActiveTab] = useState<string>("Books");

    const renderContent = () => {
        switch (activeTab) {
            case "Authors":
                return <Authors />;
            case "Books":
                return <AdminBooks />;
            case "Users":
                return <Users />;
            case "Orders":
                return <Orders />;
            default:
                return <Authors />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-tr from-[#1A2634] to-[#2B2118] w-full">
            <SideBar setActiveTab={setActiveTab} />

            <div className="flex flex-col flex-1 p-8 text-[#E6D5C3]">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <div className="rounded-xl bg-[#2B2118]/15 backdrop-blur-md shadow-lg p-6 flex-1 overflow-auto border border-[#6C584C]/90">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Admin;
