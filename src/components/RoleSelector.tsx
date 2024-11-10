import { useState, FC } from "react";

interface RoleSelectorProps {
  roles: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

const RoleSelector: FC<RoleSelectorProps> = ({
  roles,
  selectedRole,
  setSelectedRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const handleSelect = (role: string) => {
  //     if (role === "Create a new role") {
  //       setIsModalOpen(true);
  //     } else {
  //       setSelectedRole(role);
  //     }
  //     setIsOpen(false);
  //   };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-[224px] flex justify-between items-center border border-text_borders text-text_borders px-4 py-2 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 font-medium focus:ring-text_borders"
        >
          <span>{selectedRole}</span>
          <svg
            className="w-4 h-4 text-text_borders"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute mt-1 w-[224px] border border-gray-300 bg-white rounded-lg shadow-lg z-10">
            <li
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 cursor-pointer text-text_borders hover:bg-gray-100 font-semibold"
            >
              <svg
                className="w-4 h-4 mr-2 text-text_borders"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Create a new role
            </li>
            {roles.map((role, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedRole(role);
                  setIsOpen(false);
                }}
                className="flex items-center px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
              >
                {role}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for creating a new role */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Create a New Role
            </h2>
            <input
              type="text"
              placeholder="Enter new role name"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-text_borders"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add the new role logic here
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-text_borders text-white rounded-lg hover:bg-text_borders"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleSelector;
