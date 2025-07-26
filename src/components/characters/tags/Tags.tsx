import Tag from "./Tag";

type TagsProps = {
  tags: string[];
};

function Tags({ tags = [] }: TagsProps) {
  const visibleTags = tags.slice(0, 3);
  const remainingCount = tags.length - visibleTags.length;
  return (
    <ul className="flex items-center flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag key={index} tagName={tag} />
      ))}
      {remainingCount > 0 && <Tag tagName={`+${remainingCount.toString()}`} />}
    </ul>
  );
}

export default Tags;
