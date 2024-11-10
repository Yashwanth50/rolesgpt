import { FC } from "react";
import { ChevronDown, Settings, Plus } from "lucide-react";

const SidebarLink: FC<{
  href: string;
  iconSrc: string;
  label: string;
  dropdown?: boolean;
}> = ({ href, iconSrc, label, dropdown }) => (
  <a
    href={href}
    className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
  >
    <img src={iconSrc} alt={`${label} icon`} className="h-4 w-4" />
    <span>{label}</span>
    {dropdown && <ChevronDown className="ml-auto h-4 w-4" />}
  </a>
);
interface SidebarProps {
  activeTab: "Personal" | "Enterprise";
  setActiveTab: (tab: "Personal" | "Enterprise") => void;
}
const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 border-r bg-blue-50 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center h-14 border-b px-4">
          <img
            src="/icons/logo.svg"
            alt="Roles GPT Logo"
            className="h-5 w-5 text-pink-500"
          />
          {/* <span className="ml-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
            Roles GPT
          </span> */}
          <span className="ml-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 font-inter text-[18.41px] leading-[22.28px]">
            Roles GPT
          </span>

          {/* Replacing FileText component with an img */}
          <button className="ml-auto text-gray-700 hover:bg-gray-200 p-2 rounded-full">
            <img
              src="/icons/file-text.svg"
              alt="File Text"
              className="h-4 w-4"
            />
          </button>
        </div>
        <div className="p-4">
          <button className="flex items-center gap-2 border border-white text-black px-4 py-2 rounded w-full bg-white">
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>
        {/* <nav className="p-2 space-y-1">
          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
          />
          <SidebarLink
            href="/projects"
            icon={<FileText className="h-4 w-4" />}
            label="Projects"
            dropdown
          />
          <SidebarLink
            href="/research"
            icon={<HelpCircle className="h-4 w-4" />}
            label="Research"
            dropdown
          />
          <SidebarLink
            href="/chats"
            icon={<Library className="h-4 w-4" />}
            label="Chat Library"
            dropdown
          />
          <SidebarLink
            href="/my-knowledge"
            icon={<BarChart2 className="h-4 w-4" />}
            label="My Knowledge"
          />
        </nav> */}

        <nav className="p-2 space-y-1">
          <SidebarLink
            href="/dashboard"
            iconSrc="/icons/dashboard.svg"
            label="Dashboard"
          />
          <SidebarLink
            href="/projects"
            iconSrc="/icons/projects.svg"
            label="Projects"
            dropdown
          />
          <SidebarLink
            href="/research"
            iconSrc="/icons/research.svg"
            label="Research"
            dropdown
          />
          <SidebarLink
            href="/chats"
            iconSrc="/icons/chats.svg"
            label="Chat Library"
            dropdown
          />
          <SidebarLink
            href="/my-knowledge"
            iconSrc="/icons/knowledge.svg"
            label="My Knowledge"
          />
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2 mb-4">
          <button className="text-pink-500 w-full hover:bg-gray-200 rounded-lg py-2">
            Personal
          </button>
          <button className="w-full hover:bg-gray-200 rounded-lg py-2">
            Enterprise
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="text-sm font-medium">Deepak Singh</div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
