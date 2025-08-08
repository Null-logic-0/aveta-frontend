import { useState } from "react";
import { useLikedCharacters } from "../../hooks/useLikedCharacters";
import CharactersList from "../characters/CharactersList";
import Pagination from "../UI/Pagination";

function LikedCharacters({ id }: { id?: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: likedCharactersData,
    isLoading,
    isError,
    error,
  } = useLikedCharacters({
    id,
    limit: 6,
    page: currentPage,
  });

  const characters = likedCharactersData?.data?.data;
  const pagination = likedCharactersData?.data;

  return (
    <>
      <CharactersList
        characters={characters}
        isError={isError}
        errMessage={
          error instanceof Error
            ? error.message
            : "Oops...something went wrong!"
        }
        isLoading={isLoading}
      />
      <div className="w-full flex justify-end max-sm:justify-center">
        {!isLoading && !isError && (
          <Pagination
            onPageChange={(page) => setCurrentPage(page)}
            currentPage={currentPage}
            totalPages={pagination?.meta.totalPages}
          />
        )}
      </div>
    </>
  );
}

export default LikedCharacters;
