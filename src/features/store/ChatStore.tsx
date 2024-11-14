import { create } from "zustand";
import { ChatDetails, ChatStore } from "./StoreTypes";

export const useChatStore = create<ChatStore>((set) => ({
  // Initial state
  chatDetails: null,
  isLoading: false,
  error: null,

  // Actions
  setChatDetails: (
    details: ChatDetails | ((prevDetails: ChatDetails | null) => ChatDetails)
  ) =>
    set((state) => ({
      chatDetails:
        typeof details === "function"
          ? details(state.chatDetails ?? null) // Ensure state.chatDetails is either ChatDetails or null
          : details,
    })),

  clearChatDetails: () => set({ chatDetails: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));
