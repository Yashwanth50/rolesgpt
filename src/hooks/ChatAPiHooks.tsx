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
// function useSubmitChat(selectedRole: string) {
//   return useMutation({
//     mutationFn: (data: ChatFormPayload) => {
//       const payload = getRequestPayload(data, selectedRole);
//       return apiClient.externalPost(`/v1/api/chat`, payload);
//     },
//   });
// }

function useSubmitChat(selectedRole: string, external_api_url: any) {
  return useMutation({
    mutationFn: async (data: ChatFormPayload) => {
      const payload = getRequestPayload(data, selectedRole);

      // Making a fetch request to support streamed response
      const response = await fetch(`${external_api_url}/v1/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      return response.body; // Return the ReadableStream
    },
  });
}

// Function to process the stream and handle chunks
async function processChatStream(
  stream: ReadableStream<Uint8Array>,
  onChunk: (chunk: string) => void
): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode the chunk
    const chunk = decoder.decode(value, { stream: true });
    fullText += chunk;

    // Call the callback with the new chunk
    onChunk(chunk);
  }

  return fullText;
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
// function useFetchSuggestions(generatedText: any) {
//   return useMutation({
//     mutationFn: (data: ChatFormPayload) => {
//       const payload = generatedText;
//       return apiClient.externalPost(`/v1/api/suggestions`, payload);
//     },
//   });
// }

// Mutation to fetch suggestion questions based on the generated text
function useFetchSuggestions() {
  return useMutation({
    mutationFn: (generatedText: string) => {
      const payload = {
        content: generatedText,
        type: "json",
      };
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
// export function useChatSubmit(selectedRole: string) {
//   const navigate = useNavigate();
//   const { chatId, sessionId } = useParams();
//   const external_api_url = process.env.REACT_APP_EXTERNAL_API_URL;
//   const promptMessageId = uuidv4();

//   const { hasAuthenticated } = useAuth();
//   const setChatDetails = useChatStore((state) => state.setChatDetails);
//   const setLoading = useChatStore((state) => state.setLoading);

//   const chatFormApi = useSubmitChat(selectedRole, external_api_url);
//   const fetchSuggestions = useFetchSuggestions();
//   // const generateChatId = useGenerateChatId(selectedRole);
//   const saveToDatabase = useSaveToDatabase(selectedRole, chatId || "");

//   const onSubmit = async (data: ChatFormPayload) => {
//     try {
//       setLoading(true);

//       let resolvedChatId = "";

//       console.log("resolvedChatId", resolvedChatId);

//       console.log("hasAuthenticated:", hasAuthenticated);
//       console.log("chatId:", chatId);

//       navigate("/chat");
//       if (hasAuthenticated && !chatId) {
//         try {
//           // const chatIdResponse = await generateChatId.mutateAsync(data);
//           // resolvedChatId = chatIdResponse
//         } catch (error) {
//           console.error("Error generating chat ID:", error);
//           throw new Error("Failed to generate a new chat ID.");
//         }
//       } else {
//         resolvedChatId = uuidv4();
//       }

//       // // Step 2: Main Chat API Call
//       // let generatedText = "";
//       // try {
//       //   const chatResponse = await chatFormApi.mutateAsync(data);
//       //   generatedText = (chatResponse as any).generatedText;

//       //   console.log("chatFormApi", chatFormApi.data);
//       // } catch (error) {
//       //   console.error("Error submitting main chat:", error);
//       //   throw new Error("Failed to submit chat. Please try again.");
//       // }

//       // Define the chat details structure to match `ChatDetails`
//       const chatDetails = {
//         chatListName: data.prompt,
//         prompts: [
//           {
//             ...data,
//             // id: uuidv4(),
//             chat_id: resolvedChatId,
//             prompt_message_id: promptMessageId,
//             timestamp: new Date().toISOString(),
//             fileurls: [],
//             edited_prompts: null,
//           },
//         ],
//         id: resolvedChatId,
//         timestamp: new Date().toISOString(),
//         last_modified: new Date().toISOString(),
//         messages: [
//           {
//             // id: uuidv4(),
//             chat_id: resolvedChatId,
//             generatedText: "",
//             prompt_message_id: promptMessageId,
//             isRegenerated: false,
//             regenerated_responses: [],
//           },
//         ],
//         suggestions: [],
//         username: data.username || null,
//       };
//       setChatDetails(chatDetails);

//       const path = hasAuthenticated
//         ? `/chat/${resolvedChatId}`
//         : `/session/${resolvedChatId}`;
//       navigate(path);

//       let generatedText = "";
//       try {
//         const stream = await chatFormApi.mutateAsync(data);

//         // Process the stream
//         generatedText = await processChatStream(stream, (chunk) => {
//           // Update the chat details with each new chunk
//           setChatDetails((prevDetails: any) => {
//             const updatedMessages = [...prevDetails.messages];
//             const lastMessage = {
//               ...updatedMessages[updatedMessages.length - 1],
//             };
//             lastMessage.generatedText += chunk;
//             updatedMessages[updatedMessages.length - 1] = lastMessage;

//             return {
//               ...prevDetails,
//               messages: updatedMessages,
//             };
//           });
//         });
//       } catch (error) {
//         console.error("Error submitting main chat:", error);
//         throw new Error("Failed to submit chat. Please try again.");
//       }

//       try {
//         const suggestionsResponse = await fetchSuggestions.mutateAsync(
//           generatedText
//         );
//         setChatDetails((prevDetails: any) => ({
//           ...prevDetails,
//           suggestions: suggestionsResponse || [],
//         }));
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//         throw new Error("Failed to fetch suggestions.");
//       }

//       // Step 5: Navigate to Chat Details Page
//     } catch (error) {
//       console.error("Failed to submit chat:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { onSubmit };
// }

// export function useChatSubmit(selectedRole: string) {
//   const navigate = useNavigate();
//   const { chatId, sessionId } = useParams();
//   const external_api_url = process.env.REACT_APP_EXTERNAL_API_URL;
//   const promptMessageId = uuidv4();

//   const { hasAuthenticated } = useAuth();
//   const setChatDetails = useChatStore((state) => state.setChatDetails);
//   const setLoading = useChatStore((state) => state.setLoading);

//   const chatFormApi = useSubmitChat(selectedRole, external_api_url);
//   const fetchSuggestions = useFetchSuggestions();
//   const saveToDatabase = useSaveToDatabase(selectedRole, chatId || "");

//   const onSubmit = async (data: ChatFormPayload) => {
//     try {
//       setLoading(true);

//       let resolvedChatId = chatId || sessionId || uuidv4(); // Use existing chatId or sessionId if available, else generate new ID

//       // Define a new prompt and message to add to chatDetails
//       const newPrompt = {
//         ...data,
//         chat_id: resolvedChatId,
//         prompt_message_id: promptMessageId,
//         timestamp: new Date().toISOString(),
//         fileurls: [],
//         edited_prompts: null,
//       };

//       const newMessage = {
//         chat_id: resolvedChatId,
//         generatedText: "",
//         prompt_message_id: promptMessageId,
//         isRegenerated: false,
//         regenerated_responses: [],
//       };

//       // Update existing chat details or create new chat details
//       setChatDetails((prevDetails: any) => {
//         if (prevDetails && prevDetails.id === resolvedChatId) {
//           // If chat details already exist, append new prompt and message
//           return {
//             ...prevDetails,
//             prompts: [...prevDetails.prompts, newPrompt],
//             messages: [...prevDetails.messages, newMessage],
//             last_modified: new Date().toISOString(),
//           };
//         } else {
//           // If chat details don't exist, create new structure
//           return {
//             chatListName: data.prompt,
//             prompts: [newPrompt],
//             id: resolvedChatId,
//             timestamp: new Date().toISOString(),
//             last_modified: new Date().toISOString(),
//             messages: [newMessage],
//             suggestions: [],
//             username: data.username || null,
//           };
//         }
//       });

//       // Only navigate if there's no existing chat or session ID
//       if (!chatId && !sessionId) {
//         const path = hasAuthenticated
//           ? `/chat/${resolvedChatId}`
//           : `/session/${resolvedChatId}`;
//         navigate(path);
//       }

//       let generatedText = "";
//       try {
//         const stream = await chatFormApi.mutateAsync(data);

//         // Process the stream and update generatedText incrementally
//         generatedText = await processChatStream(stream, (chunk) => {
//           setChatDetails((prevDetails: any) => {
//             const updatedMessages = [...prevDetails.messages];
//             const lastMessage = {
//               ...updatedMessages[updatedMessages.length - 1],
//             };
//             lastMessage.generatedText += chunk;
//             updatedMessages[updatedMessages.length - 1] = lastMessage;

//             return {
//               ...prevDetails,
//               messages: updatedMessages,
//             };
//           });
//         });
//       } catch (error) {
//         console.error("Error submitting main chat:", error);
//         throw new Error("Failed to submit chat. Please try again.");
//       }

//       // Fetch suggestions based on the generated text
//       try {
//         const suggestionsResponse = await fetchSuggestions.mutateAsync(
//           generatedText
//         );

//         // Create a new suggestion object
//         const newSuggestion = {
//           chat_id: resolvedChatId,
//           suggestion_text: suggestionsResponse,
//           prompt_message_id: promptMessageId,
//         };

//         // Update ChatDetails with the new suggestion
//         setChatDetails((prevDetails: any) => ({
//           ...prevDetails,
//           suggestions: [...(prevDetails?.suggestions || []), newSuggestion], // Correctly spread the existing suggestions
//         }));

//         console.log("suggestionsResponse", suggestionsResponse);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//         throw new Error("Failed to fetch suggestions.");
//       }
//     } catch (error) {
//       console.error("Failed to submit chat:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { onSubmit };
// }

export function useChatSubmit(selectedRole: string) {
  const navigate = useNavigate();
  const { chatId, sessionId } = useParams();
  const external_api_url = process.env.REACT_APP_EXTERNAL_API_URL;
  const promptMessageId = uuidv4();

  const { hasAuthenticated } = useAuth();
  const setChatDetails = useChatStore((state) => state.setChatDetails);
  const setLoading = useChatStore((state) => state.setLoading);

  const chatFormApi = useSubmitChat(selectedRole, external_api_url);
  const fetchSuggestions = useFetchSuggestions();
  const saveToDatabase = useSaveToDatabase(selectedRole, chatId || "");

  const onSubmit = async (data: ChatFormPayload) => {
    try {
      setLoading(true);

      let resolvedChatId = chatId || sessionId || uuidv4(); // Use existing chatId or sessionId if available, else generate new ID

      // Define a new prompt and message to add to chatDetails
      const newPrompt = {
        ...data,
        chat_id: resolvedChatId,
        prompt_message_id: promptMessageId,
        timestamp: new Date().toISOString(),
        fileurls: [],
        edited_prompts: null,
      };

      const newMessage = {
        chat_id: resolvedChatId,
        generatedText: "",
        prompt_message_id: promptMessageId,
        isRegenerated: false,
        regenerated_responses: [],
      };

      // Update existing chat details or create new chat details
      setChatDetails((prevDetails: any) => {
        if (prevDetails && prevDetails.id === resolvedChatId) {
          // If chat details already exist, append new prompt and message
          return {
            ...prevDetails,
            prompts: [...prevDetails.prompts, newPrompt],
            messages: [...prevDetails.messages, newMessage],
            last_modified: new Date().toISOString(),
          };
        } else {
          // If chat details don't exist, create new structure
          return {
            chatListName: data.prompt,
            prompts: [newPrompt],
            id: resolvedChatId,
            timestamp: new Date().toISOString(),
            last_modified: new Date().toISOString(),
            messages: [newMessage],
            suggestions: [],
            username: data.username || null,
          };
        }
      });

      // Only navigate if there's no existing chat or session ID
      if (!chatId && !sessionId) {
        const path = hasAuthenticated
          ? `/chat/${resolvedChatId}`
          : `/session/${resolvedChatId}`;
        navigate(path);
      }

      let generatedText = "";
      try {
        const stream = await chatFormApi.mutateAsync(data);

        // Process the stream and update generatedText incrementally
        generatedText = await processChatStream(stream, (chunk) => {
          setChatDetails((prevDetails: any) => {
            const updatedMessages = [...prevDetails.messages];
            const lastMessage = {
              ...updatedMessages[updatedMessages.length - 1],
            };
            lastMessage.generatedText += chunk;
            updatedMessages[updatedMessages.length - 1] = lastMessage;

            return {
              ...prevDetails,
              messages: updatedMessages,
            };
          });
        });
      } catch (error) {
        console.error("Error submitting main chat:", error);
        throw new Error("Failed to submit chat. Please try again.");
      }

      // Fetch suggestions based on the generated text
      try {
        const suggestionsResponse = await fetchSuggestions.mutateAsync(
          generatedText
        );

        // Create a new suggestion object
        const newSuggestion = {
          chat_id: resolvedChatId,
          suggestion_text: suggestionsResponse, // Assuming it's a single string
          prompt_message_id: promptMessageId,
        };

        // Update ChatDetails with the new suggestion
        setChatDetails((prevDetails: any) => ({
          ...prevDetails,
          suggestions: [
            ...(prevDetails?.suggestions || []), // Ensure suggestions are initialized
            newSuggestion, // Append the new suggestion
          ],
        }));

        console.log("Formatted Suggestion Response:", newSuggestion);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw new Error("Failed to fetch suggestions.");
      }
    } catch (error) {
      console.error("Failed to submit chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit };
}
