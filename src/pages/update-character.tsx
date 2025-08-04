import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useCharacterMutation } from "../hooks/useCharacterMutation";

import CharacterForm from "../components/characters/CharacterForm";
import ReturnButton from "../components/UI/ReturnButton";
import { useFetchCharacter } from "../hooks/useFetchCharacter";
import { useParams } from "react-router";
import { toNumericId } from "../helpers/toNumericId";
import { prepareCharacterFormData } from "../util/prepareCharacterFormData";

function UpdateCharacter() {
  const { characterId } = useParams();
  const numericId = toNumericId(characterId);

  const { mutate, isPending, formErrors } = useCharacterMutation({
    characterId: numericId,
    mode: "update",
  });
  const { data } = useFetchCharacter({ id: numericId as number });

  const character = data?.data?.data;

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
        character={character}
        onSubmit={handleSubmit}
        error={formErrors}
        isPending={isPending}
      />
    </div>
  );
}

export default UpdateCharacter;
