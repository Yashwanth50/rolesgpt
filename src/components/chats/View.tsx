import React, { useRef, useState } from "react";
import { getFileIcon, uploadOptions } from "../Constants";
import Header from "../common/Header";
interface FileWithId {
  fileId: number;
  loading: boolean;
  name: string;
  size: number;
  type: string;
  showTrashIcon: boolean;
  progress: 0;
}
function View() {
  const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelectionAndUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newFiles: FileWithId[] = Array.from(files).map((file, index) => ({
        fileId: Date.now() + index, // Unique ID for each file
        loading: true,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0, // Initial progress set to 0
        showTrashIcon: false,
      }));

      newFiles.forEach((file) => {
        setSelectedFiles((prev) => [...prev, file]);

        const interval = setInterval(() => {
          setSelectedFiles((prevFiles: any) =>
            prevFiles.map((f: any) => {
              if (f.fileId === file.fileId) {
                const newProgress = Math.min(f.progress + 10, 100);
                return {
                  ...f,
                  progress: newProgress,
                  loading: newProgress < 100,
                };
              }
              return f;
            })
          );
        }, 200);

        // Clear interval once upload is complete
        setTimeout(() => {
          setSelectedFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.fileId === file.fileId
                ? { ...f, loading: false, showTrashIcon: true }
                : f
            )
          );
          clearInterval(interval);
        }, 2000); // Simulate a 2-second upload
      });
    }
  };

  const removeFile = (fileId: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.fileId !== fileId)
    );
  };
  return (
    <>
      <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
        <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
          <Header />
          <div className="w-full flex-grow md:h-full chat-screen">
            <div className="flex items-start gap-5 max-w-[800px] relative h-full m-auto mt-2 pb-0 md:pb-8 w-full md:h-full">
              <div className="w-full flex flex-col justify-between gap-3">
                <div className="flex-grow flex flex-col gap-2 mt-2">
                  <div className="max-w-[100%] rounded-normal rounded-bl-none bg-white md:bg-chatbg px-6 py-5 flex flex-col gap-3 mb-1 mx-4 ">
                    <div className="text-[14px] md:text-[16px] text-secondary font-normal leading-[22px] flex items-start gap-2">
                      <img
                        src="icons/logo.svg"
                        alt="logo"
                        className="w-6 h-6 mt-1"
                      />

                      <div className="text-content  leading-7 text-sm">
                        <span className="text-black font-medium text-base">
                          Response
                        </span>
                        <p>
                          Hi Deepak, I am your
                          <span className="font-medium mx-1">
                            College Counsellor!
                          </span>
                        </p>
                        <br />
                        <p>
                          Please upload your complete resume and other relevant
                          documents including GPA, Test Scores, Extra
                          Curriculars for more personalized insights and
                          recommendations.
                        </p>
                      </div>
                    </div>
                    <div className="w-full max-w-2xl mx-auto">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col gap-3">
                        <h2 className="text-base font-medium text-[#323232] leading-5">
                          Upload Documents
                        </h2>

                        <div className="bg-[#B32C900D] p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {uploadOptions.map((option, index) => (
                              <button
                                key={index}
                                className={`flex items-center space-x-3 h-9 px-4 rounded-md  ${
                                  option.isCloud ? "bg-white" : "bg-white"
                                } hover:bg-gray-50 transition duration-150 w-full font-normal leading-4 `}
                                onClick={
                                  option.title === "Browse this Computer"
                                    ? handleBrowseClick
                                    : undefined
                                }
                              >
                                <img src={option.icon} alt="logo" />
                                <span className="text-[#323232] ">
                                  {option.title}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Browse this Computer */}
                        <input
                          id="file-input"
                          type="file"
                          multiple
                          onChange={handleFileSelectionAndUpload}
                          accept=".pdf, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .txt, .zip, .rar, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, text/plain, application/zip, application/x-rar-compressed"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                        />

                        {selectedFiles.length > 0 && (
                          <div>
                            {selectedFiles.map((file) => (
                              <div
                                key={file.fileId}
                                className="px-3 h-14 border rounded-lg bg-white flex items-center justify-between"
                              >
                                <div className=" flex items-center gap-3">
                                  {file.loading ? (
                                    <div className="relative w-10 h-10">
                                      <svg className="absolute inset-0 w-full h-full">
                                        <circle
                                          cx="50%"
                                          cy="50%"
                                          r="16"
                                          stroke="#e0e0e0"
                                          strokeWidth="3"
                                          fill="none"
                                        />
                                        <circle
                                          cx="50%"
                                          cy="50%"
                                          r="16"
                                          stroke="#B32C90"
                                          strokeWidth="3"
                                          strokeDasharray="100"
                                          strokeDashoffset={
                                            100 - (file.progress / 100) * 100
                                          }
                                          fill="none"
                                          className="transition-all duration-200 ease-in-out"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    <img
                                      src={getFileIcon(file.name)}
                                      alt="file icon"
                                      className="h-10 w-10"
                                    />
                                  )}

                                  <div className=" flex flex-col gap-1">
                                    <p>{file.name}</p>
                                    <p className="text-gray-500 text-sm">
                                      {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                                      MB
                                    </p>
                                  </div>
                                </div>

                                <button
                                  onClick={() => removeFile(file.fileId)}
                                  className="text-red-500 font-semibold"
                                >
                                  {/* {file.loading ? "✕" : "🗑️"} */}

                                  <img
                                    src={
                                      file.loading
                                        ? "/icons/close.svg"
                                        : "/icons/trash.svg"
                                    }
                                    alt="trash"
                                    className="w-6 h-6"
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className=" w-full flex justify-end">
                          <button
                            type="submit"
                            disabled={selectedFiles.length > 0}
                            className={`h-9 w-9 font-semibold rounded ${
                              selectedFiles.length > 0
                                ? "bg-suggestion_color"
                                : "bg-gray-300 cursor-not-allowed opacity-30"
                            } focus:outline-none cursor-pointer`}
                          >
                            <img
                              src="/icons/submit.svg"
                              alt="submit"
                              className="text-gray-500"
                            />
                          </button>
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

// import React, { useState, useRef } from "react";
// import { uploadOptions, getFileIcon } from "./Constants"; // Ensure getFileIcon is imported here

// interface FileWithId {
//   fileId: number;
//   loading: boolean;
//   name: string;
//   size: number;
//   type: string;
// }

// const View: React.FC = () => {
//   const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleBrowseClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileSelectionAndUpload = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = event.target.files;
//     if (files) {
//       const newFiles: FileWithId[] = Array.from(files).map((file, index) => ({
//         fileId: Date.now() + index, // Unique ID for each file
//         loading: true,
//         name: file.name,
//         size: file.size,
//         type: file.type,
//       }));

//       // Update state with new files and simulate upload delay
//       newFiles.forEach((file, index) => {
//         setSelectedFiles((prev) => [...prev, file]);

//         setTimeout(() => {
//           setSelectedFiles((prevFiles) =>
//             prevFiles.map((f) =>
//               f.fileId === file.fileId ? { ...f, loading: false } : f
//             )
//           );
//         }, 2000 * (index + 1)); // Simulated delay for loading
//       });
//     }
//   };

//   const removeFile = (fileId: number) => {
//     setSelectedFiles((prevFiles) =>
//       prevFiles.filter((file) => file.fileId !== fileId)
//     );
//   };

//   return (
//     <div className="flex flex-col w-full bg-primarybg md:bg-overall p-0">
//       <div className="w-full max-w-2xl mx-auto mt-10">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-5">
//             <h2 className="text-xl font-medium mb-6">Upload Documents</h2>

//             <div className="bg-[#B32C900D] p-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {uploadOptions.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={
//                       option.title === "Browse this Computer"
//                         ? handleBrowseClick
//                         : undefined
//                     }
//                     className="flex items-center space-x-3 p-4 rounded-lg border bg-white hover:bg-gray-50 w-full text-left"
//                   >
//                     <img src={option.icon} alt="icon" />
//                     <span className="text-gray-700 font-medium">
//                       {option.title}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <input
//               id="file-input"
//               type="file"
//               multiple
//               onChange={handleFileSelectionAndUpload}
//               accept=".pdf, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .txt, .zip, .rar, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, text/plain, application/zip, application/x-rar-compressed"
//               ref={fileInputRef}
//               style={{ display: "none" }}
//             />

//             {selectedFiles.length > 0 && (
//               <div className="mt-4 space-y-4">
//                 {selectedFiles.map((file) => (
//                   <div
//                     key={file.fileId}
//                     className="p-4 border rounded-lg bg-white flex items-center space-x-4"
//                   >
//                     {file.loading ? (
//                       <div className="animate-spin h-5 w-5 border-4 border-text-primary border-t-transparent rounded-full"></div>
//                     ) : (
//                       <>
//                         {/* Use getFileIcon to get the correct icon based on file extension */}
//                         <img
//                           src={getFileIcon(file.name)}
//                           alt="file icon"
//                           className="h-5 mr-2"
//                         />
//                         <div>
//                           <p>{file.name}</p>
//                           <p className="text-gray-500 text-sm">
//                             {(file.size / (1024 * 1024)).toFixed(2)} MB
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => removeFile(file.fileId)}
//                           className="text-red-500 font-semibold"
//                         >
//                           X
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;
