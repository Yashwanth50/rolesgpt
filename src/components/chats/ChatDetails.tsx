// import React, { useState } from "react";
import Header from "../common/Header";
import { getFileIcon, truncateFileName } from "../Constants";
import LlmResponse from "./LlmResponse";

const files = [
  {
    img: "",
    name: "Resume.pdf",
  },
  {
    img: "",
    name: "Document.pdf",
  },
];

function FileDocuments() {
  return (
    <div className=" grid grid-cols-4 gap-3">
      {files.map((file: any, index: number) => {
        return (
          <div
            key={index}
            className="border rounded-md flex items-center gap-3 px-3 h-10 py-1"
          >
            <img
              src={getFileIcon(file.name)}
              alt="file"
              className="h-10 w-10"
            />
            <div className=" font-light">{truncateFileName(file.name)}</div>
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

export default function ChatDetails() {
//   const [filePreviews, setFilePreviews] = useState([files]);
  return (
    <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
      <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
        <Header />

        <div className="w-full flex-grow md:h-full chat-screen">
          <div className="flex items-start gap-5 max-w-[800px] relative h-full m-auto mt-2 pb-0 md:pb-8 w-full md:h-full">
            <div className="w-full flex flex-col justify-between gap-6">
              {/* {files.length > 0 && (
                <div className="w-fit flex flex-wrap gap-4 items-end">
                  {files.map((file: any, index: number) => {
                    return (
                      <div key={index} className="flex">
                        <div className="w-max relative flex flex-col gap-2 pl-4 p-2 h-fit rounded-[20px] border-[1.5px] border-border bg-white">
                          <div className=" flex items-center gap-3">
                            <span className="text-[14px] font-medium text-primary leading-[16px] flex gap-2 items-center">
                              <img src={getFileIcon(file.name)} alt="pdf"></img>
                              <span className="truncate max-w-[125px]">
                                {truncateFileName(file.name)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )} */}

              <FileDocuments />
              <ProfileCard />
              <LlmResponse />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
