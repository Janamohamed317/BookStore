import React from "react";

interface SideBarProps {
  setActiveTab: (tab: string) => void;
}

function SideBar({ setActiveTab }: SideBarProps) {
  return (
    <div className="w-50 bg-blue-50 h-screen p-4">
      <ul>
        <li
          className="cursor-pointer hover:underline"
          onClick={() => setActiveTab("books")}
        >
          Books
        </li>
        <li
          className="cursor-pointer hover:underline"
          onClick={() => setActiveTab("authors")}
        >
          Authors
        </li>
        <li
          className="cursor-pointer hover:underline"
          onClick={() => setActiveTab("users")}
        >
          Users
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
