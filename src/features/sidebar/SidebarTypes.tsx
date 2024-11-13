// types.ts
export interface Chat {
  id: string;
  title: string;
  // other chat properties
}

export interface Project {
  id: string;
  name: string;
  // other project properties
}

export interface Research {
  id: string;
  topic: string;
  // other research properties
}

export type SectionType = "chats" | "projects" | "researches";
