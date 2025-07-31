export interface UpdateChatThemeInterface {
  theme: string;
}

export interface ChatInterface {
  id: number;
  character: {
    id: number;
    characterName: string;
    avatar: string;
    greeting: string;
  };
  content: string;
  theme: string;
  user: {
    id: number;
    userName: string;
    profileImage: string;
  };
  optimistic: {
    id: number;
    userName: string;
    profileImage: string;
  };
  isTyping: boolean;
  createdAt: string;
}

export interface ChatMessagesCache {
  data: ChatInterface[];
}

export interface SendMessageInterface {
  content: string;
}
