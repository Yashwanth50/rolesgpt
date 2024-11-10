import { FC, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "./MainContent";
import { Outlet } from "react-router-dom";

const DefaultLayout: FC = () => {
  const [activeTab, setActiveTab] = useState<"Personal" | "Enterprise">(
    "Personal"
  );

  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden md:overflow-auto">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow h-full bg-overall overflow-y-scroll scrollbar-hidden md:overflow-y-auto">
        <MainContent>
          <Outlet context={{ activeTab }} />
        </MainContent>
      </main>
    </div>
  );
};

export default DefaultLayout;
