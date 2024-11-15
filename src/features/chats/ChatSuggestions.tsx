import { ChatFormPayload } from "../home/chat-types";
import { useOutletContext } from "react-router-dom";
import { useChatSubmit } from "../../hooks/ChatAPiHooks";
import { OutletContext } from "../home/Home";

interface SuggestionsProps {
  suggestions: {
    suggestion_text: string | string[];
  } | null;
  lastPrompt: boolean;
}

const ChatSuggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  lastPrompt,
  //   isChatCompleted,
}) => {
  const { selectedRole } = useOutletContext<OutletContext>();

  const processSuggestions = (
    suggestions: { suggestion_text: string | string[] } | null
  ): string[] => {
    if (!suggestions) return [];

    let processedSuggestions: string[] = [];

    if (typeof suggestions.suggestion_text === "string") {
      processedSuggestions = processSuggestionText(suggestions.suggestion_text);
    } else if (Array.isArray(suggestions.suggestion_text)) {
      processedSuggestions = suggestions.suggestion_text.flatMap((item) =>
        processSuggestionText(item)
      );
    }

    return processedSuggestions.slice(0, 3);
  };

  const processSuggestionText = (text: string): string[] => {
    if (text.includes("- ") && text.includes("\n")) {
      return processBulletPoints(text);
    }

    const parts = text.split(/(?=\d\.)/).map((part) => part.trim());

    if (parts.length === 1 && !parts[0].match(/^\d+\./)) {
      return [text.replace(/\\n/g, "").replace(/\n/g, "")];
    }

    return parts
      .filter((item) => item.match(/^\d+\./))
      .map((item) =>
        item
          .replace(/\\n/g, "\n")
          .replace(/\n/g, "\n")
          .replace(/^\d+\.\s*/, "")
      )
      .slice(0, 3);
  };

  const processBulletPoints = (text: string): string[] => {
    return text
      .split(/\n/)
      .map((part) => part.trim())
      .filter((item) => item.startsWith("-"))
      .map((item) => item.replace(/^- /, "").replace(/\.$/, "?"))
      .slice(0, 3);
  };

  const individualSuggestions = processSuggestions(suggestions);
  const hasValidSuggestions = individualSuggestions.some(
    (suggestion) => suggestion.trim() !== ""
  );

  const chatFormApi = useChatSubmit(selectedRole);
  const handleSubmitChat = chatFormApi.onSubmit;

  return (
    <div>
      {individualSuggestions.length > 0 &&
        hasValidSuggestions &&
        lastPrompt && (
          <div>
            {suggestions && (
              <div id="suggestion" className="max-w-[100%] relative mb-4 my-5">
                <div className="flex items-center gap-2">
                  <img
                    className="w-[18px]"
                    src="/icons/related.svg"
                    alt="related questions"
                  />
                  <p className="text-black text-[18px] leading-[21px] m-0 font-medium">
                    Related Questions
                  </p>
                </div>
                <div className="w-full justify-end gap-3 mt-0 md:mt-2">
                  {individualSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className={`flex items-center w-full justify-between text-left py-3 hover:text-[#E78E24] text-[#424850] border-b-[0.5px] border-border tracking-normal`}
                      //     ${
                      //     isChatCompleted
                      //       ? "cursor-not-allowed opacity-50"
                      //       : "cursor-pointer"
                      //   }`}
                      //   onClick={(e) => handleOnClick(e, suggestion)}
                      //   disabled={isChatCompleted}
                      onClick={() => {
                        const payload: ChatFormPayload = {
                          Function: "",
                          Language: "",
                          Role: selectedRole,
                          context: "",
                          description: "",
                          kpis: null,
                          llm: "",
                          okrs: null,
                          prompt: suggestion,
                          template: "",
                          uid: "",
                          username: "",
                        };
                        handleSubmitChat(payload);
                      }}
                    >
                      <div className="max-w-[90%] text-[14px] md:text-[16px] leading-[19px] font-normal">
                        {suggestion}
                      </div>
                      <div>
                        <img
                          src="/icons/plus.svg"
                          alt="plus"
                          className="w-[16px]"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default ChatSuggestions;
