import { useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getFileIcon,
  rolesEnterpriseData,
  rolesPersonalData,
  uploadOptions,
} from "../../components/common/Constants";
import Header from "../header/Header";
interface FileWithId {
  fileId: number;
  loading: boolean;
  name: string;
  size: number;
  type: string;
  showTrashIcon: boolean;
  progress: 0;
}

interface OutletContext {
  setSelectedFilePreviews: (files: FileWithId[]) => void;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setStartStepper: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormData = {
  question: string;
};

function View() {
  const navigate = useNavigate();
  const { id } = useParams();

  const cardData =
    rolesPersonalData
      .flatMap((role) => role.roles.flatMap((r) => r.cards))
      .find((card) => card.card_id === id) ||
    rolesEnterpriseData
      .flatMap((role) => role.roles.flatMap((r) => r.cards))
      .find((card) => card.card_id === id);

  const { register, handleSubmit, watch } = useForm<FormData>();
  // const { handleSubmit } = useForm<FormData>();

  const questionValue = watch("question");

  const { setSelectedFilePreviews, setActiveStep, setStartStepper } =
    useOutletContext<OutletContext>();
  const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(true)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: FormData) => {
    if (data.question.trim()) {
      console.log(data);
    }
    setStartStepper(true);
    setActiveStep(0);
    navigate(`/chat/1`);
    const interval = setInterval(() => {
      setActiveStep((prevStep) => {
        if (prevStep < 3) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          setStartStepper(false);
          return prevStep;
        }
      });
    }, 1000);
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
        setSelectedFiles((prev) => {
          const updatedFiles = [...prev, file];
          setSelectedFilePreviews(updatedFiles);
          return updatedFiles;
        });

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

        setTimeout(() => {
          setSelectedFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.fileId === file.fileId
                ? { ...f, loading: false, showTrashIcon: true }
                : f
            )
          );
          clearInterval(interval);
        }, 2000);
      });
    }
  };

  const removeFile = (fileId: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.fileId !== fileId)
    );
  };

  const isButtonDisabled = () => {
    return (
      selectedFiles.length === 0 ||
      selectedFiles.some((file) => file.loading === true) ||
      !questionValue?.trim()
    );
  };

  return (
    <>
      <div className="flex home bg-primarybg md:bg-overall overflow-hidden md:overflow-y-hidden md:overflow-x-hidden p-0">
        <div className="flex flex-col w-full bg-primarybg md:bg-overall relative chat-home h-screen">
          <Header />
          <div className="w-full flex-grow md:h-full chat-screen">
            <div className="flex items-start gap-5 max-w-[800px] relative h-full m-auto pb-0 md:pb-8 w-full md:h-full">
              <div className="w-full flex flex-col justify-between gap-3">
                <div className="flex-grow flex flex-col gap-2">
                  <div className="max-w-[100%] rounded-normal rounded-bl-none bg-white md:bg-chatbg px-6 flex flex-col gap-3 mb-1 mx-4 ">
                    <div className="text-[14px] md:text-[16px] text-secondary font-normal leading-[22px] flex items-start gap-2">
                      <img
                        src="/icons/logo.svg"
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
                            {/* College Counsellor! */}
                            {cardData?.title}
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
                    <div className="w-[740px] fixed bottom-0 max-w-[100%] rounded-normal rounded-bl-none bg-white md:bg-chatbg px-6 mb-4">
                      {showFileUpload && (
                        <div className="w-[50%] bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3 p-3">
                          <h2 className="text-base font-medium text-[#323232] leading-5">
                            Upload Documents
                          </h2>

                          <div className="p-0">
                            <div className="grid grid-cols-1 gap-1">
                              {uploadOptions.map((option, index) => (
                                <>
                                  <button
                                    key={index}
                                    className={`flex items-center space-x-3 h-9 px-4 rounded-md  ${option.isCloud ? "bg-white" : "bg-white"
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
                                  <hr />
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3">

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
                          <div className="flex px-3 gap-2 w-full overflow-auto">
                            {selectedFiles.map((file) => (
                              <div
                                key={file.fileId}
                                className="px-3 h-14 border rounded-lg max-w-[214px] bg-white flex items-center justify-between mt-3"
                              >
                                <div className="w-full flex items-center gap-2">
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
                                      className="h-8 w-8"
                                    />
                                  )}

                                  <div className="max-w-[60%] flex flex-col gap-1">
                                    <p className="truncate w-full primary-subtext font-normal">{file.name}</p>
                                    <p className="text-gray-500 text-sm primary-subtext font-medium">
                                      {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                                      MB
                                    </p>
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
                                        : "/icons/close.svg"
                                    }
                                    alt="trash"
                                    className="w-6 h-6"
                                  />
                                </button>
                                </div>

                                
                              </div>
                            ))}
                          </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="bg-[#F0F4F8] rounded-md items-center px-3 w-full flex justify-end">
                            <div
                              {...register("question")}
                              className="w-full ml-2 h-12 border-none resize-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400 py-2 text-base leading-relaxed min-h-[50px] flex itemx-center "
                            >
                              <div className={`items-center focus:outline-none cursor-pointer inline-flex py-1 px-2 bg-[#FFFFFF] border-2 rounded border-[#E0E0E0]`} onClick={() => setShowFileUpload(!showFileUpload)}>
                                <img
                                  src="/icons/attach-file-grad.svg"
                                  alt="attach"
                                  className="rounded-full md:rounded-none attach-icon mr-2"
                                />
                                Upload relevant files
                              </div>
                            </div>

                            {/* <div className=" w-full flex justify-end"> */}
                            <button
                              type="submit"
                              // onClick={(e) => handleSubmit(e)}
                              disabled={isButtonDisabled()}
                              className={`h-9 w-9 font-semibold rounded ${
                                selectedFiles.length > 0
                                  ? "bg-suggestion_color"
                                  : "bg-gray-300 cursor-not-allowed opacity-30"
                              } focus:outline-none ${
                                selectedFiles.length > 0
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              }`}
                            >
                              <img
                                src="/icons/submit.svg"
                                alt="submit"
                                className="text-gray-500"
                              />
                            </button>
                          </div>
                        </form>
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
