import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  buttonType?: "fill" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  buttonType,
  isDisabled,
  className,
  ...rest
}: ButtonProps) {
  const buttonStyle =
    buttonType === "fill"
      ? "bg-[#8A38F5]"
      : "bg-[#11141D] border border-[#3B3A3F]";
  return (
    <button
      disabled={isDisabled}
      className={twMerge(
        `${
          isDisabled
            ? `${buttonStyle}/50 cursor-not-allowed`
            : `${buttonStyle} cursor-pointer hover:${buttonStyle}/50`
        }  rounded-[6px]  py-3 px-2 text-sm font-semibold w-full`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
