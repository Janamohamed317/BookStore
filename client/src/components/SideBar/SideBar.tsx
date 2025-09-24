import { sideBarItems } from "../../assets/assets";

type SideBarProps = {
  setActiveTab: (tab: string) => void;
};

function SideBar({ setActiveTab }: SideBarProps) {
  return (
    <div className="w-56 h-screen bg-[#2B2118]/30 backdrop-blur-md p-6 shadow-lg border-r border-[#6C584C]/90">
      <ul className="space-y-3">
        {sideBarItems.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer text-[#f5f5dc] hover:bg-[#a47148]/80 hover:text-[#2B2118] 
                       px-4 py-2 rounded-lg font-medium transition"
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
