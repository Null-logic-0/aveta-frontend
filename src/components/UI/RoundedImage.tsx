import { twMerge } from "tailwind-merge";

type RoundedImageTypes = {
  src: string;
  alt: string;
  className?: string;
};

function RoundedImage({ src, alt, className }: RoundedImageTypes) {
  return (
    <img
      src={src}
      alt={alt}
      className={twMerge(
        `rounded-full w-[36px] h-[36px] object-cover`,
        className
      )}
    />
  );
}

export default RoundedImage;
