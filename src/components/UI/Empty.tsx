import { BsDatabaseX } from "react-icons/bs";

function Empty({ description }: { description: string }) {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-6">
      <BsDatabaseX className="text-4xl text-white/50" />

      <p className="text-lg font-semibold text-white/50">{description}</p>
    </div>
  );
}

export default Empty;
