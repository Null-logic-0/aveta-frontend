import { twMerge } from "tailwind-merge";

type CardWrapperProps = {
  children: React.ReactNode;
  className?: string;
  heading?: string;
};

function CardWrapper({ children, className, heading }: CardWrapperProps) {
  return (
    <div
      className={twMerge(
        "border border-[#3B3A3F] bg-[#1E1E25] max-w-[612px] rounded-xl p-4  w-full",
        className
      )}
    >
      {heading && (
        <>
          <h3 className="text-lg font-semibold pb-2">{heading}</h3>
          <hr className="pb-4 opacity-50" />
        </>
      )}
      <div className="max-h-[288px] overflow-y-auto">{children}</div>
    </div>
  );
}

export default CardWrapper;
