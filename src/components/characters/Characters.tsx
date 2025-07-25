import Pagination from "../UI/Pagination";
import CharacterCard from "./CharacterCard";
import Tabs from "./TabFilter/Tabs";

function Characters() {
  return (
    <div className="flex max-lg:items-center flex-col gap-6 mt-6">
      <h2 className="text-2xl font-bold">Browse Characters</h2>
      <Tabs />
      <div className="flex flex-col gap-6 items-center">
        <div className="flex gap-4 max-lg:justify-center items-center flex-wrap">
          <CharacterCard />
          <CharacterCard />
          <CharacterCard />
          <CharacterCard />
          <CharacterCard />
          <CharacterCard />
        </div>
        <Pagination currentPage={1} totalPages={100} />
      </div>
    </div>
  );
}

export default Characters;
