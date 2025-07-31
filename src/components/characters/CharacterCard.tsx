import { Link } from "react-router";
import { textSlicer } from "../../helpers/text-slice";
import defaultProfile from "../../assets/default.jpg";
import RoundedImage from "../UI/RoundedImage";
import Button from "../UI/Button";
import Tags from "./tags/Tags";
import CharacterStats from "./CharacterStats";
import { useCreateChat } from "../../hooks/useCreateChat";

type CharacterProps = {
  characterName: string;
  avatar: string;
  description: string;
  tags: string[];
  creator: string;
  likes: number;
  characterId: number;
};

function CharacterCard({
  characterName,
  avatar,
  creator,
  description,
  characterId,
  tags,
  likes,
}: CharacterProps) {
  const { mutate, isPending } = useCreateChat({ id: characterId });

  return (
    <li className="min-xl:max-w-[330px] max-xl:max-w-[375px] lg:max-w-[325px] sm:max-w-[375px] max-md:max-w-[375px] md:max-w-[300px]  flex flex-col gap-3  p-3 bg-[#1E1E25] rounded-xl">
      <div className="flex items-start  gap-3">
        <RoundedImage
          src={avatar || defaultProfile}
          alt="User profile image"
          className="w-[52px] h-[52px] "
        />
        <div className="flex flex-col gap-2">
          <Link to={`/character/${characterId}`}>
            <p className="font-bold text-lg hover:underline underline-offset-2">
              {characterName}
            </p>
          </Link>
          <p className="font-medium text-sm opacity-50">
            {textSlicer(description, 50)}
          </p>
          <CharacterStats likes={likes} />
          <Tags tags={tags} />
        </div>
      </div>
      <hr className="border-[#3B3A3F] border" />
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium opacity-50">{creator}</span>
        <Button
          className="w-22"
          onClick={() => mutate()}
          isDisabled={isPending}
        >
          Message
        </Button>
      </div>
    </li>
  );
}

export default CharacterCard;
