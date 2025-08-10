import clsx from "clsx";
import { useDispatch } from "react-redux";
import { open } from "../../store/UI-slice";

import { FaUser } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";

import { useSignOut } from "../../hooks/useSignOut";
import DropDownMenu from "../UI/dropdown-menu/DropDownMenu";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";

type UserProfileMenuListProps = {
  openMenu: boolean;
  userId?: number;
  onClose: () => void;
  isAdmin?: boolean;
};
function UserProfileMenuList({
  openMenu,
  userId,
  onClose,
}: UserProfileMenuListProps) {
  const { mutate, isPending } = useSignOut();

  const dispatch = useDispatch();

  return (
    <DropDownMenu
      className={clsx(
        "bottom-16",
        openMenu
          ? "max-h-50 opacity-100 scale-100"
          : "max-h-0 opacity-0 scale-95"
      )}
    >
      <DropDownMenuItem
        disabled={isPending}
        link={`/profile/${userId}`}
        onClose={onClose}
      >
        Profile
        <FaUser />
      </DropDownMenuItem>

      <DropDownMenuItem
        disabled={isPending}
        operation={() => dispatch(open("user-settings"))}
        onClose={onClose}
      >
        Settings
        <IoSettingsSharp />
      </DropDownMenuItem>

      <DropDownMenuItem
        operation={() => mutate()}
        disabled={isPending}
        onClose={onClose}
      >
        Log out
        <CgLogOut />
      </DropDownMenuItem>
    </DropDownMenu>
  );
}

export default UserProfileMenuList;
