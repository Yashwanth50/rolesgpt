// import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Header from "../header/Header";
import LlmResponse from "../chats/LlmResponse";
import {
    getFileIcon,
    truncateFileName,
} from "../../components/common/Constants";

interface FileWithId {
    fileId: number;
    loading: boolean;
    name: string;
}

interface OutletContext {
    selectedFilePreviews: FileWithId[];
}

function FileDocuments({
    selectedFilePreviews,
}: {
    selectedFilePreviews: FileWithId[];
}) {
    return (
        <div className=" grid grid-cols-4 gap-3">
            {selectedFilePreviews.map((file: any, index: number) => {
                return (
                    <div
                        key={index}
                        className="border rounded-md w-full flex items-center gap-3 h-12 px-2 py-2"
                    >
                        <img
                            src={getFileIcon(file.name)}
                            alt="file"
                            className="h-10 w-10"
                        />
                        <div className="font-light text-sm truncate max-w-[120px]">
                            {truncateFileName(file.name)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ProfileCard() {
    return (
        <div className="flex items-center space-x-2">
            <img
                src={"/icons/profile.svg"}
                alt={"profile"}
                className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold">Deepak Singh</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">Academic Coach</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">Today, 05.30 PM</span>
                </div>
            </div>
        </div>
    );
}

export default function ProjectDetails() {
    const { selectedFilePreviews } = useOutletContext<OutletContext>();

    return (
        <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
            <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
                <Header />
                <div className="w-full flex-grow md:h-full chat-screen px-4">
                    <div className="flex items-start gap-5 max-w-[800px] relative h-full m-auto mt-2 pb-0 md:pb-8 w-full md:h-full">
                        <div className="w-full flex flex-col justify-between gap-6">
                            <FileDocuments selectedFilePreviews={selectedFilePreviews} />
                            <ProfileCard />
                            <LlmResponse />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-l-2 border-rl[#E0E0E0]">
                <div className="flex justify-between items-center w-full py-4 h-[45px] relative md:flex px-4 my-4 pb-[34px] border-b-2 border-b-[#E0E0E0]">
                    <div>
                        <h1 className="text-xl font-semibold">Strategic Guidance for High School Achievers</h1>
                        <p className="text-sm text-gray-500">Last modified by John Doe, 05:30 PM</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="hover:rounded-full p-2 hover:bg-[#4248501A]">
                            <img src="/icons/people_icon.svg" alt="dots" className="w-[24px] h-[24px]" />
                        </button>
                        <button className="hover:rounded-full p-2 hover:bg-[#4248501A]">
                            <img src="/icons/proj-dots.svg" alt="dots" className="w-[24px] h-[24px]" />
                        </button>
                    </div>
                </div>
                <div className="text-gray-800 leading-relaxed space-y-4 px-4">
                    <h2 className="text-lg font-bold">Strategic Guidance for High School Achievers</h2>
                    <p>Transitioning from high school to college requires careful planning, especially for students with strong academic and extracurricular backgrounds. This guide offers strategies for college selection, research opportunities, time management, and showcasing leadership, helping students align their goals with the right programs to ensure a successful college journey.</p>

                    <h3 className="text-md font-semibold">1. College Selection</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li><strong>Reach:</strong> Top-tier schools like UC Berkeley, University of Michigan.</li>
                        <li><strong>Target:</strong> Strong schools like Purdue University.</li>
                        <li><strong>Safety:</strong> In-state public universities with good scholarship potential.</li>
                    </ul>

                    <h3 className="text-md font-semibold">2. Highlight Extracurriculars</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li><strong>Leadership:</strong> Emphasize your role in the Robotics Club.</li>
                        <li><strong>Community:</strong> Feature your math tutoring experience.</li>
                    </ul>

                    <h3 className="text-md font-semibold">3. Showcase Internship</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li><strong>Skills:</strong> Highlight projects and skills gained at Internship</li>
                        <li><strong>Relevance:</strong> Link to your college and career goals.</li>
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
