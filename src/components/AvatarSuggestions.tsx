import { EntityImageType } from "../enums/entity-images.enum";
import { useFetchEntityImages } from "../hooks/useFetchEntityImages";
import { EntityImageInterface } from "../interfaces/entity-image.interface";

type AvatarSuggestionsProps = {
  onOpen: () => void;
  onSelect: (value: string) => void;
};
function AvatarSuggestions({ onOpen, onSelect }: AvatarSuggestionsProps) {
  const { data, isPending, isError, error } = useFetchEntityImages({
    type: EntityImageType.AVATAR,
  });
  const images = data?.data?.data;

  if (isError && !isPending) {
    return (
      <p className="text-[#E50000] text-center text-sm font-semibold">
        {error?.message || "Failed to fetch avatars"}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-white/70 font-bold text-sm">Try an example</p>
        <button
          onClick={onOpen}
          disabled={isPending}
          className={`text-white opacity-70 ${
            isPending
              ? "cursor-not-allowed "
              : "cursor-pointer hover:opacity-100 hover:underline"
          }  font-bold text-sm `}
        >
          See more
        </button>
      </div>
      <div className="flex items-center justify-around">
        {isPending && !isError ? (
          <>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded bg-white/10 animate-pulse"
                />
              ))}
          </>
        ) : (
          <>
            {!isPending &&
              !isError &&
              images
                ?.slice(0, 8)
                .map((image: EntityImageInterface) => (
                  <img
                    key={image.id}
                    src={image.image}
                    alt="avatar"
                    onClick={() => onSelect(image.image)}
                    className="object-cover h-10 w-10 rounded cursor-pointer"
                  />
                ))}
          </>
        )}
        {!isPending && !isError && images?.length === 0 && (
          <p className="text-sm text-white/70 ">No Images</p>
        )}
      </div>
    </div>
  );
}

export default AvatarSuggestions;
