import Empty from "../UI/Empty";
import Spinner from "../UI/spinner/Spinner";
import CharacterCard from "./CharacterCard";
import { CharacterInterface } from "../../interfaces/character.interface";
import AppResult from "../UI/AppResult";

type CharactersListProps = {
  characters: CharacterInterface[];
  isLoading: boolean;
  isError: boolean;
  errMessage: string;
};
function CharactersList({
  characters,
  isLoading,
  isError,
  errMessage,
}: CharactersListProps) {
  if (isLoading && !isError) {
    return (
      <div className="flex justify-center items-center w-full mt-6">
        <Spinner />
      </div>
    );
  }
  if (!isLoading && isError) {
    return (
      <div className="flex justify-center items-center w-full mt-6">
        <AppResult isError={isError} message={errMessage} />
      </div>
    );
  }

  if (!isLoading && characters.length === 0) {
    return <Empty description="Characters not found!" />;
  }

  return (
    <ul className="flex gap-4 justify-start max-lg:justify-center items-center flex-wrap">
      {characters?.map((character) => (
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
