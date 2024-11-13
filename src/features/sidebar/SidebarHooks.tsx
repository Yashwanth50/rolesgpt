import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";

interface Chat {
  id: string;
  title: string;
}

interface Project {
  id: string;
  name: string;
}

interface Research {
  id: string;
  topic: string;
}

interface File {
  id: string;
  filename: string;
}

// Hooks
export function useGetAllChats(): UseQueryResult<Chat[]> {
  return useQuery<Chat[]>({
    queryKey: ["ChatList"],
    queryFn: () => apiClient.get<Chat[]>(`/chats`),
    // staleTime: 1000 * 60 * 5,
  });
}

export function useGetAllProjects(): UseQueryResult<Project[]> {
  return useQuery<Project[]>({
    queryKey: ["ProjectList"],
    queryFn: () => apiClient.get<Project[]>(`/boards`),
    // staleTime: 1000 * 60 * 5,
  });
}

export function useGetAllResearch(): UseQueryResult<Research[]> {
  return useQuery<Research[]>({
    queryKey: ["ResearchList"],
    queryFn: () => apiClient.get<Research[]>(`/v3/research`),
    // staleTime: 1000 * 60 * 5,
  });
}

export function useGetAllFiles(): UseQueryResult<File[]> {
  return useQuery<File[]>({
    queryKey: ["FileList"],
    queryFn: () => apiClient.get<File[]>(`/v3/files`),
    // staleTime: 1000 * 60 * 5,
  });
}
