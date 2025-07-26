import { Link } from "react-router";

import RoundedImage from "../UI/RoundedImage";
import Button from "../UI/Button";
import CardWrapper from "../UI/CardWrapper";
import CharacterStats from "./CharacterStats";

type CharacterDetailProps = {
  avatar: string;
  characterName: string;
  greeting: string;

  likes: number;
  creator: string;
};

function CharacterDetailCard({
  avatar,
  characterName,
  greeting,
  likes,
  creator,
}: CharacterDetailProps) {
  return (
    <CardWrapper>
      <div className="flex gap-2">
        <RoundedImage
          src={avatar}
          alt="character image"
          className="w-[124px] h-[124px] max-md:w-[50px] max-md:h-[50px]"
        />
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold text-lg">{characterName}</p>
            <Link
              to="#"
              className="hover:underline opacity-50 hover:opacity-100 underline-offset-3"
            >
              <p className=" text-sm">By {creator}</p>
            </Link>
          </div>
          <CharacterStats likes={likes} />
          <p className="font-medium text-sm opacity-70 border-l-2 pl-2 border-[#8A38F5]">
            "{greeting}"
          </p>
          <Button className="w-40">Message</Button>
        </div>
      </div>
    </CardWrapper>
  );
}

export default CharacterDetailCard;
