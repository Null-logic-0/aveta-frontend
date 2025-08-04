import { NavLink } from "react-router";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { close } from "../../store/UI-slice";
import { useDeleteChat } from "../../hooks/useDeleteChat";

import ChatMenu from "./ChatMenu";
import defaultProfile from "../../assets/default.jpg";
import CharacterListItem from "../characters/CharacterListItem";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";

type ChatCharacterProps = {
  link: string;
  characterImage: string;
  characterName: string;
  chatId: number;
  onClick?: () => void;
};
function ChatCharacter({
  link,
  characterImage,
  onClick,
  chatId,
  characterName,
}: ChatCharacterProps) {
  const dispatch = useDispatch();
  const { mutate, isPending } = useDeleteChat({ id: chatId });
  const handleClose = () => dispatch(close());

  return (
    <li className="flex items-center  w-full">
      <NavLink to={link} className="w-full" onClick={onClick}>
        {({ isActive }) => (
          <CharacterListItem
            characterName={characterName}
            image={characterImage || defaultProfile}
            isActive={isActive}
          />
        )}
      </NavLink>
      <div className="absolute right-4 max-md:hidden">
        <ChatMenu activeValue={chatId}>
          <DropDownMenuItem
            disabled={isPending}
            onClose={handleClose}
            className="rounded"
            operation={() => mutate()}
          >
            Delete
            <MdDelete />
          </DropDownMenuItem>
        </ChatMenu>
      </div>
    </li>
  );
}

export default ChatCharacter;
