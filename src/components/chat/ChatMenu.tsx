import { RootState } from "../../store";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { close, open } from "../../store/UI-slice";
import { RxDotsHorizontal } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "../UI/dropdown-menu/DropDownMenu";

type ChatProps = {
  activeValue: number | string;
  children: React.ReactNode;
  className?: string;
};

function ChatMenu({ activeValue, children, className }: ChatProps) {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.ui.active);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => dispatch(open(activeValue));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(close());
      }
    }

    if (active === activeValue) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, activeValue, dispatch]);

  return (
    <div ref={menuRef} className="relative">
      <button className="z-10 cursor-pointer" onClick={handleOpen}>
        <RxDotsHorizontal />
      </button>
      {active === activeValue && (
        <DropDownMenu
          className={twMerge(
            "w-30 border border-[#3B3A3F] rounded-xl",
            className
          )}
        >
          {children}
        </DropDownMenu>
      )}
    </div>
  );
}

export default ChatMenu;
