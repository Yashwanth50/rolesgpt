// ChatFormUI.tsx
import React from "react";

interface ChatFormUIProps {
  onSubmit: (e: React.FormEvent) => void;
  questionValue: string;
  getValues: (name: string) => any;
  setValue: (name: string, value: any) => void;
  hasChatOrSessionId: boolean; // New prop
}

const ChatFormUI: React.FC<ChatFormUIProps> = ({
  onSubmit,
  questionValue,
  getValues,
  setValue,
  hasChatOrSessionId,
}) => (
  <form
    onSubmit={onSubmit}
    className="flex items-center gap-2 bg-prompt_bg rounded-md shadow-sm p-1 w-full my-3"
  >
    <div className="bg-white rounded-md flex items-center gap-3 px-3 w-full">
      <textarea
        name="prompt"
        value={getValues("prompt")}
        onChange={(e) => setValue("prompt", e.target.value)}
        placeholder="Ask Roles GPT..."
        className="w-full h-12 border-none resize-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400 py-3 text-base leading-relaxed min-h-[50px]"
      />

      {hasChatOrSessionId ? (
        // Attach icon when chatId or sessionId is present
        <button
          type="button"
          className="cursor-pointer p-2 rounded-full bg-gray-100 mr-2"
        >
          <img src="/icons/attach.svg" alt="attach" className="h-5 w-5" />
        </button>
      ) : (
        // "My Knowledge" button otherwise
        
        <button
          type="button"
          className="cursor-pointer border-2 border-[#EAEAE3] h-9 w-36   gap-2 rounded-sm items-center user-select-none bg-overall md:flex justify-between px-3 "
        >
          <img src="/icons/attach-home.svg" alt="attach" />
          <div className="text-[14px] text-grad-5 font-medium mt-[1px] text-left text-text_primary">
            Knowledge
          </div>
          {/* <img src="/icons/chevron-grad.svg" alt="chevron" />S */}
        </button>
      )}

      <button
        type="submit"
        disabled={!questionValue?.trim()}
        className={`h-9 w-12 font-semibold rounded ${
          questionValue?.trim()
            ? "bg-suggestion_color"
            : "bg-gray-300 cursor-not-allowed opacity-30"
        }`}
      >
        <img src="/icons/submit.svg" alt="submit" className="text-gray-500" />
      </button>
    </div>

    <button
      type="button"
      className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
    >
      <img
        src="/icons/filter.svg"
        alt="filter"
        className="h-5 w-5 text-gray-500 mr-2"
      />
    </button>
  </form>
);

export default ChatFormUI;
