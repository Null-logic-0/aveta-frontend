import { useEffect, useState } from "react";
import {
  AUTH_BACKGROUND_IMAGES,
  IMAGE_CHANGE_INTERVAL_MS,
} from "../../constants/auth-backgrounds.constants";

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AUTH_BACKGROUND_IMAGES.length);
    }, IMAGE_CHANGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-[570px] max-w-[1060px] max-lg:hidden ">
      <img
        src={AUTH_BACKGROUND_IMAGES[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-xl transition-opacity duration-500"
      />
    </div>
  );
}

export default ImageCarousel;
