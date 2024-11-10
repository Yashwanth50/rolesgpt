import { FC } from "react";

interface ToggleSwitchProps {
  activeTab: "Personal" | "Enterprise";
  handleTabChange: (tab: "Personal" | "Enterprise") => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  activeTab,
  handleTabChange,
}) => {
  return (
    <div className="flex gap-2 mb-10 border h-11 border-gray-200 rounded-md p-1">
      <button
        onClick={() => handleTabChange("Personal")}
        className={`w-full h-9 ${
          activeTab === "Personal"
            ? "bg-blue-100 text-text_primary rounded-md"
            : "bg-gray-100 text-gray-700 "
        } flex justify-center items-center `}
      >
        Personal
      </button>
      <button
        onClick={() => handleTabChange("Enterprise")}
        className={`w-full h-9 ${
          activeTab === "Enterprise"
            ? "bg-blue-100 text-text_primary rounded-md"
            : "bg-gray-100 text-gray-700"
        } flex justify-center items-center `}
      >
        Enterprise
      </button>
    </div>
  );
};

export default ToggleSwitch;
