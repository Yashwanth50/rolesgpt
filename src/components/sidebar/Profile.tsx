import { Settings } from "lucide-react";
import React from "react";

function Profile() {
  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <img
        src="/icons/profile.svg"
        alt="profile"
        className="h-9 w-9 rounded-full bg-gray-400"
      />

      <div className="text-base leading-5 font-medium">Deepak Singh</div>

      <button className="rounded-full hover:bg-gray-200">
        <Settings className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Profile;
