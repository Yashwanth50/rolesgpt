import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <img
        src="/icons/profile.svg"
        alt="profile"
        className="h-9 w-9 rounded-full bg-gray-400"
      />

      <div className="text-base leading-5 font-medium">Deepak Singh</div>

      <Link to="/settings" className="rounded-full" onClick={() => {}}>
        <img
          src="/icons/settings.svg"
          alt="settings "
          className="h-9 w-9 rounded-full bg-transparent"
        />
      </Link>
    </div>
  );
}

export default Profile;
