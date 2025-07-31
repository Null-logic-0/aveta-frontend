import RoundedImage from "../UI/RoundedImage";
import defaultImage from "../../assets/default.jpg";

type ChatMessageItemProps = {
  name: string;
  image: string;
  content: string;
  isUser: boolean;
};

function ChatMessageItem({
  name,
  image,
  content,
  isUser,
}: ChatMessageItemProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex items-center gap-2 ${
          isUser ? "justify-start flex-row-reverse" : ""
        }`}
      >
        <RoundedImage src={image || defaultImage} alt={`${name}-avatar`} />
        <p className="text-[16px] font-semibold text-white">{name}</p>
      </div>
      <div
        className={`p-4 rounded-2xl ${
          isUser ? "bg-[#7F56D9]" : "bg-[#242529]"
        }`}
      >
        <p className="text-[16px] font-medium">{content}</p>
      </div>
    </div>
  );
}

export default ChatMessageItem;
