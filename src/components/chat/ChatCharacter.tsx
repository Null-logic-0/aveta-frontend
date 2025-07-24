import { NavLink } from "react-router";
import defaultProfile from "../../assets/default.jpg";
import RoundedImage from "../UI/RoundedImage";

type ChatCharacterProps = {
  link: string;
};
function ChatCharacter({ link }: ChatCharacterProps) {
  return (
    <li>
      <NavLink to={link}>
        {({ isActive }) => (
          <div
            className={`flex w-full items-center justify-start p-2 gap-[6px] rounded-[6px] ${
              isActive && "bg-[#3B3A3F]/50"
            } hover:bg-[#3B3A3F]/50`}
          >
            <RoundedImage src={defaultProfile} alt="character-image" />
            <span className="text-sm font-semibold">Salina</span>
          </div>
        )}
      </NavLink>
    </li>
  );
}

export default ChatCharacter;
