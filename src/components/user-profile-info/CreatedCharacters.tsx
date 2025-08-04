import { useState } from "react";
import { useFetchUserCharacters } from "../../hooks/useFetchUserCharacters";
import CharactersList from "../characters/CharactersList";
import Pagination from "../UI/Pagination";

function CreatedCharacters({ id }: { id?: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useFetchUserCharacters({
    id,
    limit: 6,
    page: currentPage,
  });

  const characters = data?.data?.data;

  const pagination = data?.data;

  return (
    <>
      <CharactersList
        characters={characters}
        isLoading={isLoading}
        isError={isError}
        errMessage={
          error instanceof Error
            ? error.message
            : "Oops...something went wrong!"
        }
      />
      <div className="w-full flex justify-end max-sm:justify-center">
        {!isLoading && !isError && !characters && (
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

export default CreatedCharacters;
