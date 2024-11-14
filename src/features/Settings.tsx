import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";

export default function Settings() {
    const navigate = useNavigate();
    const [dataTagMenu, setDataTagMenu] = useState(false);
    const [dataTag, setDataTag] = useState("Aya");


    const goBack = () => {
        navigate(-1);
    };

    const handleOptionClick = (option: string) => {
        setDataTag(option);
        handleDataTagMenu();
    };

    const handleDataTagMenu = () => {
        setDataTagMenu(!dataTagMenu);
    };

    return (
        <div className="overflow-y-auto h-full">
            <div className="flex gap-4 pl-4 pb-4 px-4 bg-primarybg md:bg-overall border-b-2 border-b-[#E0E0E0]">
                <div className="w-full flex gap-3 h-full rounded-normal m-auto">
                    <div className={`md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 md:gap-8 pt-0 md:pt-5 relative`}>
                        <div className="md:flex w-full justify-between items-center">
                            <div className="flex gap-4 items-center justify-between md:justify-start pt-4 md:pt-0">
                                <button onClick={goBack} className="block">
                                    <img
                                        src="/icons/back.svg"
                                        alt="back"
                                        className="w-[24px] h-[24px]"
                                    />
                                </button>
                                <div className="text-[22px] md:text-[18px] font-medium leading-[25px] text-[#323232] md:flex">
                                    Settings
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex gap-4 pl-4 bg-primarybg md:bg-overall border-b-2 border-b-[#E0E0E0]`}>
                <div className="w-full flex gap-3 h-full rounded-normal m-auto ml-[25px] mb-[10px]">
                    <div className={`md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 md:gap-8 pt-0 relative`}>
                        <div className="mx-auto flex flex-col gap-4 w-full md:w-full p-3">
                            <div className="flex flex-col gap-4 pt-4">
                                <div className="text-[16px] leading-[25px] text-primary font-medium">Account</div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] font-medium text-[#323232] leading-[14px] text-primary">
                                                AI Model
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Now includes GPT-4, Aya, Mistral llm and 2 more{" "}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="border border-[#B32C90] rounded text-[#B32C90]">
                                                <div
                                                    className={`cursor-pointer h-[25px] w-fit md:w-[154px] py-1 md:py-4 px-2 flex justify-between rounded-small text-[16px] leading-[18px] text-primary items-center user-select-none bg-overall`}
                                                    onClick={handleDataTagMenu}
                                                >
                                                    <p className="text-primary font-normal text-[12px] md:text-[14px] leading-[16.71px]">
                                                        {dataTag}
                                                    </p>
                                                    <div>
                                                        {dataTagMenu ? (
                                                            <img
                                                                src="/icons/chevron-up.svg"
                                                                alt="arrow-down"
                                                                className="w-[16px] md:w-[24px]"
                                                                style={{
                                                                    transform: "rotate(0deg)",
                                                                }}
                                                            />
                                                        ) : (
                                                            <img
                                                                src="/icons/chevron-up.svg"
                                                                alt="arrow-down"
                                                                className="w-[16px] md:w-[24px]"
                                                                style={{
                                                                    transform: "rotate(180deg)",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                {dataTagMenu && (
                                                    <div className={`data-tag-menu bg-overall flex flex-col border-[1.5px] border-border text-primary rounded-normal items-start overflow-hidden z-[1] `}>
                                                        <div
                                                            onClick={() => handleOptionClick("GPT4")}
                                                            className={`${dataTag === "GPT4" ? "bg-hoverbg" : ""
                                                                } flex flex-col items-start gap-0 w-full h-full cursor-pointer hover:bg-hoverbg p-2 text-decoration-none mx-auto`}
                                                        >
                                                            <div className="w-full flex items-center justify-between">
                                                                <div className="text-primary font-normal text-[14px] leading-[16.71px]">
                                                                    GPT4
                                                                </div>
                                                                {dataTag === "GPT4" && (
                                                                    <img
                                                                        src="/icons/check-02.svg"
                                                                        alt="check"
                                                                    ></img>
                                                                )}
                                                            </div>
                                                            <p className="text-primary font-light text-[11px] leading-[11.72px] mx-0">
                                                                The Most Advanced Model
                                                            </p>
                                                        </div>

                                                        <div
                                                            onClick={() => handleOptionClick("Vicuña 14b llm")}
                                                            className={`${dataTag === "Vicuña 14b llm" ? "bg-hoverbg" : ""
                                                                } flex flex-col items-start gap-0 w-full h-full cursor-pointer hover:bg-hoverbg p-2 px-4 text-decoration-none mx-auto`}
                                                        >
                                                            <div className="w-full flex items-center justify-between">
                                                                <div className="text-primary font-normal text-[14px] leading-[16.71px]">
                                                                    Vicuña 14b llm
                                                                </div>
                                                                {dataTag === "Vicuña 14b llm" && (
                                                                    <img
                                                                        src="/icons/check-02.svg"
                                                                        alt="check"
                                                                    ></img>
                                                                )}
                                                            </div>
                                                            <p className="text-primary font-light text-[11px] leading-[11.72px] mx-0">
                                                                The Most Intelligent Model
                                                            </p>
                                                        </div>

                                                        <div
                                                            onClick={() => handleOptionClick("Aya")}
                                                            className={`${dataTag === "Aya" ? "bg-hoverbg" : ""
                                                                } flex flex-col items-start gap-0 w-full h-full cursor-pointer hover:bg-hoverbg p-2 px-4 text-decoration-none mx-auto`}
                                                        >
                                                            <div className="w-full flex items-center justify-between">
                                                                <div className="text-primary font-normal text-[14px] leading-[16.71px]">
                                                                    Aya
                                                                </div>
                                                                {dataTag === "Aya" && (
                                                                    <img
                                                                        src="/icons/check-02.svg"
                                                                        alt="check"
                                                                    ></img>
                                                                )}
                                                            </div>
                                                            <p className="text-primary font-light text-[11px] leading-[11.72px] mx-0">
                                                                Supports 101 languages
                                                            </p>
                                                        </div>

                                                        <div
                                                            onClick={() => handleOptionClick("Mistral llm")}
                                                            className={`${dataTag === "Mistral llm" ? "bg-hoverbg" : ""
                                                                } flex flex-col items-start gap-0 w-full h-full cursor-pointer hover:bg-hoverbg p-2 px-4 text-decoration-none mx-auto`}
                                                        >
                                                            <div className="w-full flex items-center justify-between">
                                                                <div className="text-primary font-normal text-[14px] leading-[16.71px]">
                                                                    Mistral llm
                                                                </div>
                                                                {dataTag === "Mistral llm" && (
                                                                    <img
                                                                        src="/icons/check-02.svg"
                                                                        alt="check"
                                                                    ></img>
                                                                )}
                                                            </div>
                                                            <p className="text-primary font-light text-[11px] leading-[11.72px] mx-0">
                                                                The Quickest Model
                                                            </p>
                                                        </div>

                                                        <div
                                                            onClick={() => handleOptionClick("Phi3 llm")}
                                                            className={`${dataTag === "Phi3 llm" ? "bg-hoverbg" : ""
                                                                } flex flex-col items-start gap-0 w-full h-full cursor-pointer hover:bg-hoverbg p-2 px-4 text-decoration-none mx-auto`}
                                                        >
                                                            <div className="w-full flex items-center justify-between">
                                                                <div className="text-primary font-normal text-[14px] leading-[16.71px]">
                                                                    Phi3 llm
                                                                </div>
                                                                {dataTag === "Phi3 llm" && (
                                                                    <img
                                                                        src="/icons/check-02.svg"
                                                                        alt="check"
                                                                    ></img>
                                                                )}
                                                            </div>
                                                            <p className="text-primary font-light text-[11px] leading-[11.72px] mx-0">
                                                                The Research Model
                                                            </p>
                                                        </div>

                                                        <div
                                                            onClick={() => handleOptionClick("Search Google")}
                                                            className={`${dataTag === "Search Google" ? "bg-hoverbg" : ""
                                                                } flex flex-col items-start gap-0 w-full h-full cursor-pointer hover:bg-hoverbg p-2 px-4 text-decoration-none mx-auto`}
                                                        >
                                                            <div className="w-full flex items-center justify-between">
                                                                <div className="text-primary font-normal text-[14px] leading-[16.71px]">
                                                                    Search Google
                                                                </div>
                                                                {dataTag === "Search Google" && (
                                                                    <img
                                                                        src="/icons/check-02.svg"
                                                                        alt="check"
                                                                    ></img>
                                                                )}
                                                            </div>
                                                            <p className="text-primary font-light text-[11px] leading-[11.72px] mx-0">
                                                                Search Google
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                Active sessions
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Devices or browsers where you are signed in{" "}
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] border border-[#B32C90] rounded text-[#B32C90] text-grad-2">
                                                    Sign out of all sessions
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                Delete account
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Permanently delete your account and data
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] hover:text-[#BE407C] focus:outline-none border border-[#B32C90] rounded text-[#B32C90] ">
                                                    Know more
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                Delete all Chats
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                This will permanently remove all chat histories. Once deleted, this action cannot be reversed.
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] hover:text-[#BE407C] focus:outline-none border border-[#B32C90] rounded text-[#B32C90] ">
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                Delete all Projects
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Deleting all projects will erase all your project data and pinned items. This process is irreversible..
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] hover:text-[#BE407C] focus:outline-none border border-[#B32C90] rounded text-[#B32C90] ">
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                Delete all researchs
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                This will permanently remove all researchs histories. Once deleted, this action cannot be reversed.
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] hover:text-[#BE407C] focus:outline-none border border-[#B32C90] rounded text-[#B32C90] ">
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex gap-4 pl-4 bg-primarybg md:bg-overall border-b-2 border-b-[#E0E0E0]`}>
                <div className="w-full flex gap-3 h-full rounded-normal m-auto ml-[25px] mb-[10px]">
                    <div className={`md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 md:gap-8 pt-0 relative`}>
                        <div className="mx-auto flex flex-col gap-4 w-full md:w-full p-3">
                            <div className="flex flex-col gap-4 pt-4">
                                <div className="text-[16px] leading-[25px] text-primary font-medium">Connected Apps</div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex gap-2">
                                                <img
                                                    src="/icons/google-drive-icon.svg"
                                                    alt=""
                                                    className="w-[16px]"
                                                />
                                                <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                    Google Drive
                                                </div>
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Upload Google docs, Sheets, Slides and other files
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] border border-[#B32C90] rounded text-[#B32C90] text-grad-2">
                                                    Connect
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex gap-2">
                                                <img src="/icons/one-drive.svg" alt="" className="w-[16px]" />
                                                <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                    Microsoft OneDrive (personal)
                                                </div>
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Upload Microsoft Word, Excel, Powerpoint and other files.
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] border border-[#B32C90] rounded text-[#B32C90] text-grad-2">
                                                    Connect
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex gap-2">
                                                <img src="/icons/one-drive.svg" alt="" className="w-[16px]" />
                                                <div className="text-[14px] font-medium text-[#323232] leading-[18px] text-primary">
                                                    Microsoft One Drive (Work/School)
                                                </div>
                                            </div>
                                            <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                                Upload Microsoft Word, Excel, PowerPoint, and other files, including those from SharePoint sites.
                                            </div>
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button
                                                    className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] border border-[#B32C90] rounded text-[#B32C90] text-grad-2">
                                                    Connect
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex gap-4 pl-4 bg-primarybg md:bg-overall border-b-2 border-b-[#E0E0E0]`}>
                <div className="w-full flex gap-3 h-full rounded-normal m-auto ml-[25px] mb-[10px]">
                    <div className={`md:w-full w-full md:overflow-auto max-w-[1120px] mx-auto h-[100%] rounded-mid flex flex-col gap-6 md:gap-8 pt-0 relative`}>
                        <div className="mx-auto flex flex-col gap-4 w-full md:w-full p-3">
                            <div className="flex flex-col gap-4 pt-4">
                                <div className="flex flex-col gap-2">
                                    <div className="text-[16px] leading-[25px] text-primary font-medium">
                                        Goals
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-[14px] leading-[16px] font-[300] text-[#323232]">
                                            RolesGPT will become more helpful as you chat, picking up on details and preferences to tailor its responses to you.
                                        </div>
                                        <div>
                                            <DialogTrigger>
                                                <Button className="w-fit p-2 py-0 h-[32px] text-[14px] leading-[16px] border border-[#B32C90] rounded text-[#B32C90] text-grad-2">
                                                    Add Goals
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                    <div className="flex mb-1">
                                        <label className="text-[14px] leading-[16px] text-[#14343B80] flex gap-2 items-center">
                                            <input type="checkbox" className='mt-[2px] w-[17.3px]' style={{ accentColor: '#c95663' }} />
                                            Use these goals as a reference to providing specific
                                            responses to any questions I ask
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-col w-[85%]">
                                            <div className="text-[14px] leading-[16px] text-[#14343B80]">
                                                I am starting with Calisthenics exercises from September first week
                                            </div>
                                        </div>
                                        <div className="w-[15%] flex justify-end">
                                            <div className="w-fit p-2 rounded-[8px] bg-[#F0F4F8] text-[#323232] text-[12px] leading-[14px] h-fit">
                                                Health & Wellness
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-col w-[85%]">
                                            <div className="text-[14px] leading-[16px] text-[#14343B80]">
                                                Recall that I prefer concise answers with bullet points whenever possible. I also like a casual and friendly tone in responses.
                                            </div>
                                        </div>
                                        <div className="w-[15%] flex justify-end">
                                            <div className="w-fit p-2 rounded-[8px] bg-[#F0F4F8] text-[#323232] text-[12px] leading-[14px] h-fit">
                                                AI Assistant
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
    )
}
