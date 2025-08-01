import Empty from "../UI/Empty";
import { useState } from "react";
import { useFetchUserCharacters } from "../../hooks/useFetchUserCharacters";
import CharactersList from "../characters/CharactersList";
import Pagination from "../UI/Pagination";
import Spinner from "../UI/spinner/Spinner";

function CreatedCharacters({ id }: { id?: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useFetchUserCharacters({
    id,
    limit: 6,
    page: currentPage,
  });

  const characters = data?.data?.data;

  const pagination = data?.data;

  if (characters?.length === 0 && !isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center">
        <Empty description="Invalid user ID" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <CharactersList characters={characters} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPages={pagination?.meta.totalPages}
        />
      )}
    </>
  );
}

export default CreatedCharacters;
