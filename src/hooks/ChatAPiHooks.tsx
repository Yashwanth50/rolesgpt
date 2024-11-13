import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/features/api/api-client";
import { ChatFormPayload } from "src/features/home/chat-types";

function getRequestPayload(data: ChatFormPayload, selectedRole: string) {
  const payload = {
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
  return payload;
}

function getPrompt(data: ChatFormPayload, selectedRole: string): string {
  const { prompt } = getRequestPayload(data, selectedRole);
  return prompt;
}

export function useChats(selectedRole?: any) {
  return useMutation({
    mutationFn: (data: ChatFormPayload) => {
      const payload = getRequestPayload(data, selectedRole);

      return apiClient.externalPost(`/v1/api/chat`, payload);
    },
  });
}

export function useGenerateId(selectedRole?: any) {
  return useMutation({
    mutationFn: (data: ChatFormPayload) => {
      const chatListName = getPrompt(data, selectedRole);
      console.log(chatListName);

      return apiClient.post(`/v3/chat`, chatListName);
    },
  });
}

export function useSuggestion(selectedRole?: any) {
  return useMutation({
    mutationFn: (data: ChatFormPayload) => {
      const payload = getRequestPayload(data, selectedRole);

      return apiClient.externalPost(`v1/api/suggestions`, payload);
    },
  });
}

// function useSavingDatabase(selectedRole?: any) {
//     return useMutation({
//       mutationFn: (data: ChatFormPayload) => {
//         const payload = getRequestPayload(data, selectedRole);

//         return apiClient.post(`v1/chat/${id}`, payload);
//       },
//     });
//   }
