import clsx from "clsx";
import { useEffect, useRef } from "react";
import { RootState } from "../../store";
import { close, open } from "../../store/UI-slice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCharacter } from "../../hooks/useDeleteCharacter";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";

import DropDownMenu from "../UI/dropdown-menu/DropDownMenu";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";

type CharacterMenuList = {
  characterId: number;
};

function CharacterMenuList({ characterId }: CharacterMenuList) {
  const dispatch = useDispatch();
  const { mutate, isPending } = useDeleteCharacter({ characterId });
  const activeMenu = useSelector((state: RootState) => state.ui.active);
  const isOpen = activeMenu === "character-menu";
  const menuRef = useRef<HTMLDivElement | null>(null);

  function handleOpen() {
    dispatch(open("character-menu"));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(close());
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <div className="flex justify-end relative" ref={menuRef}>
      <button onClick={handleOpen} className="cursor-pointer">
        <RxDotsHorizontal className="text-xl" />
      </button>

      <div
        className={clsx(
          "absolute right-0 top-6 z-50 transition-all duration-300 ease-in-out transform origin-top w-48",
          isOpen
            ? "opacity-100 scale-100 max-h-[500px] pointer-events-auto"
            : "opacity-0 scale-95 max-h-0 pointer-events-none"
        )}
      >
        <DropDownMenu className="border border-[#3B3A3F] rounded-xl bg-[#1E1E25]">
          <DropDownMenuItem
            link={`/update-character/${characterId}`}
            onClose={() => dispatch(close())}
          >
            Update
            <FaEdit />
          </DropDownMenuItem>
          <DropDownMenuItem
            disabled={isPending}
            operation={() => mutate()}
            onClose={() => dispatch(close())}
            className="text-red-500"
          >
            Delete
            <MdDelete />
          </DropDownMenuItem>
        </DropDownMenu>
      </div>
    </div>
  );
}

export default CharacterMenuList;
