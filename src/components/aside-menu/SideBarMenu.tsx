import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { closeSideBar } from "../../store/UI-slice";

import { FaPlus } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";

import Button from "../UI/Button";
import Logo from "../UI/Logo";
import ChatCharacters from "../chat/ChatCharacters";

function SideBarMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center ">
        <Link to="/">
          <Logo />
        </Link>
        <button
          className="cursor-pointer md:hidden"
          onClick={() => {
            dispatch(closeSideBar());
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
        </button>
      </div>

      <Button
        buttonType="outline"
        className="w-[50%]"
        onClick={() => navigate("/create-character")}
      >
        <FaPlus />
        Create
      </Button>
      <hr className="opacity-30" />
      <ChatCharacters />
    </div>
  );
}

export default SideBarMenu;
