import { ChatFormPayload } from "./chat-types";

interface QuestionCardProps {
  question: string;
  handleSubmitChat: (data: ChatFormPayload) => void;
  selectedRole?: any;
}

function QuestionCard({
  question,
  handleSubmitChat,
  selectedRole,
}: QuestionCardProps) {
  return (
    <button
      type="submit"
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
          prompt: question,
          template: "",
          uid: "",
          username: "",
        };
        handleSubmitChat(payload);
      }}
      className="flex items-center gap-3 p-4 bg-suggestion_color rounded-md  cursor-pointer hover:bg-suggestion_color"
    >
      <img src="/icons/sugges_quest.svg" className="h-6 w-6" alt="" />
      <span className="text-gray-700">{question}</span>
    </button>
  );
}

export default QuestionCard;
