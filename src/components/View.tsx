import React from "react";

function View() {
  const uploadOptions = [
    {
      icon: '/icons/upload/computer.svg',
      title: "Browse this Computer"
    },
    {
      icon: '/icons/upload/upload_my_knowledge.svg',
      title: "Upload from My Knowledge"
    },
    {
      icon: '/icons/upload/google_upload.svg',
      title: "Connect to Google Drive",
      isCloud: true
    },
    {
      icon: 'icons/upload/upload_my_knowledge.svg',
      title: "Connect to Microsoft One Drive",
      isCloud: true
    }
  ];

  return (
    <>
    <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
      <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
        <div className="w-full py-4 h-[45px] border-[#6E6E6E66] relative md:flex hidden justify-end pr-4 items-center my-4 pb-[34px] border-b-2 border-b-[#E0E0E0]">
          <div className="flex items-center justify-end">
            <div className="w-full flex items-end gap-1">
              <div className="p-0">
                <button className={`focus:outline-none flex gap-2 items-center`}>
                  <img src="/icons/file-plus-02.svg" alt="+" className={`h-[24px] w-[24px] `}/>
                  <p className={`w-full text-[#B32C90] text-[14px] leading-[16.71px] font-[400]`}>
                    Create a Project
                  </p>
                </button>
              </div>
              <div className="mx-2 border-r-2 border-r-[#E0E0E0] py-3"></div>
              <div className="p-0">
                <button className={`focus:outline-none flex gap-2 items-center`}>
                  <img src="/icons/share.svg" alt="+" className={`h-[24px] w-[24px] `}/>
                  <p className={`w-full text-[#B32C90] text-[14px] leading-[16.71px] font-[400]`}>
                    Share
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-grow md:h-full chat-screen">
          <div className="flex items-start gap-5 max-w-[800px] relative h-full m-auto mt-2 pb-0 md:pb-8">
            <div className="w-full md:h-full">
              <div className="w-full flex flex-col justify-between gap-3">
                <div className="flex-grow flex flex-col gap-2 mt-2">
                  <div className="max-w-[100%] rounded-normal rounded-bl-none bg-white md:bg-chatbg px-6 py-5 flex flex-col gap-3 mb-1 mx-4 ">
                    <div className="text-[14px] md:text-[16px] text-secondary font-normal leading-[22px]">
                      <div className=" text-black text-lg flex gap-2">
                        <img src="icons/chat_logo.svg" alt="logo" className="w-[18px]" />
                        Response
                      </div>
                      <div className="text-content mb-[1em] leading-7 text-[14px] mx-[25px]">
                        <p>Hi Deepak, I am your <strong>College Counsellor!</strong></p>
                        <br />
                        <p>Please upload your complete resume and other relevant documents including GPA, Test Scores, Extra Curriculars for more personalized insights and recommendations.</p>
                      </div>
                    </div>
                    <div className="w-full max-w-2xl mx-auto">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-3">
                          <h2 className="text-xl font-medium text-gray-900 mb-6">Upload Documents</h2>
                          
                          <div className="bg-[#B32C900D] p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {uploadOptions.map((option, index) => (
                                <button
                                  key={index}
                                  className={`flex items-center space-x-3 p-4 rounded-lg border ${
                                    option.isCloud ? 'bg-white' : 'bg-white'
                                  } hover:bg-gray-50 transition duration-150 w-full text-left`}
                                >
                                  <img src={option.icon} alt="logo" />
                                  <span className="text-gray-700 font-medium">{option.title}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default View;
