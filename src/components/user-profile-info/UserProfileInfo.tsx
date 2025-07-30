import RoundedImage from "../UI/RoundedImage";
import defaultImage from "../../assets/default.jpg";
import Button from "../UI/Button";
import { FaRegEdit } from "react-icons/fa";

type UserProfileProps = {
  userName: string;
  image: string;
  onOpenSettings: () => void;
  isCurrentUser: boolean;
};

function UserProfileInfo({
  userName,
  image,
  isCurrentUser,
  onOpenSettings,
}: UserProfileProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <RoundedImage
        src={image || defaultImage}
        alt="User profile image"
        className="w-[124px] h-[124px]"
      />
      <p className="font-semibold text-lg">{userName}</p>
      {isCurrentUser && (
        <Button buttonType="outline" onClick={onOpenSettings}>
          <FaRegEdit />
          Settings
        </Button>
      )}
    </div>
  );
}

export default UserProfileInfo;
