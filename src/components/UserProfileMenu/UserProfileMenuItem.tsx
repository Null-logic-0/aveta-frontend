import { useNavigate } from "react-router";

type UserProfileMenuItemProps = {
  children: React.ReactNode;
  link?: string;
  operation?: () => void;
  disabled?: boolean;
  onClose: () => void;
};

function UserProfileMenuItem({
  children,
  link,
  onClose,
  operation,
  disabled,
}: UserProfileMenuItemProps) {
  const navigate = useNavigate();
  function handleOperation() {
    if (link) {
      navigate(link);
    }

    if (operation) {
      operation();
    }
    onClose();
  }
  return (
    <li>
      <button
        onClick={handleOperation}
        disabled={disabled}
        className={`${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } text-sm font-medium hover:bg-[#3B3A3F]/50 p-2 w-full flex justify-between items-center`}
      >
        {children}
      </button>
    </li>
  );
}

export default UserProfileMenuItem;
