import { FC } from "react";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
  href?: any;
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
  <Link
    to={href}
    className="flex items-center gap-3 px-3 py-1 h-10 text-gray-500 hover:bg-gray-100 rounded-lg"
  >
    <img src={iconSrc} alt={`${label} icon`} className="h-6 w-6" />
    <span>{label}</span>
    {dropdown && (
      <img src={"/icons/chevron-down.svg"} alt="" className="ml-auto h-6 w-6" />
    )}
  </Link>
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
