import { Empty } from "antd";
import { CharacterInterface } from "../../interfaces/character.interface";
import Spinner from "../UI/spinner/Spinner";
import CharacterCard from "./CharacterCard";

type CharactersListProps = {
  characters: [];
  isLoading: boolean;
};
function CharactersList({ characters, isLoading }: CharactersListProps) {
  if (isLoading) {
    return (
      <li className="flex justify-center items-center w-full mt-6">
        <Spinner />
      </li>
    );
  }

  if (!isLoading && characters.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-6">
        <Empty description="No characters found" />
      </div>
    );
  }

  return (
    <ul className="flex gap-4 justify-start max-lg:justify-center items-center flex-wrap">
      {characters?.map((character: CharacterInterface) => (
        <CharacterCard
          key={character.id}
          characterId={character.id}
          avatar={character.avatar}
          characterName={character.characterName}
          description={character.description}
          creator={character.creator.userName}
          likes={character.likes}
          tags={character.tags}
        />
      ))}
    </ul>
  );
}

export default CharactersList;
