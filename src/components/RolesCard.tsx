// src/components/RolesCard.tsx

import React, { FC } from "react";

interface Card {
  iconSrc: string;
  title: string;
  description: string;
  uploadInfo: string;
  linkText: string;
}

interface RolesCardProps {
  selectedRoleData?: {
    role: string;
    cards: Card[];
  };
}

const RolesCard: FC<RolesCardProps> = ({ selectedRoleData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-7 mt-8">
      {selectedRoleData?.cards.map((card, index) => (
        <div
          key={index}
          className="p-3 border border-suggestion_border rounded-md shadow-sm bg-white"
        >
          <div className="flex flex-col justify-between mb-2 min-h-56">
            <img
              src={card.iconSrc}
              alt=""
              className="h-6 w-6 text-gray-500 mr-2"
            />
            <h3 className="font-semibold text-gray-700">
              I am your{" "}
              <span className="font-bold text-gray-900">{card.title}</span>
            </h3>
            <p className="text-gray-600 text-sm font-light leading-6">{card.description}</p>
            <div className="h-1 w-full border-b border-gray-200"></div>
            <p className="text-gray-500 text-sm leading-6 font-light ">
              {card.uploadInfo}
            </p>
          </div>
          <a
            href="/view"
            className="text-text_primary font-semibold hover:underline flex justify-between items-center"
          >
            <span>{card.linkText}</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default RolesCard;
