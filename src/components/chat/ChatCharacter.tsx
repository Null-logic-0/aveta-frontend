import { NavLink } from "react-router";
import defaultProfile from "../../assets/default.jpg";
import CharacterListItem from "../characters/CharacterListItem";

type ChatCharacterProps = {
  link: string;
};
function ChatCharacter({ link }: ChatCharacterProps) {
  return (
    <li>
      <NavLink to={link}>
        {({ isActive }) => (
          <CharacterListItem
            characterName="Salina"
            image={defaultProfile}
            isActive={isActive}
          />
        )}
      </NavLink>
    </li>
  );
}

export default ChatCharacter;
