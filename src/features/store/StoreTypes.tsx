// types.ts
export interface ChatDetails {
  chatListName?: any;
  prompts?: any[];
  id?: string;
  data?: any;
  timestamp?: string;
  last_modified?: string;
  messages?: any[];
  suggestions?: any[];
  username?: string | null;
}

export interface ChatStore {
  chatDetails?: ChatDetails | null;
  isLoading?: boolean;
  error?: string | null;
  setChatDetails: (
    details: ChatDetails | ((prevDetails: ChatDetails | null) => ChatDetails)
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
