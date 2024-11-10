import { FC } from "react";

interface QuestionCardProps {
  question: string;
}

const QuestionCard: FC<QuestionCardProps> = ({ question }) => (
  <div className="flex items-center gap-3 p-4 bg-suggestion_color rounded-md  cursor-pointer hover:bg-suggestion_color">
    <img src="/icons/sugges_quest.svg" className="h-6 w-6" alt="" />
    <span className="text-gray-700">{question}</span>
  </div>
);

export default QuestionCard;
