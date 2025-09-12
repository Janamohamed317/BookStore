import React from "react";

interface SideBarProps {
  setActiveTab: (tab: string) => void;
}

function SideBar({ setActiveTab }: SideBarProps) {
  return (
    <div className="w-52 bg-[#3e2723] h-screen p-6 shadow-md">
      <ul className="space-y-4">
        <li
          className="cursor-pointer text-[#f5f5dc] hover:bg-[#a47148] hover:text-white rounded-md px-3 py-2 transition"
          onClick={() => setActiveTab("books")}
        >
          Books
        </li>
        <li
          className="cursor-pointer text-[#f5f5dc] hover:bg-[#a47148] hover:text-white rounded-md px-3 py-2 transition"
          onClick={() => setActiveTab("authors")}
        >
          Authors
        </li>
        <li
          className="cursor-pointer text-[#f5f5dc] hover:bg-[#a47148] hover:text-white rounded-md px-3 py-2 transition"
          onClick={() => setActiveTab("users")}
        >
          Users
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
