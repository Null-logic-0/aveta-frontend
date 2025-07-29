import AvatarSuggestions from "../AvatarSuggestions";
import Button from "./Button";
import ImagePicker from "./ImagePicker";
import Modal from "./Modal/Modal";

type ImageSelectorProps = {
  onClose: () => void;
  name: string;
  onOpen: () => void;
  onSelect: (value: string) => void;
  defaultImage: string;
};
function ImageSelector({
  onClose,
  onOpen,
  onSelect,
  name,
  defaultImage,
}: ImageSelectorProps) {
  function handleSave(image: string) {
    onSelect(image);
    onClose();
  }
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Avatar Image</h3>
          <p className="text-white/50 font-medium text-sm">
            Upload or Choose your desire avatar image!
          </p>
        </div>
        <ImagePicker name={name} defaultImage={defaultImage} />
        <AvatarSuggestions onOpen={onOpen} onSelect={onSelect} />
        <div className="flex justify-end items-center gap-2">
          <Button
            buttonType="outline"
            className="text-white w-[30%]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="text-white w-[30%]"
            onClick={() => handleSave(defaultImage)}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ImageSelector;
