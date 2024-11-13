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
        <img
          src="/icons/settings (1).svg"
          alt="settings "
          className="h-9 w-9 rounded-full bg-gray-400"
        />
      </button>
    </div>
  );
}

export default Profile;
