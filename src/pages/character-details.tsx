import { Empty } from "antd";
import { Link, useParams } from "react-router";
import { useFetchCharacter } from "../hooks/useFetchCharacter";
import CharacterDetailCard from "../components/characters/CharacterDetailCard";
import CardWrapper from "../components/UI/CardWrapper";
import Tags from "../components/characters/tags/Tags";
import CharacterListItem from "../components/characters/CharacterListItem";
import { useFetchAllCharacters } from "../hooks/useFetchAllCharacters";
import { CharacterInterface } from "../interfaces/character.interface";
import ReturnButton from "../components/UI/ReturnButton";
import Spinner from "../components/UI/spinner/Spinner";
import { toNumericId } from "../helpers/toNumericId";
import { useAuth } from "../hooks/useAuth";

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
    <>
      <ReturnButton />
      <div className="flex flex-col gap-6 mt-6">
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
        {characters?.length > 0 && character.id === characterId && (
          <CardWrapper heading="Similar Characters">
            <ul className="max-h-[150px]">
              {characters?.map((characterInfo: CharacterInterface) => (
                <Link key={characterInfo.id} to={`/${characterInfo.id}`}>
                  <CharacterListItem
                    characterName={characterInfo.characterName}
                    image={characterInfo.avatar}
                  />
                </Link>
              ))}
            </ul>
          </CardWrapper>
        )}
        <CardWrapper heading="Personality Tags">
          <Tags tags={character?.tags} />
        </CardWrapper>
      </div>
    </>
  );
}

export default CharacterDetails;
