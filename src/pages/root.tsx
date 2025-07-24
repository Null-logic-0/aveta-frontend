import { Outlet } from "react-router";
import { HiMenuAlt2 } from "react-icons/hi";
import SideBar from "../components/side-bar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { openSideBar } from "../store/UI-slice";
import { RootState } from "../store";

function RootLayout() {
  const dispatch = useDispatch();
  const activeSideBar = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );

  return (
    <>
      {!activeSideBar && (
        <button
          className="cursor-pointer fixed z-50 top-2 left-2"
          onClick={() => dispatch(openSideBar())}
        >
          <HiMenuAlt2 className="text-2xl" />
        </button>
      )}
      <SideBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
