import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import ChatFormUI from "./ChatFormUI";
import { ChatFormPayload, ChatFormProps } from "../home/chat-types";
import { useChatSubmit } from "src/hooks/ChatAPiHooks";
import { ChatFormFields } from "./ChatTypes";
import { useParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

function getDefaultValues(
  selectedRole: string,
  uid: any
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
    uid: uid,
    username: "",
  };
}

function ChatForm({ selectedRole }: ChatFormProps) {
  const { chatId, sessionId } = useParams();

  const { hasAuthenticated } = useAuth();

  const uid = hasAuthenticated ? chatId : sessionId;

  const { onSubmit } = useChatSubmit(selectedRole);

  const methods = useForm<Omit<ChatFormPayload, "chatId">>({
    defaultValues: getDefaultValues(selectedRole, uid),
  });

  const { getValues, setValue, watch, reset } = methods;

  useEffect(() => {
    if (selectedRole) {
      reset(getDefaultValues(selectedRole, uid));
    }
  }, [selectedRole, reset, uid]);

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
        hasChatOrSessionId={Boolean(chatId || sessionId)} // Pass prop
      />
    </FormProvider>
  );
}

export default ChatForm;
