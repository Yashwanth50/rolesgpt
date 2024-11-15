import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function MyFiles() {
    const navigate = useNavigate();
    // const fileInputRef = useRef<HTMLInputElement>(null);

    const goBack = () => {
        navigate(-1);
    };
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAttachClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        } else {
            console.error("fileInputRef is undefined.");
        }
    };

    return (
        <>
            <div className="flex gap-4 pl-4 pb-4 px-4 bg-primarybg md:bg-overall border-b-2 border-b-[#E0E0E0]">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className={`md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 md:gap-8 pt-5 relative`}>
                        <div className="md:flex w-full justify-between items-center">
                            <div className="flex gap-4 items-center justify-between md:justify-start pt-4 md:pt-0">
                                <button onClick={goBack} className="block">
                                    <img
                                        src="/icons/back.svg"
                                        alt="back"
                                        className="w-[24px] h-[24px]"
                                    />
                                </button>
                                <div className="text-[16px] md:text-[16px] font-normal leading-[18px] text-[#64645E]">
                                    My Knowledge
                                </div>
                                <div className="flex">
                                    <div className="truncate capitalize rounded-md py-1 md:py-2 p-2 bg-[#F0F4F8] md:bg-primarybg w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        Personal
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 select-none">
                                <div className="flex gap-4 relative">
                                    <button className="block px-2 h-[40px]">
                                        <img src="/icons/google-drive-icon.svg" alt="gDrive" className="w-[24px] h-[24px]" />
                                    </button>
                                    <button className="block px-2 h-[40px]">
                                        <img src="/icons/one-drive.svg" alt="gDrive" className="w-[24px] h-[24px]" />
                                    </button>
                                </div>
                                <div className="relative w-fit ">
                                    <div className="cursor-pointer border-border rounded h-[32px] md:h-[40px] py-1 md:py-2  w-fit p-2 md:px-4 flex justify-between rounded-small border-[1.5px] items-center user-select-none bg-white">
                                        <p className="text-[14px] leading-[18px] text-primary font-normal">All Roles</p>
                                        <div>
                                            <img src="/icons/chevron-up.svg" alt="arrow-down" style={{ transform: "rotate(180deg)", width: "24px", height: "24px" }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-fit">
                                    <div className="cursor-pointer border-border h-[32px] md:h-[40px] py-1 md:py-2 w-fit p-2 md:px-4 flex justify-between rounded border-[1.5px] items-center user-select-none bg-white">
                                        <p className="text-[14px] leading-[18px] text-primary font-normal">All Files</p>
                                        <div>
                                            <img src="/icons/chevron-up.svg" alt="arrow-down" style={{ transform: "rotate(180deg)", width: "24px", height: "24px" }} />
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-transparent text-[#BE407B] border-[1.5px] border-[#BE407B] cursor-pointer rounded h-[32px] md:h-[40px] py-1 md:py-2 px-2 md:px-4  flex items-center gap-2" onClick={handleAttachClick}>
                                    <img src="/icons/plus-03.svg" alt="add" className="" />
                                    <div className="text-[14px] leading-[18px] font-normal mt-[1px] p-0">Add New</div>
                                </button>
                                <input id="file-input" ref={fileInputRef} type="file" accept=".pdf, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .txt, .zip, .rar, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, text/plain, application/zip, application/x-rar-compressed" style={{ display: "none" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 pb-5 bg-primarybg md:bg-overall border-b-2 border-b-[#E0E0E0]">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 md:gap-16 pt-5 relative">
                        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-full">
                            <div className="md:flex md:gap-4 w-[90vw] md:w-full items-center">
                                <div className="w-full max-w-none md:max-w-[85%] mb-2 md:mb-0">
                                    <form className="flex gap-2 items-center border md:border-[1.5px] border-[#DDDDDD] md:border-border px-2 md:px-4 py-1 md:py-6 h-[36px] md:h-[40px] rounded w-full bg-white">
                                        <img src="/icons/search.svg" alt="search" className="h-[16px] hidden md:block" />
                                        <input type="text" placeholder="Search for files" className="w-full text-[12px] md:text-[16px] search pl-2" />
                                        <button type="submit"></button>
                                    </form>
                                </div>
                                <div className="w-full md:w-[15%] relative hidden md:flex items-center justify-end ml-auto">
                                    <div className={` h-fit flex gap-2 items-end`}>
                                        <button className={`flex gap-2 py-3 md:py-4 px-4 items-center rounded text-[14px] leading-[18.75px] font-normal cursor-pointer bg-[#B32C90] text-[#FFFFFF]`}>
                                            Attach to Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 bg-primarybg md:bg-overall">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 relative">
                        <div className="flex flex-col gap-1 w-full md:w-full">
                            <div className="flex items-center pb-0 md:pb-2 p-2 md:mb-4 border-b">
                                <div className="w-[55%] flex gap-4 items-start">
                                    <label className="flex gap-2 items-center">
                                        <div className="text-subheading font-medium text-primary py-2 flex gap-1 items-center">
                                            <input type="checkbox" name="select-file" className='mr-4' id="select-file" />
                                            File Name
                                            <div className="w-fit cursor-pointer select-none " id="sortbyname">
                                                <img src="/icons/sort.svg" alt="" className="hover:bg-btnhover p-2 rounded-full" />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="w-[25%] text-subheading font-medium text-primary py-2 ml-[30px]">
                                    Role
                                </div>
                                <div className="w-[25%]">
                                    <label className="flex gap-2 items-center">
                                        <div className="text-subheading font-medium text-primary py-2 flex gap-1 items-center">
                                            Upload Date
                                            <div className="w-fit cursor-pointer select-none " id="sortbyname">
                                                <img src="/icons/sort.svg" alt="" className="hover:bg-btnhover p-2 rounded-full" />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="hidden md:flex w-[20%] text-subheading font-medium text-primary text-center ml-4 gap-1 items-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 bg-primarybg md:bg-overall">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 relative">
                        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-full">
                            <div className="flex items-center pb-0 md:pb-2 p-2 md:mb-4 border-b">
                                <div className="w-[55%] flex gap-4 items-start">
                                    <input type="checkbox" className="mt-[2px] w-[17.3px] file-checkbox" />
                                    <div className="flex gap-2 w-[80%] items-center">
                                        <a target="_blank" rel="noopener noreferrer" className="font-normal text-primary text-[16px] leading-[18.75px] flex gap-2 items-center w-full">
                                            <img src="/icons/myfiles/pdfv1.svg" alt="File icon" className="w-[24px]" />
                                            <div className="w-[65%] truncate">PDF Page 1.pdf</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[25%] flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 rounded-md bg-[#F0F4F8] w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        personal
                                    </div>
                                </div>
                                <div className="w-[25%] hidden md:flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        Nov 05, 05:42 AM
                                    </div>
                                </div>
                                <div className="w-[20%] flex gap-4 md:gap-10 items-center justify-center md:justify-end">
                                    <div className="">
                                        <img src="/icons/filled-star.svg" alt="star" />
                                    </div>
                                    <div className="popup">
                                        <button type="button" className=" focus:outline-none flex items-center">
                                            <img src="/icons/file-dots.svg" alt="dots" className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 bg-primarybg md:bg-overall">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 relative">
                        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-full">
                            <div className="flex items-center pb-0 md:pb-2 p-2 md:mb-4 border-b">
                                <div className="w-[55%] flex gap-4 items-start">
                                    <input type="checkbox" className="mt-[2px] w-[17.3px] file-checkbox" />
                                    <div className="flex gap-2 w-[80%] items-center">
                                        <a target="_blank" rel="noopener noreferrer" className="font-normal text-primary text-[16px] leading-[18.75px] flex gap-2 items-center w-full">
                                            <img src="/icons/myfiles/pdfv1.svg" alt="File icon" className="w-[24px]" />
                                            <div className="w-[65%] truncate">PDF Page 1.pdf</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[25%] flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 rounded-md bg-[#F0F4F8] w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        personal
                                    </div>
                                </div>
                                <div className="w-[25%] hidden md:flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        Nov 05, 05:42 AM
                                    </div>
                                </div>
                                <div className="w-[20%] flex gap-4 md:gap-10 items-center justify-center md:justify-end">
                                    <div className="">
                                        <img src="/icons/unfilled-star.svg" alt="star" />
                                    </div>
                                    <div className="popup">
                                        <button type="button" className=" focus:outline-none flex items-center">
                                            <img src="/icons/file-dots.svg" alt="dots" className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 bg-primarybg md:bg-overall">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 relative">
                        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-full">
                            <div className="flex items-center pb-0 md:pb-2 p-2 md:mb-4 border-b">
                                <div className="w-[55%] flex gap-4 items-start">
                                    <input type="checkbox" className="mt-[2px] w-[17.3px] file-checkbox" />
                                    <div className="flex gap-2 w-[80%] items-center">
                                        <a target="_blank" rel="noopener noreferrer" className="font-normal text-primary text-[16px] leading-[18.75px] flex gap-2 items-center w-full">
                                            <img src="/icons/myfiles/pdfv1.svg" alt="File icon" className="w-[24px]" />
                                            <div className="w-[65%] truncate">PDF Page 1.pdf</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[25%] flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 rounded-md bg-[#F0F4F8] w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        personal
                                    </div>
                                </div>
                                <div className="w-[25%] hidden md:flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        Nov 05, 05:42 AM
                                    </div>
                                </div>
                                <div className="w-[20%] flex gap-4 md:gap-10 items-center justify-center md:justify-end">
                                    <div className="">
                                        <img src="/icons/unfilled-star.svg" alt="star" />
                                    </div>
                                    <div className="popup">
                                        <button type="button" className=" focus:outline-none flex items-center">
                                            <img src="/icons/file-dots.svg" alt="dots" className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 bg-primarybg md:bg-overall">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 relative">
                        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-full">
                            <div className="flex items-center pb-0 md:pb-2 p-2 md:mb-4 border-b">
                                <div className="w-[55%] flex gap-4 items-start">
                                    <input type="checkbox" className="mt-[2px] w-[17.3px] file-checkbox" />
                                    <div className="flex gap-2 w-[80%] items-center">
                                        <a target="_blank" rel="noopener noreferrer" className="font-normal text-primary text-[16px] leading-[18.75px] flex gap-2 items-center w-full">
                                            <img src="/icons/myfiles/pdfv1.svg" alt="File icon" className="w-[24px]" />
                                            <div className="w-[65%] truncate">PDF Page 1.pdf</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[25%] flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 rounded-md bg-[#F0F4F8] w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        personal
                                    </div>
                                </div>
                                <div className="w-[25%] hidden md:flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        Nov 05, 05:42 AM
                                    </div>
                                </div>
                                <div className="w-[20%] flex gap-4 md:gap-10 items-center justify-center md:justify-end">
                                    <div className="">
                                        <img src="/icons/unfilled-star.svg" alt="star" />
                                    </div>
                                    <div className="popup">
                                        <button type="button" className=" focus:outline-none flex items-center">
                                            <img src="/icons/file-dots.svg" alt="dots" className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 h-full md:pl-2 bg-primarybg md:bg-overall">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className="md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 relative">
                        <div className="flex flex-col gap-1 md:gap-4 w-full md:w-full">
                            <div className="flex items-center pb-0 md:pb-2 p-2 md:mb-4 border-b">
                                <div className="w-[55%] flex gap-4 items-start">
                                    <input type="checkbox" className="mt-[2px] w-[17.3px] file-checkbox" />
                                    <div className="flex gap-2 w-[80%] items-center">
                                        <a target="_blank" rel="noopener noreferrer" className="font-normal text-primary text-[16px] leading-[18.75px] flex gap-2 items-center w-full">
                                            <img src="/icons/myfiles/pdfv1.svg" alt="File icon" className="w-[24px]" />
                                            <div className="w-[65%] truncate">PDF Page 1.pdf</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[25%] flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 rounded-md bg-[#F0F4F8] w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        personal
                                    </div>
                                </div>
                                <div className="w-[25%] hidden md:flex ">
                                    <div className="truncate capitalize rounded-tiny py-1 md:py-2 p-2 w-fit text-[12px] leading-[14.06px] text-primary font-normal">
                                        Nov 05, 05:42 AM
                                    </div>
                                </div>
                                <div className="w-[20%] flex gap-4 md:gap-10 items-center justify-center md:justify-end">
                                    <div className="">
                                        <img src="/icons/filled-star.svg" alt="star" />
                                    </div>
                                    <div className="popup">
                                        <button type="button" className=" focus:outline-none flex items-center">
                                            <img src="/icons/file-dots.svg" alt="dots" className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFiles
