

export default function Header() {
  return (
    <div className="w-full py-4 h-[45px] border-[#6E6E6E66] relative md:flex hidden justify-end pr-4 items-center my-4 pb-[34px] border-b-2 border-b-[#E0E0E0]">
      <div className="flex items-center justify-end">
        <div className="w-full flex items-end gap-1">
          <div className="p-0">
            <button className={`focus:outline-none flex gap-2 items-center`}>
              <img
                src="/icons/file-plus-02.svg"
                alt="+"
                className={`h-[24px] w-[24px] `}
              />
              <p
                className={`w-full text-[#B32C90] text-[14px] leading-[16.71px] font-[400]`}
              >
                Create a Project
              </p>
            </button>
          </div>
          <div className="mx-2 border-r-2 border-r-[#E0E0E0] py-3"></div>
          <div className="p-0">
            <button className={`focus:outline-none flex gap-2 items-center`}>
              <img
                src="/icons/share.svg"
                alt="+"
                className={`h-[24px] w-[24px] `}
              />
              <p
                className={`w-full text-[#B32C90] text-[14px] leading-[16.71px] font-[400]`}
              >
                Share
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
