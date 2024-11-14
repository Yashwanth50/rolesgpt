import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import ChatFormUI from "./ChatFormUI";
import { ChatFormPayload, ChatFormProps } from "../home/chat-types";
import { useChatSubmit } from "src/hooks/ChatAPiHooks";
import { ChatFormFields } from "./ChatTypes";

function getDefaultValues(
  selectedRole: string
): Omit<ChatFormFields, "chatId"> {
  return {
    Function: "",
    Language: "",
    Role: selectedRole,
    context: "",
    description: "",
    kpis: null,
    llm: "",
    okrs: null,
    prompt: "",
    template: "",
    uid: "",
    username: "",
  };
}

function ChatForm({ selectedRole }: ChatFormProps) {
  const { onSubmit } = useChatSubmit(selectedRole);

  const methods = useForm<Omit<ChatFormPayload, "chatId">>({
    defaultValues: getDefaultValues(selectedRole),
  });

  const { getValues, setValue, watch, reset } = methods;

  useEffect(() => {
    if (selectedRole) {
      reset(getDefaultValues(selectedRole));
    }
  }, [selectedRole, reset]);

  const questionValue = watch("prompt");

  const handleFormSubmit = (data: Omit<ChatFormPayload, "chatId">) => {
    // Add `chatId` dynamically to the payload
    const payload: ChatFormPayload = { ...data };
    onSubmit(payload); // Pass the payload with `chatId`
  };

  return (
    <FormProvider {...methods}>
      <ChatFormUI
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        questionValue={questionValue}
        getValues={getValues as any}
        setValue={setValue as any}
      />
    </FormProvider>
  );
}

export default ChatForm;
