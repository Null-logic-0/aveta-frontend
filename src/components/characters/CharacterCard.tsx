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
    <li className="w-full max-w-[478px]  min-w-[205px] flex flex-col justify-between gap-3 p-3 bg-[#1E1E25] rounded-xl">
      <div className="flex items-start gap-3">
        <RoundedImage
          src={avatar || defaultProfile}
          alt="User profile image"
          className="w-[52px] h-[52px] "
        />
        <div className="flex flex-col  gap-2">
          <Link to={`/character/${characterId}`}>
            <p className="font-bold text-lg hover:underline underline-offset-2">
              {textSlicer(characterName, 20)}
            </p>
          </Link>
          <p className="font-medium text-sm opacity-50">
            {textSlicer(description, 40)}
          </p>
          <CharacterStats likes={likes} />
          <Tags tags={tags} />
        </div>
      </div>
      <hr className="border-[#3B3A3F] border" />
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium opacity-50">{creator}</span>
        <Button
          onClick={() => mutate()}
          isDisabled={isPending}
          className="w-30"
        >
          Message
        </Button>
      </div>
    </li>
  );
}

export default CharacterCard;
