import { useSignOut } from "../../hooks/useSignOut";
import { FaUser } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import DropDownMenu from "../UI/dropdown-menu/DropDownMenu";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { open } from "../../store/UI-slice";
import { useAuth } from "../../hooks/useAuth";

type UserProfileMenuListProps = {
  openMenu: boolean;
  userId?: number;
  onClose: () => void;
  isAdmin?: boolean;
};
function UserProfileMenuList({
  openMenu,
  userId,
  isAdmin,
  onClose,
}: UserProfileMenuListProps) {
  const { mutate, isPending } = useSignOut();
  const { data } = useAuth();
  const user = data?.data?.data;
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
      {isAdmin && (
        <DropDownMenuItem disabled={isPending} link={`#`} onClose={onClose}>
          Admin panel
          <MdAdminPanelSettings className="text-xl" />
        </DropDownMenuItem>
      )}
      <DropDownMenuItem
        disabled={isPending}
        operation={() => {
          dispatch(open(user?.id));
        }}
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
