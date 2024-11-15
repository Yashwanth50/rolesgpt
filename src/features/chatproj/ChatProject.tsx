// import React, { useState } from "react";

import ChatDetails from "../chats/ChatDetails";

export default function ChatProject() {
  return (
    <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
      <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
        <ChatDetails />
      </div>
      <div className="w-full border-l-2 border-rl[#E0E0E0]">
        <div className="flex justify-between items-center w-full py-4 h-[45px] relative md:flex px-4 my-4 pb-[34px] border-b-2 border-b-[#E0E0E0]">
          <div className="flex items-center space-x-2">
            <button className="hover:rounded-full hover:bg-[#4248501A]">
              <img
                src="/icons/cross.svg"
                alt="dots"
                className="w-[40px] h-[40px]"
              />
            </button>
            <button className="hover:rounded-full hover:bg-[#4248501A]">
              <img
                src="/icons/expand.svg"
                alt="dots"
                className="w-[40px] h-[40px]"
              />
            </button>
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              High School Achievers
            </h1>
            <p className="text-sm text-gray-500">
              Last modified by John Doe, 05:30 PM
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="hover:rounded-full p-2 hover:bg-[#4248501A]">
              <img
                src="/icons/people_icon.svg"
                alt="dots"
                className="w-[24px] h-[24px]"
              />
            </button>
            <button className="hover:rounded-full p-2 hover:bg-[#4248501A]">
              <img
                src="/icons/proj-dots.svg"
                alt="dots"
                className="w-[24px] h-[24px]"
              />
            </button>
          </div>
        </div>
        <div className="text-gray-800 leading-relaxed space-y-4 px-4">
          <h2 className="text-lg font-bold">
            Strategic Guidance for High School Achievers
          </h2>
          <p>
            Transitioning from high school to college requires careful planning,
            especially for students with strong academic and extracurricular
            backgrounds. This guide offers strategies for college selection,
            research opportunities, time management, and showcasing leadership,
            helping students align their goals with the right programs to ensure
            a successful college journey.
          </p>

          <h3 className="text-md font-semibold">1. College Selection</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Reach:</strong> Top-tier schools like UC Berkeley,
              University of Michigan.
            </li>
            <li>
              <strong>Target:</strong> Strong schools like Purdue University.
            </li>
            <li>
              <strong>Safety:</strong> In-state public universities with good
              scholarship potential.
            </li>
          </ul>

          <h3 className="text-md font-semibold">
            2. Highlight Extracurriculars
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Leadership:</strong> Emphasize your role in the Robotics
              Club.
            </li>
            <li>
              <strong>Community:</strong> Feature your math tutoring experience.
            </li>
          </ul>

          <h3 className="text-md font-semibold">3. Showcase Internship</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Skills:</strong> Highlight projects and skills gained at
              Internship
            </li>
            <li>
              <strong>Relevance:</strong> Link to your college and career goals.
            </li>
          </ul>
        </div>
        <footer className="p-4 border-b text-end text-gray-500 text-sm">
          <p>Last updated: Feb 16, 8:06 PM</p>
          <p>Guidance for High School Achievers</p>
        </footer>
      </div>
    </div>
  );
}
