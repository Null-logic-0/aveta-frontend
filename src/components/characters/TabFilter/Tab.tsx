type TabProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive ? "bg-[#8A38F5]" : "bg-[#25252D]"
      } rounded-3xl px-4 py-2 cursor-pointer`}
    >
      <p className="font-medium text-sm">{label.toUpperCase()}</p>
    </button>
  );
}

export default Tab;
