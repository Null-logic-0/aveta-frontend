import RoundedImage from "../UI/RoundedImage";
import defaultImage from "../../assets/default.jpg";
import Button from "../UI/Button";
import CardWrapper from "../UI/CardWrapper";
import CharacterStats from "./CharacterStats";
import CharacterMenuList from "./CharacterMenuList";
import { Link } from "react-router";
import { useCreateChat } from "../../hooks/useCreateChat";

type CharacterDetailProps = {
  characterId: number;
  creatorId: number;
  loggedInUserId?: number;
  avatar: string;
  characterName: string;
  greeting: string;
  likes: number;
  creator: string;
};

function CharacterDetailCard({
  avatar,
  characterName,
  creatorId,
  loggedInUserId,
  characterId,
  greeting,
  likes,
  creator,
}: CharacterDetailProps) {
  const { mutate, isPending } = useCreateChat({ id: characterId });

  return (
    <CardWrapper>
      {creatorId === loggedInUserId && (
        <CharacterMenuList characterId={characterId} />
      )}
      <div className="flex gap-2">
        <RoundedImage
          src={avatar || defaultImage}
          alt="character image"
          className="w-[124px] h-[124px] max-md:w-[50px] max-md:h-[50px]"
        />
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold text-lg">{characterName}</p>

            <Link to={`/profile/${creatorId}`}>
              <p className="text-sm hover:underline cursor-pointer">
                By {creator}
              </p>
            </Link>
          </div>
          <CharacterStats likes={likes} />
          <p className="font-medium text-sm opacity-70 border-l-2 pl-2 border-[#8A38F5]">
            "{greeting}"
          </p>
          <Button
            onClick={() => mutate()}
            isDisabled={isPending}
            className="w-40"
          >
            Message
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
}

export default CharacterDetailCard;
