import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

type UserProfileMenuItemProps = {
  children: React.ReactNode;
  onClose: () => void;
  link?: string;
  operation?: () => void;
  disabled?: boolean;
  className?: string;
};

function DropDownMenuItem({
  children,
  link,
  onClose,
  operation,
  disabled,
  className,
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
        className={twMerge(
          `${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } text-sm font-medium hover:bg-[#3B3A3F]/50 p-2 w-full flex justify-between items-center`,
          className
        )}
      >
        {children}
      </button>
    </li>
  );
}

export default DropDownMenuItem;
