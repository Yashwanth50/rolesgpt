import { FC } from "react";

import QuestionCard from "./QuestionCard";
import RoleSelector from "./RoleSelector";
import RolesCard from "./RolesCard";
import { useOutletContext } from "react-router-dom";
import ChatForm from "../chats/ChatForm";
import {
  rolesEnterpriseData,
  rolesPersonalData,
  SuggestedQuestions,
} from "../../components/common/Constants";
import { useChatSubmit } from "src/hooks/ChatAPiHooks";
// import {
//   Button,
//   Dialog,
//   DialogTrigger,
//   OverlayArrow,
//   Popover,
// } from "react-aria-components";

export interface OutletContext {
  activeTab: string;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

const Home: FC = () => {
  const { activeTab, selectedRole, setSelectedRole } =
    useOutletContext<OutletContext>();

  const chatFormApi = useChatSubmit(selectedRole);

  const rolesData =
    activeTab === "Personal" ? rolesPersonalData : rolesEnterpriseData;

  const filteredRolesByCat = rolesData.find(
    (roleData) => roleData.category === activeTab
  );

  const roles = filteredRolesByCat ? filteredRolesByCat.roles : [];

  const selectedRoleData = roles.find((role) => role.role === selectedRole);

  console.log("selectedRole::", selectedRole);

  return (
    <div className="p-8 flex-1 bg-[#ffff] mt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold ">Hello Deepak,</h1>

        <div className="mt-4 flex items-center gap-3">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-text_primary text-transparent bg-clip-text">
            Choose an Expert Role!
          </h2>
          <span>✨</span>

          <RoleSelector
            roles={roles.map((role) => role.role)}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />

          <button type="button" className="p-2 rounded-full focus:outline-none">
            <img
              src="/icons/circular-icon.svg"
              alt="Info Icon"
              className="h-4 w-4"
            />
          </button>
        </div>

        {/* Use the ChatForm component */}
        <ChatForm selectedRole={selectedRole} />

        {selectedRole === "Select Role" && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Suggested Questions
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {SuggestedQuestions.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  handleSubmitChat={chatFormApi.onSubmit}
                  selectedRole={selectedRole}
                />
              ))}
            </div>
          </div>
        )}

        <RolesCard selectedRoleData={selectedRoleData} />
      </div>
    </div>
  );
};

export default Home;
