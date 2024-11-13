import { FC } from "react";
import ToggleSwitch from "./ToggleSwitch";
import Profile from "./Profile";
import Lists from "./Lists";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab: "Personal" | "Enterprise";
  setActiveTab: (tab: "Personal" | "Enterprise") => void;
  setSelectedRole: (role: string) => void;
  rlsDrpdwn: boolean;
  setRlsDrpdwn: (value: boolean) => void;
}
const Sidebar: FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  setSelectedRole,
  rlsDrpdwn,
  setRlsDrpdwn,
}) => {
  const navigate = useNavigate();
  const handleTabChange = (tab: "Personal" | "Enterprise") => {
    setActiveTab(tab);
    setSelectedRole("Select Role");
    setRlsDrpdwn(false);
  };

  const handleRedirectHome = () => {
    navigate("/");
  };

  return (
    <aside className="w-64 border-r bg-bg_sidebar flex flex-col justify-between h-full">
      <div>
        <div className="flex gap-3 items-center h-14 border-b px-4">
          <button onClick={handleRedirectHome}>
            <img
              src="/icons/logo.svg"
              alt="Roles GPT Logo"
              className="h-9 w-9 text-text-primary"
            />
          </button>

          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#E78E24] from-[#B32C90] font-inter text-lg leading-6">
            Roles GPT
          </span>

          <button className="ml-auto text-gray-700 hover:bg-gray-200 p-2 rounded-full">
            <img
              src="/icons/file-text.svg"
              alt="File Text"
              className="h-6 w-6"
            />
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={handleRedirectHome}
            className="flex items-center gap-2 border border-white text-black px-4 py-2 rounded w-full bg-white"
          >
            <img src="/icons/plus.svg" alt="plus" className="h-6 w-6 *:" />
            New Chat
          </button>
        </div>
        <Lists />
      </div>

      <div className="p-4">
        <ToggleSwitch activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="flex items-center gap-3">
          <Profile />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
