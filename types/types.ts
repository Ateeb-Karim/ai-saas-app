export type LINKtype = {
  name: string;
  href: string;
};

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type signInFormType = {
  email: string;
  password: string;
};

export type SignupFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type NavLinksType = {
  title: string;
  href: string;
  icon?: string;
};

export type SignUpPOSTrequest = {
  name: string;
  email: string;
  password: string;
};

export interface Tone {
  title: string;
  active: boolean;
}

export interface Length {
  title: string;
  active: boolean;
}

export type ToolHistoryEnrtry = {
  id: string;
  tool: "blog" | "code" | "email" | "image" | "summarizer";
  input: string;
  output: string;
  timestamp: number;
};

export type ChatHistoryEntry = {
  id: string;
  tool: "chat";
  title: string;
  messages: { role: "user" | "model"; content: string }[];
  timestamp: number;
};

export type HistoryEntry = ToolHistoryEnrtry | ChatHistoryEntry;
