import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import Button from "../UI/Button";
import Logo from "../UI/Logo";
import UserProfile from "../UserProfileMenu/UserProfile";
import { closeSideBar } from "../../store/UI-slice";
import { RootState } from "../../store";
import ChatCharacters from "../chat/ChatCharacters";

function SideBar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50  z-40 md:hidden"
          onClick={() => dispatch(closeSideBar())}
        />
      )}

      <div
        className={`bg-[#131316] h-full fixed left-0 top-0 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out 
          max-w-[276px] w-full max-md:max-w-[256px] px-2 py-6
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 `}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center ">
            <Logo />
            <button
              className="cursor-pointer md:hidden"
              onClick={() => {
                dispatch(closeSideBar());
              }}
            >
              <MdArrowBackIosNew className="text-lg" />
            </button>
          </div>

          <Button buttonType="outline" className="w-[50%]">
            <FaPlus />
            Create
          </Button>
          <hr className="opacity-30" />
          <ChatCharacters />
        </div>
        <UserProfile />
      </div>
    </>
  );
}

export default SideBar;
