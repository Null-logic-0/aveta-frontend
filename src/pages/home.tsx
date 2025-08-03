import { useState } from "react";
import { useLocation } from "react-router";
import { useFetchAllCharacters } from "../hooks/useFetchAllCharacters";

import HomeHeader from "../components/HomeHeader";
import Tabs from "../components/characters/tab-filter/Tabs";
import Pagination from "../components/UI/Pagination";
import UserPlanIndicator from "../components/UI/UserPlanIndicator";
import CharactersList from "../components/characters/CharactersList";

function Home() {
  const location = useLocation();

  const queryParams = Object.fromEntries(
    new URLSearchParams(location.search).entries()
  );
  const [currentPage, setCurrentPage] = useState(Number(queryParams.page) || 1);

  const [search, setSearch] = useState(queryParams.search || "");

  const { search: _, ...restParams } = queryParams;

  const { data, isPending, isError, error } = useFetchAllCharacters({
    ...restParams,
    limit: 6,
    page: currentPage,
    search,
  });

  const characters = data?.data?.data;
  const pagination = data?.data;

  return (
    <div className="max-w-[1100px] xl:h-screen flex  flex-col items-center justify-center">
      <HomeHeader
        onSearch={(value) => {
          setCurrentPage(1);
          setSearch(value);
        }}
      />
      <UserPlanIndicator />

      <div className="flex max-lg:items-center flex-col gap-6 mt-6">
        <h2 className="text-2xl font-bold">Browse Characters</h2>
        <Tabs />
        <CharactersList
          characters={characters}
          isLoading={isPending}
          isError={isError}
          errMessage={
            error instanceof Error
              ? error.message
              : "Oops...something went wrong!"
          }
        />
        <div className="w-full flex justify-end max-lg:justify-center max-w-[1000px]">
          {!isPending && !isError && (
            <Pagination
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
              totalPages={pagination.meta.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
