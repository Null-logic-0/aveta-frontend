import Empty from "../UI/Empty";
import Spinner from "../UI/spinner/Spinner";
import CharacterCard from "./CharacterCard";
import { CharacterInterface } from "../../interfaces/character.interface";

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
    return <Empty description="Characters not found!" />;
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
