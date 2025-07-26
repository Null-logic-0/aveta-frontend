import RoundedImage from "../UI/RoundedImage";
type CharacterListItemProps = {
  image: string;
  characterName: string;
  isActive?: boolean;
};
function CharacterListItem({
  image,
  characterName,
  isActive,
}: CharacterListItemProps) {
  return (
    <div
      className={`flex w-full items-center justify-start p-2 gap-[6px] rounded-[6px] ${
        isActive && "bg-[#1E1E25]/50"
      } hover:bg-[#1E1E25]/50`}
    >
      <RoundedImage src={image} alt="character-image" />
      <span className="text-sm font-semibold">{characterName}</span>
    </div>
  );
}

export default CharacterListItem;
