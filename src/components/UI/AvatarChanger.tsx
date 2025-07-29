import { useDispatch, useSelector } from "react-redux";
import { close, open, selectImage } from "../../store/UI-slice";
import { RootState } from "../../store";
import { FaRegEdit } from "react-icons/fa";

import RoundedImage from "./RoundedImage";
import defaultImage from "../../assets/default.jpg";
import ImageSelector from "./ImageSelector";
import AvatarExamplesModal from "../AvatarExamplesModal";

type AvatarChangerProps = {
  name: string;
  error: string;
  uploadedImage?: string;
};

function AvatarChanger({ name, error, uploadedImage }: AvatarChangerProps) {
  const dispatch = useDispatch();
  const isActiveModal = useSelector((state: RootState) => state.ui.active);
  const selectedImage = useSelector(
    (state: RootState) => state.ui.selectedImage
  );

  const handleOpenModal = () => dispatch(open("image-selector"));

  const handleOpenAvatarModal = () => dispatch(open("avatar-suggestions"));

  const handleSelectImage = (imageUrl: string) =>
    dispatch(selectImage(imageUrl));

  const handleCloseModal = () => dispatch(close());

  const defImage = uploadedImage || defaultImage;

  return (
    <>
      <div className="relative">
        <RoundedImage
          src={selectedImage ? selectedImage : defImage}
          alt="avatar"
          className="h-22 w-22"
        />
        <button
          onClick={handleOpenModal}
          className="cursor-pointer rounded-full bg-[#18181b] p-2 absolute bottom-0 left-16"
          type="button"
        >
          <FaRegEdit />
        </button>
      </div>
      {error && <p className="text-sm text-[#E50000] font-medium">{error}</p>}
      {isActiveModal === "image-selector" && (
        <ImageSelector
          name={name}
          defaultImage={selectedImage}
          onClose={handleCloseModal}
          onOpen={handleOpenAvatarModal}
          onSelect={handleSelectImage}
        />
      )}
      {isActiveModal === "avatar-suggestions" && (
        <AvatarExamplesModal
          onClose={handleCloseModal}
          onSelect={handleSelectImage}
          onOpen={handleOpenModal}
        />
      )}
    </>
  );
}

export default AvatarChanger;
