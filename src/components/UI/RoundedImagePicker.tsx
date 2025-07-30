import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

type RoundedImagePickerProps = {
  name: string;
  defaultImage: string;
  isPending?: boolean;
};

function RoundedImagePicker({
  name,
  defaultImage,
  isPending,
}: RoundedImagePickerProps) {
  const [pickedImage, setPickedImage] = useState(defaultImage || null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isImageUpdated) {
      setPickedImage(defaultImage || null);
    }
  }, [defaultImage, isImageUpdated]);

  const handlePickClick = () => {
    imageInputRef?.current?.click();
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPickedImage(null);
    setIsImageUpdated(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result as string);
        setIsImageUpdated(true);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPickedImage(null);
      setIsImageUpdated(false);
    }
  };

  const imageSrc = pickedImage || defaultImage;
  const showClearButton = pickedImage && isImageUpdated;

  return (
    <div className="flex flex-col gap-1">
      <div className="group w-25 rounded-full flex items-center justify-center h-25 relative">
        <img
          src={imageSrc || ""}
          alt={imageSrc ? "selected image" : "default image"}
          className="object-cover cursor-pointer rounded-full w-25 h-25"
        />

        <button
          onClick={handlePickClick}
          disabled={isPending}
          type="button"
          className="absolute disabled:cursor-not-allowed cursor-pointer bg-gray-100/50 flex font-semibold text-sm flex-col  justify-center items-center h-full w-full rounded-full"
        >
          <FaCloudUploadAlt className="text-2xl text-[#131316]" />
          Upload
        </button>

        {showClearButton && (
          <button
            onClick={handleClearImage}
            className="absolute z-1000 top-2 right-0 bg-[#131316] text-white font-bold cursor-pointer text-sm w-5 h-5 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            X
          </button>
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

export default RoundedImagePicker;
