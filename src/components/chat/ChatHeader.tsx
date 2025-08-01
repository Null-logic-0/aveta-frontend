import { Link, useNavigate } from "react-router";
import ChatLoader from "./ChatLoader";
import RoundedImage from "../UI/RoundedImage";
import ChatActionsBar from "./ChatActionsBar";

import defaultImage from "../../assets/default.jpg";
import { MdOutlineArrowBackIos } from "react-icons/md";

type ChatHeaderProps = {
  characterImage: string;
  characterName: string;
  isPending: boolean;
  creator: string;
  creatorId: number;
  characterId: number;
  chatId: number;
};
function ChatHeader({
  characterImage,
  isPending,
  characterName,
  characterId,
  creator,
  chatId,
  creatorId,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-[#1E1E25] fixed top-0 z-10 ml-[275px] max-md:ml-0 pl-4 pr-75 max-md:px-4 py-2 max-md:pl-10 border-b border-[#3B3A3F] flex justify-between items-center w-full ">
      {isPending ? (
        <ChatLoader className="w-50" isBig />
      ) : (
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer text-xl"
            onClick={() => navigate(-1)}
          >
            <MdOutlineArrowBackIos />
          </button>
          <Link to={`/character/${characterId}`}>
            <RoundedImage
              src={characterImage}
              alt="character avatar"
              className="w-12 h-12"
            />
          </Link>
          <div>
            <p className="text-sm font-semibold">
              {characterName || defaultImage}
            </p>
            <Link to={`/profile/${creatorId}`}>
              <span className="text-sm cursor-pointer font-medium opacity-50 hover:opacity-100 hover:underline">
                {creator}
              </span>
            </Link>
          </div>
        </div>
      )}
      <ChatActionsBar
        characterId={characterId}
        chatId={chatId}
        activeValue={`${chatId}-chat`}
      />
    </header>
  );
}

export default ChatHeader;
