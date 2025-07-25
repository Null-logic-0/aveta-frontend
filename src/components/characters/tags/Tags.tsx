import Tag from "./Tag";

const TAGS = [
  {
    id: 1,
    tagName: "Nature",
  },
  {
    id: 2,
    tagName: "Nature",
  },
  {
    id: 3,
    tagName: "Nature",
  },
  {
    id: 4,
    tagName: "Nature",
  },
  {
    id: 5,
    tagName: "Nature",
  },
];

function Tags() {
  const visibleTags = TAGS.slice(0, 3);
  const remainingCount = TAGS.length - visibleTags.length;
  return (
    <ul className="flex items-center flex-wrap gap-2">
      {visibleTags.map((tag) => (
        <Tag key={tag.id} tagName={tag.tagName} />
      ))}
      {remainingCount > 0 && <Tag tagName={`+${remainingCount.toString()}`} />}
    </ul>
  );
}

export default Tags;
