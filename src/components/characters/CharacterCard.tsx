import defaultProfile from "../../assets/default.jpg";
import RoundedImage from "../UI/RoundedImage";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import Button from "../UI/Button";
import { textSlicer } from "../../helpers/text-slice";
import Tags from "./tags/Tags";
import { Link } from "react-router";

function CharacterCard() {
  return (
    <div className="max-w-[342px] flex flex-col gap-3 w-full p-3 bg-[#1E1E25] rounded-xl">
      <div className="flex items-start justify-center gap-3">
        <RoundedImage
          src={defaultProfile}
          alt="User profile image"
          className="w-[52px] h-[52px]"
        />
        <div className="flex flex-col gap-2">
          <Link to="#">
            <p className="font-bold text-lg hover:underline underline-offset-2">
              Salina
            </p>
          </Link>
          <p className="font-medium text-sm opacity-50">
            {textSlicer(
              `Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was in the 1960s with the
            release of sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like PageMaker including versions
            of Lorem Ipsum.`,
              50
            )}
          </p>
          <div className="flex gap-3 items-center">
            <span className="flex items-center gap-2 opacity-55 font-semibold">
              <FaRegHeart />
              11287
            </span>
            <span className="flex items-center gap-2 opacity-55 font-semibold">
              <FaRegComment />
              12304
            </span>
          </div>
          <Tags />
        </div>
      </div>
      <hr className="border-[#3B3A3F] border" />
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium opacity-50">by John Doe</span>
        <Button className="w-22 ">Message</Button>
      </div>
    </div>
  );
}

export default CharacterCard;
