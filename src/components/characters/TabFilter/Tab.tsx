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
        isActive ? "bg-[#8A38F5]" : "bg-[#1E1E25]"
      } rounded-3xl px-4 py-2 cursor-pointer w-[164px] max-sm:w-[124px]`}
    >
      <p className="font-medium text-sm">{label.toUpperCase()}</p>
    </button>
  );
}

export default Tab;
