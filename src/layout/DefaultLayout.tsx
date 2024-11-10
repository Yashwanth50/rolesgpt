import { FC, useState } from "react";
import MainContent from "./MainContent";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const DefaultLayout: FC = () => {
  const [activeTab, setActiveTab] = useState<"Personal" | "Enterprise">(
    "Personal"
  );

  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [rlsDrpdwn, setRlsDrpdwn] = useState(false);
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [startStepper, setStartStepper] = useState(false);

  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden md:overflow-auto">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedRole={setSelectedRole}
        rlsDrpdwn={rlsDrpdwn}
        setRlsDrpdwn={setRlsDrpdwn}
      />
      <main className="flex-grow h-full bg-overall overflow-y-scroll scrollbar-hidden md:overflow-y-auto">
        <MainContent>
          <Outlet
            context={{
              activeTab,
              selectedRole,
              setSelectedRole,
              rlsDrpdwn,
              setRlsDrpdwn,
              selectedFilePreviews,
              setSelectedFilePreviews,
              activeStep,
              setActiveStep,
              startStepper,
              setStartStepper,
            }}
          />
        </MainContent>
      </main>
    </div>
  );
};

export default DefaultLayout;
