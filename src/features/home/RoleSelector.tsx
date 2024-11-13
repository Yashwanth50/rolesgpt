import { useState, FC } from "react";
import { useOutletContext } from "react-router-dom";

interface RoleSelectorProps {
  roles: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

interface OutletContext {
  rlsDrpdwn: boolean;
  setRlsDrpdwn: (value: boolean) => void;
}

const RoleSelector: FC<RoleSelectorProps> = ({
  roles,
  selectedRole,
  setSelectedRole,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { rlsDrpdwn, setRlsDrpdwn } = useOutletContext<OutletContext>();
  return (
    <>
      <div className="relative">
        <button
          onClick={() => setRlsDrpdwn(!rlsDrpdwn)}
          className="w-52 flex justify-between items-center border border-text_primary text-text_primary px-4 py-2 rounded-md bg-white hover:bg-gray-50 focus:ring-2 font-medium focus:ring-text_primary"
        >
          <span>{selectedRole}</span>
          <svg
            className="w-4 h-4 text-text_primary"
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

        {rlsDrpdwn && (
          <ul className="absolute mt-1 w-[224px] border border-gray-300 bg-white rounded-lg shadow-lg z-10">
            <li
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 cursor-pointer text-text_primary hover:bg-gray-100 font-semibold"
            >
              <svg
                className="w-4 h-4 mr-2 text-text_primary"
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
                  setRlsDrpdwn(false);
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
              className="border border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-text_primary"
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
                className="px-4 py-2 bg-text_primary text-white rounded-lg hover:bg-text_primary"
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
