import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

import ChatLoader from "./ChatLoader";
import ChatMessageItem from "./ChatMessageItem";

import TypeLoader from "../UI/TypeLoader";
import { ChatInterface } from "../../interfaces/chat.interface";
import { useFetchChatMessages } from "../../hooks/useFetchChatMessages";

type ChatMessagesProps = {
  name: string;
  image: string;
  greeting: string;
  chatId: number;
};

function ChatMessages({ name, image, greeting, chatId }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { data, isError, error, isPending } = useFetchChatMessages({
    id: chatId,
  });
  const messages = data?.data;

  useEffect(() => {
    if (isError && !isPending) {
      toast.error(error?.message || "Oops...Something went wrong");
    }
  }, [isError, error, isPending]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isPending && !isError) {
    const totalLoaders = 10;
    const directions = Array.from({ length: totalLoaders }, () =>
      Math.random() > 0.5 ? "start" : "end"
    );

    return (
      <div className="flex flex-col w-full gap-2">
        {directions.map((dir, i) => (
          <div
            key={`loader-${i}`}
            className={`flex w-full ${
              dir === "start" ? "justify-start" : "justify-end"
            }`}
          >
            <ChatLoader
              className={`w-60 ${dir === "end" ? "flex-row-reverse" : ""}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col w-full gap-4 max-h-[80vh] overflow-y-auto px-2"
    >
      <div className="flex justify-start w-full">
        <ChatMessageItem
          name={name}
          image={image}
          content={greeting}
          isUser={false}
        />
      </div>

      {messages &&
        messages
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
          .map((message: ChatInterface) => {
            const isUser = !!message.user;
            if (message.isTyping) {
              return (
                <div key={message.id} className="flex w-full justify-start">
                  <TypeLoader />
                </div>
              );
            }
            return (
              <div
                key={message.id}
                className={`flex w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <ChatMessageItem
                  name={
                    isUser
                      ? message.user.userName
                      : message.character?.characterName
                  }
                  image={
                    isUser
                      ? message.user.profileImage
                      : message.character?.avatar
                  }
                  content={message.content}
                  isUser={isUser}
                />
              </div>
            );
          })}
    </div>
  );
}

export default ChatMessages;
