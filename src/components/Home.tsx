import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import { rolesData, SuggestedQuestions } from "./Constants";
import QuestionCard from "./QuestionCard";
import RoleSelector from "./RoleSelector";
import RolesCard from "./RolesCard";
import { useOutletContext } from "react-router-dom";
// import {
//   Button,
//   Dialog,
//   DialogTrigger,
//   OverlayArrow,
//   Popover,
// } from "react-aria-components";

type FormData = {
  question: string;
};

interface OutletContext {
  activeTab: "Personal" | "Enterprise";
}

const Home: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const { activeTab } = useOutletContext<OutletContext>();
  console.log("activeTab", activeTab);

  const filteredRolesByType = rolesData.find(
    (roleData) => roleData.category === activeTab
  );

  const roles = filteredRolesByType ? filteredRolesByType.roles : [];

  const selectedRoleData = roles.find((role) => role.role === selectedRole);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="p-8 flex-1 bg-[#ffff] mt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold ">Hello Deepak,</h1>

        <div className="mt-4 flex items-center gap-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 bg-prompt_bg rounded-md shadow-sm p-1 w-full my-3"
        >
          <div className=" bg-white rounded-md flex items-center px-3 w-full">
            <input
              {...register("question")}
              placeholder="Ask Roles GPT..."
              className="w-full  h-12 border-none focus:outline-none focus:ring-0 text-gray-700"
            />

            <button
              className={`cursor-pointer border-[1.5px] border-[#EAEAE3] h-[25px] pb-1 md:py-4 px-2 pr-0 gap-2 rounded-small items-center user-select-none bg-overall  md:flex mr-2 w-[250px]`}
            >
              <img src="/icons/star-mk.svg" alt="star" />

              <div className="text-[14px] text-grad-5 font-medium mt-[1px] text-left text-text_borders">
                My Knowledge
              </div>
              <img src="/icons/chevron-grad.svg" alt="star" />
            </button>
            <button
              type="submit"
              className=" h-9 w-12  font-semibold rounded  bg-suggestion_color"
            >
              <img src="/icons/submit.svg" alt="" className="  text-gray-500" />
            </button>
          </div>

          <button
            type="button"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full "
          >
            {/* <SlidersHorizontal className="h-4 w-4" /> */}
            <img
              src="/icons/filter.svg"
              alt=""
              className="h-5 w-5 text-gray-500 mr-2"
            />
          </button>
        </form>

        {selectedRole === "Select Role" && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Suggested Questions
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {SuggestedQuestions.map((question, index) => (
                <QuestionCard key={index} question={question} />
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
