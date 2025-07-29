import { Visibility } from "../enums/visibility.enum";

function base64ToFile(base64: string, filename: string): File | null {
  if (!base64.includes("base64,")) return null;

  try {
    const [prefix, base64Data] = base64.split(",");
    const mime = prefix.match(/:(.*?);/)?.[1] || "image/jpeg";
    const binary = atob(base64Data);
    const len = binary.length;
    const u8arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8arr[i] = binary.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Invalid base64 image:", error);
    return null;
  }
}

export function prepareCharacterFormData(
  formData: FormData,
  selectedImage: string | null | undefined
) {
  const file = formData.get("avatar") as File;

  let avatar: File | string | undefined;

  if (file && file.size > 0) {
    avatar = file;
  } else if (
    selectedImage &&
    selectedImage.startsWith("data:image/") &&
    selectedImage.includes("base64")
  ) {
    avatar = base64ToFile(selectedImage, "avatar.jpg") || undefined;
  } else if (
    typeof selectedImage === "string" &&
    selectedImage.startsWith("http")
  ) {
    avatar = selectedImage;
  }

  return {
    characterName: formData.get("characterName") as string,
    tagline: formData.get("tagline") as string,
    description: formData.get("description") as string,
    tags: formData.getAll("tags") as string[],
    greeting: formData.get("greeting") as string,
    visibility: formData.get("visibility") as Visibility,
    avatar,
  };
}
