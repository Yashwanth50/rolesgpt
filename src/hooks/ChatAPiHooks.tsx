import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { apiClient } from "src/features/api/api-client";
import { ChatFormPayload } from "src/features/home/chat-types";
import { useChatStore } from "src/features/store/ChatStore";
import { useAuth } from "src/features/lib/AuthContext";

// Helper function to format the request payload
function getRequestPayload(data: ChatFormPayload, selectedRole: string) {
  return {
    Function: data.Function,
    Language: data.Language,
    Role: selectedRole,
    context: data.context,
    description: data.description,
    kpis: data.kpis,
    llm: data.llm,
    okrs: data.okrs,
    prompt: data.prompt,
    template: data.template,
    uid: data.uid,
    username: data.username,
  };
}

// Mutation to submit a new chat
function useSubmitChat(selectedRole: string) {
  return useMutation({
    mutationFn: (data: ChatFormPayload) => {
      const payload = getRequestPayload(data, selectedRole);
      return apiClient.externalPost(`/v1/api/chat`, payload);
    },
  });
}

// Mutation to generate a new chat ID
// function useGenerateChatId(selectedRole: string) {
//   return useMutation({
//     mutationFn: (data: ChatFormPayload) => {
//       const chatListName = data.prompt;
//       return apiClient.post(`/v3/chat`, { chatListName });
//     },
//   });
// }

// Mutation to fetch suggestion questions based on the chat
function useFetchSuggestions(selectedRole: string) {
  return useMutation({
    mutationFn: (data: ChatFormPayload) => {
      const payload = getRequestPayload(data, selectedRole);
      return apiClient.externalPost(`/v1/api/suggestions`, payload);
    },
  });
}

// Mutation to save data to the database
function useSaveToDatabase(selectedRole: string, chatId: string) {
  return useMutation({
    mutationFn: (data: ChatFormPayload) => {
      const payload = getRequestPayload(data, selectedRole);
      return apiClient.post(`/v1/chat/${chatId}`, payload);
    },
  });
}

export function useChatSubmit(selectedRole: string) {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { hasAuthenticated } = useAuth();
  const setChatDetails = useChatStore((state) => state.setChatDetails);
  const setLoading = useChatStore((state) => state.setLoading);

  const chatFormApi = useSubmitChat(selectedRole);
  const fetchSuggestions = useFetchSuggestions(selectedRole);
  // const generateChatId = useGenerateChatId(selectedRole);
  const saveToDatabase = useSaveToDatabase(selectedRole, chatId || "");

  const onSubmit = async (data: ChatFormPayload) => {
    try {
      setLoading(true);

      let resolvedChatId = "";

      console.log("resolvedChatId", resolvedChatId);

      console.log("hasAuthenticated:", hasAuthenticated);
      console.log("chatId:", chatId);
      if (hasAuthenticated && !chatId) {
        try {
          // const chatIdResponse = await generateChatId.mutateAsync(data);
          // resolvedChatId = chatIdResponse?.data?.id;
        } catch (error) {
          console.error("Error generating chat ID:", error);
          throw new Error("Failed to generate a new chat ID.");
        }
      } else {
        resolvedChatId = uuidv4();
      }

      // Step 2: Main Chat API Call
      let generatedText = "";
      try {
        const chatResponse = await chatFormApi.mutateAsync(data);
        generatedText = (chatResponse as any).generatedText;
      } catch (error) {
        console.error("Error submitting main chat:", error);
        throw new Error("Failed to submit chat. Please try again.");
      }

      // Define the chat details structure to match `ChatDetails`
      const chatDetails = {
        chatListName: data.prompt,
        prompts: [
          {
            ...data,
            id: uuidv4(),
            chat_id: resolvedChatId,
            prompt_message_id: uuidv4(),
            timestamp: new Date().toISOString(),
            fileurls: [],
            edited_prompts: null,
          },
        ],
        id: resolvedChatId,
        timestamp: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        messages: [
          {
            id: uuidv4(),
            chat_id: resolvedChatId,
            generatedText,
            prompt_message_id: uuidv4(),
            isRegenerated: false,
            regenerated_responses: [],
          },
        ],
        suggestions: [],
        username: data.username || null,
      };
      setChatDetails(chatDetails);

      // Step 3: Fetch Suggestions
      try {
        const suggestionsResponse = await fetchSuggestions.mutateAsync(data);
        setChatDetails((prevDetails: any) => ({
          ...prevDetails,
          suggestions: suggestionsResponse || [],
        }));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw new Error("Failed to fetch suggestions.");
      }
      // Step 4: Save to Database if Authenticated
      if (hasAuthenticated) {
        try {
          await saveToDatabase.mutateAsync({ ...data });
        } catch (error) {
          console.error("Error saving chat to database:", error);
          throw new Error("Failed to save chat to the database.");
        }
      }

      // Step 5: Navigate to Chat Details Page
      const path = hasAuthenticated
        ? `/chat/${resolvedChatId}`
        : `/chat/session/${resolvedChatId}`;
      navigate(path);
    } catch (error) {
      console.error("Failed to submit chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit };
}
