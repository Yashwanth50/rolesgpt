import { FC, ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: FC<MainContentProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default MainContent;
