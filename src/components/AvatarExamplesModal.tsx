import { EntityImageType } from "../enums/entity-images.enum";
import { useFetchEntityImages } from "../hooks/useFetchEntityImages";
import { EntityImageInterface } from "../interfaces/entity-image.interface";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import Modal from "./UI/modal/Modal";

type AvatarExamplesModalProps = {
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
};

function AvatarExamplesModal({
  onClose,
  onSelect,
  onOpen,
}: AvatarExamplesModalProps) {
  const { data, isPending, isError, error } = useFetchEntityImages({
    type: EntityImageType.AVATAR,
  });
  const images = data?.data;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onOpen}
            disabled={isPending}
            className={`text-white flex items-center gap-1 opacity-70 ${
              isPending
                ? "cursor-not-allowed "
                : "cursor-pointer hover:opacity-100"
            }  font-bold text-sm `}
          >
            <MdOutlineArrowBackIosNew />
            Back
          </button>
          <button
            onClick={onClose}
            disabled={isPending}
            className={`text-white opacity-70 ${
              isPending
                ? "cursor-not-allowed "
                : "cursor-pointer hover:opacity-100"
            }  font-bold text-sm `}
          >
            Close
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 overflow-y-auto h-full max-h-[355px]">
          {!isError &&
            !isPending &&
            images?.map((img: EntityImageInterface) => (
              <img
                key={img.id}
                src={img.image}
                alt="avatars"
                onClick={() => {
                  onSelect(img.image);
                  onOpen();
                }}
                className="rounded cursor-pointer object-cover w-30 h-40"
              />
            ))}

          {isPending && !isError && (
            <>
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-30 h-40 rounded bg-white/10 animate-pulse"
                  />
                ))}
            </>
          )}
          {isError && !isPending && (
            <p className="text-[#E50000] text-center text-sm font-semibold">
              {error?.message || "Failed to fetch avatars"}
            </p>
          )}
          {!isPending && !isError && images?.length === 0 && (
            <p className="text-sm text-white/70 ">No Images</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AvatarExamplesModal;
