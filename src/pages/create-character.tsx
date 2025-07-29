import { RootState } from "../store";
import { useSelector } from "react-redux";
import ReturnButton from "../components/UI/ReturnButton";
import { useCharacterMutation } from "../hooks/useCharacterMutation";
import CharacterForm from "../components/characters/CharacterForm";
import { prepareCharacterFormData } from "../util/prepareCharacterFormData";

function CreateCharacter() {
  const { mutate, isPending, formErrors } = useCharacterMutation({
    mode: "create",
  });
  const selectedImage = useSelector(
    (state: RootState) => state.ui.selectedImage
  );

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const file = formData.get("avatar") as File;

  //   let avatar: File | string | undefined;

  //   if (file && file.size > 0) {
  //     avatar = file;
  //   } else if (
  //     selectedImage &&
  //     selectedImage.startsWith("data:image/") &&
  //     selectedImage.includes("base64")
  //   ) {
  //     avatar = base64ToFile(selectedImage, "avatar.jpg") || undefined;
  //   } else if (
  //     typeof selectedImage === "string" &&
  //     selectedImage.startsWith("http")
  //   ) {
  //     avatar = selectedImage;
  //   }

  //   const data = {
  //     characterName: formData.get("characterName") as string,
  //     tagline: formData.get("tagline") as string,
  //     description: formData.get("description") as string,
  //     tags: formData.getAll("tags") as string[],
  //     greeting: formData.get("greeting") as string,
  //     visibility: formData.get("visibility") as Visibility,
  //     avatar,
  //   };

  //   mutate(data);
  // }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = prepareCharacterFormData(formData, selectedImage);
    mutate(data);
  }

  return (
    <>
      <ReturnButton />
      <CharacterForm
        onSubmit={handleSubmit}
        isPending={isPending}
        error={formErrors}
      />
    </>
  );
}

export default CreateCharacter;
