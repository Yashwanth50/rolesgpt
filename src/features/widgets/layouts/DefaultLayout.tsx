import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../features/sidebar/Sidebar";
import MainContent from "../../../features/main/MainContent";

const DefaultLayout: FC = () => {
  const [activeTab, setActiveTab] = useState<"Personal" | "Enterprise">(
    "Enterprise"
  );

  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [rlsDrpdwn, setRlsDrpdwn] = useState(false);
  const [selectedFilePreviews, setSelectedFilePreviews] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [startStepper, setStartStepper] = useState(false);

  return (
    <div className="flex h-screen w-[100vw]  overflow-hidden md:overflow-auto">
      <div className="w-64">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSelectedRole={setSelectedRole}
          rlsDrpdwn={rlsDrpdwn}
          setRlsDrpdwn={setRlsDrpdwn}
        />
      </div>

      <main className="flex-grow h-full w-full  bg-overall overflow-y-scroll scrollbar-hidden ">
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
