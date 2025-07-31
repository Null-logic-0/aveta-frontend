import { useFetchChats } from "../../hooks/useFetchChats";
import { ChatInterface } from "../../interfaces/chat.interface";
import ChatCharacter from "./ChatCharacter";
import ChatLoader from "./ChatLoader";

function ChatCharacters() {
  const { data, isError, error, isPending } = useFetchChats();
  const chats = data?.data;

  return (
    <ul className="w-full py-2  flex flex-col gap-2 overflow-y-scroll h-[80%] max-md:h-[50%]">
      {!isError &&
        !isPending &&
        chats?.map((chat: ChatInterface) => (
          <ChatCharacter
            key={chat.id}
            chatId={chat.id}
            characterImage={chat?.character?.avatar}
            characterName={chat?.character?.characterName}
            link={`/chat/${chat.id}`}
          />
        ))}
      {isError && !isPending && (
        <li>
          <p className="text-sm text-center text-white/50 font-semibold">
            {error?.message || "Oops..something went wrong!"}
          </p>
        </li>
      )}
      {isPending && !isError && (
        <>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <ChatLoader key={i} />
            ))}
        </>
      )}
    </ul>
  );
}

export default ChatCharacters;
