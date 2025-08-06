import { useAuth } from "../hooks/useAuth";
import { Link, useParams } from "react-router";
import { toNumericId } from "../helpers/toNumericId";
import { useFetchCharacter } from "../hooks/useFetchCharacter";
import { useFetchAllCharacters } from "../hooks/useFetchAllCharacters";
import { CharacterInterface } from "../interfaces/character.interface";

import Empty from "../components/UI/Empty";
import Tags from "../components/characters/tags/Tags";
import CardWrapper from "../components/UI/CardWrapper";
import Spinner from "../components/UI/Spinner/Spinner";
import ReturnButton from "../components/UI/ReturnButton";
import CharacterListItem from "../components/characters/CharacterListItem";
import CharacterDetailCard from "../components/characters/CharacterDetailCard";

function CharacterDetails() {
  const { characterId } = useParams();
  const { data: currentUser } = useAuth();

  const user = currentUser?.data?.data;

  const numericId = toNumericId(characterId);

  const { data: characterData, isLoading } = useFetchCharacter({
    id: numericId as number,
  });

  const character = characterData?.data?.data;
  const characterTags = Array.isArray(character?.tags) ? character.tags : [];

  const { data: charactersData } = useFetchAllCharacters({
    tags: characterTags,
  });

  const characters = charactersData?.data?.data;

  if (!numericId && !isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Empty description="Invalid character ID" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center">
      <ReturnButton />
      <div className="flex flex-col gap-4 w-full mt-6 items-center">
        <CharacterDetailCard
          loggedInUserId={user?.id}
          creatorId={character?.creator?.id}
          characterId={character?.id}
          avatar={character?.avatar}
          characterName={character?.characterName}
          creator={character?.creator?.userName}
          greeting={character?.greeting}
          likes={character?.likes}
        />
        <CardWrapper heading={`About ${character?.characterName}`}>
          <p className="text-sm opacity-60 font-medium">
            {character?.description}
          </p>
        </CardWrapper>

        <CardWrapper heading="Personality Tags">
          <Tags tags={character?.tags} />
        </CardWrapper>
        {characters?.length > 0 && character.id === characterId && (
          <CardWrapper heading="Similar Characters">
            <ul className="max-h-[150px]">
              {characters?.map((characterInfo: CharacterInterface) => (
                <Link
                  key={characterInfo.id}
                  to={`/character/${characterInfo.id}`}
                >
                  <CharacterListItem
                    characterName={characterInfo.characterName}
                    image={characterInfo.avatar}
                  />
                </Link>
              ))}
            </ul>
          </CardWrapper>
        )}
      </div>
    </div>
  );
}

export default CharacterDetails;
