import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import RoundedImage from "../UI/RoundedImage";
import defaultProfile from "../../assets/default.jpg";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import UserProfileMenuList from "./UserProfileMenuList";
import { closeSideBar } from "../../store/UI-slice";

function UserProfileMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const { data } = useAuth();
  const dispatch = useDispatch();
  const user = data?.data.data;
  const isPaid = user?.isPaid;

  return (
    <div className="flex flex-col items-center gap-2 fixed bottom-4 w-full max-md:max-w-[240px] max-w-[260px] z-10">
      <UserProfileMenuList
        openMenu={openMenu}
        userId={user?.id}
        onClose={() => {
          setOpenMenu(false);
          dispatch(closeSideBar());
        }}
      />
      <div
        className={`flex w-full justify-between items-center py-2 px-2 bg-[#1E1E25] ${
          isPaid
            ? "bg-gradient-to-r from-[#FF4DC3]/50 to-[#8A38F5]/50 "
            : "border border-[#3B3A3F]"
        }  rounded-[6px]`}
      >
        <div className="flex items-center justify-center gap-[6px]">
          <RoundedImage
            src={user?.profileImage || defaultProfile}
            alt="User profile image"
          />
          <p className="flex flex-col  text-sm font-semibold">
            <span>{user?.userName}</span>
            <span className="opacity-50 text-xs">{user?.email}</span>
          </p>
        </div>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="transition-transform duration-300 cursor-pointer"
        >
          <MdOutlineKeyboardArrowUp
            className={`text-2xl transform transition-transform duration-300 ${
              openMenu ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default UserProfileMenu;
