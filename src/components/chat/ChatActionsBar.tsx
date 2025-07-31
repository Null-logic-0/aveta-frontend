import ChatMenu from "./ChatMenu";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";

import { FaRegEdit } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useToggleLikeCharacter } from "../../hooks/useToggleLikeCharacter";
import { useDispatch } from "react-redux";
import { close, selectImage } from "../../store/UI-slice";
import { useDeleteChat } from "../../hooks/useDeleteChat";
import { useFetchLikedCharacterByUser } from "../../hooks/useFetchLikedCharacterByUser";
import ThemeSuggestionsModal from "./ThemeSuggestionsModal";
import { useState } from "react";
import { useUpdateChatTheme } from "../../hooks/useUpdateChatTheme";
import { useNavigate } from "react-router";

type ChatActionBarProps = {
  characterId: number;
  chatId: number;
  activeValue: string | number;
};

function ChatActionsBar({
  chatId,
  characterId,
  activeValue,
}: ChatActionBarProps) {
  const { mutate } = useToggleLikeCharacter({ id: characterId });

  const { mutate: deleteChat } = useDeleteChat({ id: chatId });

  const { data } = useFetchLikedCharacterByUser({ id: characterId });

  const { mutate: updateTheme } = useUpdateChatTheme({ id: chatId });

  const [openThemeModal, setOpenThemeModal] = useState(false);

  const isLiked = data?.data.liked;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClose = () => dispatch(close());

  const handleCloseThemeModal = () => setOpenThemeModal(false);

  return (
    <>
      <div className="flex gap-2 items-baseline">
        <button className="text-xl cursor-pointer" onClick={() => mutate()}>
          {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
        </button>
        <ChatMenu activeValue={activeValue} className="right-0 top-7 w-50">
          <DropDownMenuItem
            onClose={handleClose}
            link={`/character/${characterId}`}
          >
            info
            <IoInformationCircleOutline className="text-xl" />
          </DropDownMenuItem>
          <DropDownMenuItem
            onClose={handleClose}
            operation={() => setOpenThemeModal(true)}
          >
            Change theme
            <CgArrowsExchange className="text-xl" />
          </DropDownMenuItem>

          <DropDownMenuItem
            onClose={handleClose}
            link={`/update-character/${characterId}`}
          >
            Edit character <FaRegEdit />
          </DropDownMenuItem>
          <DropDownMenuItem
            onClose={handleClose}
            operation={() => {
              deleteChat();
              navigate("/");
            }}
            className="text-red-600"
          >
            Delete chat <MdDeleteOutline className="text-xl" />
          </DropDownMenuItem>
        </ChatMenu>
      </div>
      {openThemeModal && (
        <ThemeSuggestionsModal
          onClose={handleCloseThemeModal}
          onSelect={(value) => {
            dispatch(selectImage(value));
            updateTheme({ theme: value });

            handleCloseThemeModal();
          }}
        />
      )}
    </>
  );
}

export default ChatActionsBar;
