import { characterTags } from "../../../constants/tags.constants";
import Tab from "./Tab";
import { useSearchParams } from "react-router";

function Tabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tags") || "all";

  const handleTabClick = (tags: string) => {
    if (tags === "all") {
      searchParams.delete("tags");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ tags });
    }
  };

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Tab
        label="All"
        isActive={activeTab === "all"}
        onClick={() => handleTabClick("all")}
      />
      {characterTags.map((tag) => (
        <Tab
          key={tag.id}
          label={tag.title}
          isActive={activeTab === tag.title}
          onClick={() => handleTabClick(tag.title)}
        />
      ))}
    </div>
  );
}

export default Tabs;
