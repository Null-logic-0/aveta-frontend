import { twMerge } from "tailwind-merge";

type ChatLoaderType = {
  className?: string;
  isBig?: boolean;
};

function ChatLoader({ className, isBig }: ChatLoaderType) {
  return (
    <div
      className={twMerge(
        "flex w-full items-center justify-start animate-pulse gap-[6px] p-2  rounded-[6px]",
        className
      )}
    >
      <div
        className={`bg-[#3B3A3F] rounded-full ${
          isBig ? "w-14 h-10" : "w-9 h-8"
        } `}
      />
      <div className="bg-[#3B3A3F] rounded w-full  h-6" />
    </div>
  );
}

export default ChatLoader;
