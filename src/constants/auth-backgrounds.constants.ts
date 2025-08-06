const imagePaths = [
  "img-1.jpg",
  "img-2.jpg",
  "img-3.jpg",
  "img-4.jpg",
  "img-5.jpg",
  "img-6.jpg",
  "img-7.jpg",
  "img-8.jpg",
  "img-9.jpg",
  "img-10.jpg",
  "img-11.jpg",
  "img-12.jpg",
];

export const AUTH_BACKGROUND_IMAGES = imagePaths.map(
  (img) => new URL(`../assets/bg-images/${img}`, import.meta.url).href
);

export const IMAGE_CHANGE_INTERVAL_MS = 120000;
