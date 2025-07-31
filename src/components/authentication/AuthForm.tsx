import { FormEvent } from "react";
import { twMerge } from "tailwind-merge";

type AuthFormType = {
  children: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

function AuthForm({ children, onSubmit, className }: AuthFormType) {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        "flex flex-col gap-4 bg-[#11141D] border border-[#3B3A3F] max-md:px-2 max-md:py-3 py-6 px-8 max-w-[462px] w-full rounded-xl",
        className
      )}
    >
      {children}
    </form>
  );
}

export default AuthForm;
