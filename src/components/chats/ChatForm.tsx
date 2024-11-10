import { FC } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  question: string;
};

const ChatForm: FC = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const questionValue = watch("question");

  const onSubmit = (data: FormData) => {
    if (data.question.trim()) {
      console.log(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 bg-prompt_bg rounded-md shadow-sm p-1 w-full my-3"
    >
      <div className="bg-white rounded-md flex items-center px-3 w-full">
        <textarea
          {...register("question")}
          placeholder="Ask Roles GPT..."
          className="w-full h-12 border-none resize-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400 py-3 text-base leading-relaxed min-h-[50px]"
        />

        <button
          type="button"
          className="cursor-pointer border-[1.5px] border-[#EAEAE3] h-[25px] pb-1 md:py-4 px-2 pr-0 gap-2 rounded-small items-center user-select-none bg-overall md:flex mr-2 w-[250px]"
        >
          <img src="/icons/star-mk.svg" alt="star" />
          <div className="text-[14px] text-grad-5 font-medium mt-[1px] text-left text-text_primary">
            My Knowledge
          </div>
          <img src="/icons/chevron-grad.svg" alt="star" />
        </button>

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
};

export default ChatForm;
