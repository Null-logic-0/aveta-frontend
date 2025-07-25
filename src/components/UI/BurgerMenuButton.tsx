import { useDispatch, useSelector } from "react-redux";
import { HiMenuAlt2 } from "react-icons/hi";

import { RootState } from "../../store";
import { openSideBar } from "../../store/UI-slice";

function BurgerMenuButton() {
  const dispatch = useDispatch();
  const activeSideBar = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );
  return (
    <div>
      {!activeSideBar && (
        <button
          className="cursor-pointer fixed z-50 top-2 left-2"
          onClick={() => dispatch(openSideBar())}
        >
          <HiMenuAlt2 className="text-2xl" />
        </button>
      )}
    </div>
  );
}

export default BurgerMenuButton;
