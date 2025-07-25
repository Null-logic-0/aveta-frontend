import UserProfileMenuItem from "./UserProfileMenuItem";
import { IoSettingsSharp } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { useSignOut } from "../../hooks/useSignOut";
import clsx from "clsx";

function UserProfileMenuList({ openMenu }: { openMenu: boolean }) {
  const { mutate, isPending } = useSignOut();

  return (
    <>
      <div
        className={clsx(
          "overflow-hidden absolute z-10 bottom-16 transition-all duration-300 ease-in-out w-full",
          openMenu
            ? "max-h-40 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        )}
      >
        <ul className="bg-[#1E1E25] w-full rounded-[6px]  p-2 flex flex-col gap-2">
          <UserProfileMenuItem disabled={isPending}>
            Settings
            <IoSettingsSharp />
          </UserProfileMenuItem>
          <UserProfileMenuItem operation={() => mutate()} disabled={isPending}>
            Log out
            <CgLogOut />
          </UserProfileMenuItem>
        </ul>
      </div>
    </>
  );
}

export default UserProfileMenuList;
