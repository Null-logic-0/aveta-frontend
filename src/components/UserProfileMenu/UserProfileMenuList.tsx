import clsx from "clsx";
import UserProfileMenuItem from "./UserProfileMenuItem";
import { useSignOut } from "../../hooks/useSignOut";
import { FaUser } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

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

  return (
    <>
      <div
        className={clsx(
          "overflow-hidden absolute z-10 bottom-16 transition-all duration-300 ease-in-out w-full",
          openMenu
            ? "max-h-50 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        )}
      >
        <ul className="bg-[#1E1E25] w-full rounded-[6px]  p-2 flex flex-col gap-2">
          <UserProfileMenuItem
            disabled={isPending}
            link={`/profile/${userId}`}
            onClose={onClose}
          >
            Profile
            <FaUser />
          </UserProfileMenuItem>
          {isAdmin && (
            <UserProfileMenuItem
              disabled={isPending}
              link={`#`}
              onClose={onClose}
            >
              Admin panel
              <MdAdminPanelSettings className="text-xl" />
            </UserProfileMenuItem>
          )}
          <UserProfileMenuItem disabled={isPending} onClose={onClose}>
            Settings
            <IoSettingsSharp />
          </UserProfileMenuItem>
          <UserProfileMenuItem
            operation={() => mutate()}
            disabled={isPending}
            onClose={onClose}
          >
            Log out
            <CgLogOut />
          </UserProfileMenuItem>
        </ul>
      </div>
    </>
  );
}

export default UserProfileMenuList;
