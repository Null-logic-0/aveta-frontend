import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
};

function Button({ children, isDisabled, className, ...rest }: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      className={twMerge(
        `${
          isDisabled
            ? "bg-[#8A38F5]/50 cursor-not-allowed"
            : "bg-[#8A38F5] cursor-pointer hover:bg-[#8A38F5]/50"
        }  rounded-[6px] py-3 px-2 text-sm font-semibold`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
