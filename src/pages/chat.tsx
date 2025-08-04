import { useParams } from "react-router";
import { toNumericId } from "../helpers/toNumericId";
import { useFetchChat } from "../hooks/useFetchChat";
import ChatHeader from "../components/chat/ChatHeader";
import ChatPersonaCard from "../components/chat/ChatPersonaCard";
import DialogueForm from "../components/chat/DialogueForm";
import ChatMessages from "../components/chat/ChatMessages";

function Chat() {
  const { chatId } = useParams();

  const numericId = toNumericId(chatId);

  const { data, isPending, isError, error } = useFetchChat({
    id: numericId as number,
  });
  const chatData = data?.data;
  const theme = chatData?.chat.theme;

  if (isError && !isPending) {
    return (
      <p className="h-screen flex items-center text-lg font-semibold text-white/50 justify-center">
        {error?.message || "Oops...something went wrong!"}
      </p>
    );
  }
  if (!numericId) {
    return (
      <p className="h-screen flex items-center justify-center text-lg text-white/50">
        Invalid chat ID
      </p>
    );
  }

  return (
    <>
      <ChatHeader
        characterImage={chatData?.chat.character?.avatar}
        characterName={chatData?.chat?.character?.characterName}
        creator={chatData?.chat?.character?.creator?.userName}
        creatorId={chatData?.chat?.character?.creator?.id}
        characterId={chatData?.chat?.character?.id}
        chatId={numericId!}
        isPending={isPending}
      />
      <div
        className="w-full h-screen flex justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${theme})`,
        }}
      >
        <div className="w-full flex flex-col gap-4  max-w-[705px] px-4 pt-[100px] pb-[62px] overflow-y-auto">
          <ChatPersonaCard
            avatar={chatData?.chat.character?.avatar}
            characterName={chatData?.chat?.character?.characterName}
            creator={chatData?.chat?.character?.creator?.userName}
          />
          <ChatMessages
            greeting={chatData?.chat?.character.greeting}
            name={chatData?.chat?.character?.characterName}
            image={chatData?.chat.character?.avatar}
            chatId={numericId!}
          />
        </div>
      </div>
      <div
        className={`fixed w-full max-md:bg-[#18181b] ${
          theme ? "backdrop-blur-md" : "bg-[#18181b]"
        }  p-2 flex justify-center bottom-0`}
      >
        <DialogueForm
          name={chatData?.chat?.character?.characterName}
          chatId={numericId!}
        />
      </div>
    </>
  );
}

export default Chat;
