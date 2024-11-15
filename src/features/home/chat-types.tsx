export type ChatFormPayload = {
  Function: string;
  Language: string;
  Role: string;
  context: string;
  description: string;
  kpis: boolean | string | null;
  llm: string;
  okrs: boolean | string | null;
  prompt: string;
  template: string;
  uid: string;
  username: string;
};

export type ChatFormProps = {
  selectedRole: string;
};
