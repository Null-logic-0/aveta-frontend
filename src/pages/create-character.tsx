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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = prepareCharacterFormData(formData, selectedImage);
    mutate(data);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <ReturnButton />
      <CharacterForm
        onSubmit={handleSubmit}
        isPending={isPending}
        error={formErrors}
      />
    </div>
  );
}

export default CreateCharacter;
