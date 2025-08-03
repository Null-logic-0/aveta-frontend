import { MdErrorOutline, MdDoneOutline } from "react-icons/md";

type AppResultType = {
  isError: boolean;
  message: string;
};

function AppResult({ isError, message }: AppResultType) {
  return (
    <div className="flex items-center flex-col gap-4">
      <div
        className={`${
          isError ? "bg-red-700" : "bg-green-600"
        } rounded-full text-white flex items-center justify-center w-12 h-12 p-1`}
      >
        {isError ? <MdErrorOutline className="text-3xl" /> : <MdDoneOutline />}
      </div>
      <p className="text-lg text-white/50 font-semibold">{message}</p>
    </div>
  );
}

export default AppResult;
