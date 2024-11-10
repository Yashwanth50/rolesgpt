import { FC } from "react";
import { ChevronDown } from "lucide-react";

interface SidebarLinkProps {
  href?: string;
  iconSrc: string;
  label: string;
  dropdown?: boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({
  href,
  iconSrc,
  label,
  dropdown,
}) => (
  <a
    href={href}
    className="flex items-center gap-3 px-3 py-1 h-10 text-gray-500 hover:bg-gray-100 rounded-lg"
  >
    <img src={iconSrc} alt={`${label} icon`} className="h-6 w-6" />
    <span>{label}</span>
    {dropdown && <ChevronDown className="ml-auto h-6 w-6" />}
  </a>
);

const Lists: FC = () => (
  <nav className="p-2 space-y-1">
    <SidebarLink
      href="/dashboard"
      iconSrc="/icons/dashboard.svg"
      label="Dashboard"
    />
    <SidebarLink
      //   href="/projects"
      iconSrc="/icons/projects.svg"
      label="Projects"
      dropdown
    />
    <SidebarLink
      //   href="/research"
      iconSrc="/icons/research.svg"
      label="Research"
      dropdown
    />
    <SidebarLink
      //   href="/chats"
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
);

export default Lists;
