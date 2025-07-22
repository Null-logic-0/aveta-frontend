import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import SpinnerMini from "./SpinnerMini/SpinnerMini";

type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  buttonType?: "fill" | "outline";
  isPending?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  buttonType = "fill",
  isDisabled,
  isPending,
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
            ? `${buttonStyle} opacity-50 cursor-not-allowed`
            : `${buttonStyle} cursor-pointer hover:opacity-50`
        }  rounded-[6px] flex justify-center items-center gap-2 py-3 px-2 text-sm font-semibold w-full`,
        className
      )}
      {...rest}
    >
      {isPending && <SpinnerMini />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
