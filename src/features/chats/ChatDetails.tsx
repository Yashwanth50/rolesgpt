// import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import LlmResponse from "./LlmResponse";
import Header from "../header/Header";
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

export default function ChatDetails() {
  const { selectedFilePreviews } = useOutletContext<OutletContext>();

  const { chatId, sessionId } = useParams();

  return (
    <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
      <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
        <Header />

        <div className="w-full flex-grow md:h-full chat-screen">
          <div className="flex items-start gap-5 max-w-[800px] relative h-full m-auto mt-2 pb-0 md:pb-8 w-full md:h-full">
            <div className="w-full flex flex-col justify-between gap-6">
              <FileDocuments selectedFilePreviews={selectedFilePreviews} />

              <ProfileCard />

              {(chatId || sessionId) && <LlmResponse />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
