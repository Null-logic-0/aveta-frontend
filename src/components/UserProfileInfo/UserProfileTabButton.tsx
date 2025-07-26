type UserProfileTabButtonProps = {
  title: string;
  onClick: () => void;
  isActive?: boolean;
};

function UserProfileTabButton({
  title,
  onClick,
  isActive,
}: UserProfileTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-lg font-semibold ${
        isActive ? "opacity-100 underline" : "opacity-50"
      }  hover:underline underline-offset-4 hover:opacity-100 cursor-pointer`}
    >
      {title}
    </button>
  );
}

export default UserProfileTabButton;
