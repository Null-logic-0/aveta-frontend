import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../../store/UI-slice";
import { RootState } from "../../store";

import UserProfileMenu from "../user-profile-menu/UserProfileMenu";
import Settings from "../account/Settings";
import SideBarMenu from "./SideBarMenu";

function SideBar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

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
        <SideBarMenu />
        <UserProfileMenu />
      </div>
      <Settings />
    </>
  );
}

export default SideBar;
