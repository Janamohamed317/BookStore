import React from "react";
import { sideBarItems } from "../../assets/assets";

interface SideBarProps {
  setActiveTab: (tab: string) => void;
}


function SideBar({ setActiveTab }: SideBarProps) {
  return (
    <div className="w-52 bg-[#3e2723] h-screen p-6 shadow-md">
      <ul className="space-y-4">
        {sideBarItems.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer text-[#f5f5dc] hover:bg-[#a47148] hover:text-white rounded-md px-3 py-2 transition"
            onClick={() => setActiveTab(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
