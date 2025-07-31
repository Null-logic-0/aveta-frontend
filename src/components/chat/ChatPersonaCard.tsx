import RoundedImage from "../UI/RoundedImage";
import defaultImage from "../../assets/default.jpg";

type ChatPersonaCardProps = {
  avatar: string;
  characterName: string;
  creator: string;
};

function ChatPersonaCard({
  characterName,
  creator,
  avatar,
}: ChatPersonaCardProps) {
  return (
    <div className="flex flex-col justify-center  items-center">
      <RoundedImage
        src={avatar || defaultImage}
        alt="character avatar"
        className="w-20 h-20"
      />
      <p className="text-lg text-center font-bold text-white">
        {characterName}
      </p>
      <p className="text-sm text-center font-semibold text-white/50">
        By {creator}
      </p>
    </div>
  );
}

export default ChatPersonaCard;
