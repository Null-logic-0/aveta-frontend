import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";

type CharacterStatsProps = {
  likes: number;
  chats?: number;
};

function CharacterStats({ likes }: CharacterStatsProps) {
  return (
    <div className="flex gap-3 items-center">
      <span className="flex items-center gap-2 opacity-55 font-semibold">
        <FaRegHeart />
        {likes}
      </span>
      <span className="flex items-center gap-2 opacity-55 font-semibold">
        <FaRegComment />0
      </span>
    </div>
  );
}

export default CharacterStats;
