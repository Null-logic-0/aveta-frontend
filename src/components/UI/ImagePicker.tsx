import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedImage, selectImage } from "../../store/UI-slice";
import { RootState } from "../../store";

type ImagePickerProps = {
  name: string;
  defaultImage?: string;
};

function ImagePicker({ name, defaultImage }: ImagePickerProps) {
  const pickedImage = useSelector((state: RootState) => state.ui.selectedImage);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isImageUpdated) {
      dispatch(selectImage(defaultImage));
    }
  }, [defaultImage, dispatch, isImageUpdated]);

  const handlePickClick = () => {
    imageInputRef.current?.click();
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsImageUpdated(false);
    dispatch(clearSelectedImage());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        dispatch(selectImage(fileReader.result as string));
        setIsImageUpdated(true);
      };
      fileReader.readAsDataURL(file);
    } else {
      dispatch(clearSelectedImage());
      dispatch(selectImage(null));
      setIsImageUpdated(false);
    }
  };

  const imageSrc = pickedImage ?? defaultImage ?? "";
  const showClearButton = pickedImage && isImageUpdated;

  return (
    <div className="flex flex-col gap-1">
      <div className="max-w-[421px] h-[281px] flex justify-center items-center  w-full rounded border-2 border-dashed border-[#8A38F5]  relative">
        {imageSrc && (
          <img
            src={imageSrc || ""}
            alt={imageSrc ? "selected image" : "default image"}
            className="object-contain cursor-pointer rounded max-w-[421px] w-full h-full max-h-[281px]"
          />
        )}

        {(defaultImage || showClearButton) && (
          <button
            onClick={handleClearImage}
            className="absolute z-1000 top-2 right-2 bg-[#1E1E25] text-white/50 font-bold cursor-pointer text-sm w-6 h-6 rounded flex justify-center items-center"
          >
            X
          </button>
        )}
        {!imageSrc && (
          <div className="p-2 w-full flex justify-center items-center">
            <Button onClick={handlePickClick} className="text-white w-[50%]">
              Upload Image
            </Button>
          </div>
        )}
      </div>

      <input
        className="hidden"
        type="file"
        accept="image/*"
        name={name}
        ref={imageInputRef}
        onChange={handleImageChange}
      />

      <input
        type="hidden"
        name={name}
        value={pickedImage || defaultImage || ""}
      />
    </div>
  );
}

export default ImagePicker;
