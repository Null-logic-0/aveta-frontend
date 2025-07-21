import { useEffect, useState } from "react";
import {
  AUTH_BACKGROUND_IMAGES,
  IMAGE_CHANGE_INTERVAL_MS,
} from "../../constants/auth-backgrounds.constants";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function ImageCarousel() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const shuffled = shuffleArray(AUTH_BACKGROUND_IMAGES);
    setShuffledImages(shuffled);
    setCurrentIndex(Math.floor(Math.random() * shuffled.length));
  }, []);

  useEffect(() => {
    if (shuffledImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
    }, IMAGE_CHANGE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [shuffledImages]);

  if (shuffledImages.length === 0) return null;

  return (
    <div className="h-[570px] max-w-[1060px] max-lg:hidden ">
      <img
        src={shuffledImages[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-xl transition-opacity duration-500"
      />
    </div>
  );
}

export default ImageCarousel;
