type SettingsMenuItem = {
  children: React.ReactNode;
  navigate?: () => void;
  isActive?: boolean;
};

function SettingsMenuItem({ navigate, children, isActive }: SettingsMenuItem) {
  return (
    <li>
      <button
        onClick={navigate}
        className={`cursor-pointer text-sm font-medium text-white/50 ${
          isActive && "bg-[#3B3A3F]/50"
        } hover:bg-[#3B3A3F]/50 p-2 w-full flex justify-between items-center`}
      >
        {children}
      </button>
    </li>
  );
}

export default SettingsMenuItem;
