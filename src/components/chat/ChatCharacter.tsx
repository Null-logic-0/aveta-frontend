import { NavLink } from "react-router";
import defaultProfile from "../../assets/default.jpg";

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
            <img
              src={defaultProfile}
              alt="character-image"
              className="rounded-full w-[36px] h-[36px] object-cover"
            />
            <span className="text-sm font-semibold">Salina</span>
          </div>
        )}
      </NavLink>
    </li>
  );
}

export default ChatCharacter;
