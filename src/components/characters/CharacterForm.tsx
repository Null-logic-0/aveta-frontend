import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { optionTags } from "../../constants/tags.constants";
import { visibilityOptions } from "../../constants/visibility.constants";

import Button from "../UI/Button";
import Input from "../UI/Input";
import TagDropdown from "../UI/TagDropdown";
import AvatarChanger from "../UI/AvatarChanger";
import Dropdown from "../UI/DropDown";

type CharacterFields = {
  avatar: string;
  characterName: string;
  tagline: string;
  greeting: string;
  description: string;
  tags: string[] | string;
  visibility: string;
};

type CharacterFormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  character?: CharacterFields;
  error: CharacterFields;
};

function CharacterForm({
  onSubmit,
  error,
  isPending,
  character,
}: CharacterFormProps) {
  const [value, setValue] = useState<string[]>([]);
  const navigate = useNavigate();

  return (
    <form
      className="flex flex-col gap-4 max-w-[660px] w-full max-md:mt-6"
      onSubmit={onSubmit}
    >
      <AvatarChanger
        name="avatar"
        error={error?.avatar}
        uploadedImage={character?.avatar}
      />
      <Input
        error={error?.characterName}
        defaultValue={character?.characterName || ""}
        disabled={isPending}
        isLabel
        label="Character name"
        name="characterName"
        placeholder="Give your character a name..."
      />
      <Input
        isLabel
        defaultValue={character?.tagline || ""}
        error={error?.tagline}
        disabled={isPending}
        label="Tagline"
        name="tagline"
        className="h-40"
        isTextArea
        placeholder="Add some flair to your character..."
      />
      <Input
        isLabel
        error={error?.greeting}
        defaultValue={character?.greeting || ""}
        disabled={isPending}
        label="Greeting"
        name="greeting"
        isTextArea
        placeholder="Write a short greeting they'd say when first meeting someone."
      />
      <Input
        isLabel
        error={error?.description}
        defaultValue={character?.description || ""}
        disabled={isPending}
        label="Description"
        className="h-30"
        name="description"
        isTextArea
        placeholder="Describe your character’s personality, role, or purpose..."
      />
      <TagDropdown
        error={error.tags}
        label="Choose one or more tags"
        options={optionTags}
        selectedValues={value}
        defaultValue={character?.tags || []}
        onChange={setValue}
      />
      {value
        .filter((tag) => tag.trim() !== "")
        .map((tag, index) => (
          <input key={index} type="hidden" name="tags" value={tag.trim()} />
        ))}

      <Dropdown
        error={error.visibility}
        defaultValue={character?.visibility || ""}
        disabled={isPending}
        label="Visibility"
        name="visibility"
        options={visibilityOptions}
        className="w-[14%] max-md:w-[50%]"
      />
      <div className="flex items-center max-md:justify-center gap-4 justify-end  w-full">
        <Button
          buttonType="outline"
          type="button"
          onClick={() => navigate("/")}
          className="w-[14%] max-md:w-full"
        >
          Cancel
        </Button>
        <Button
          className="w-[14%] max-md:w-full"
          disabled={isPending}
          isPending={isPending}
        >
          {isPending ? "Saving" : "save"}
        </Button>
      </div>
    </form>
  );
}

export default CharacterForm;
