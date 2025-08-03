import { useNavigate, useRouteError } from "react-router";

import Button from "../components/UI/Button";
import { IoWarning } from "react-icons/io5";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  let title = "An Error occurred!";
  let message = "Something went wrong!";
  let status: "404" | "500" | "error" = "error";

  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    const status = error.status as number;

    if (status === 500) {
      message = (error as { message?: string }).message ?? message;
    }

    if (status === 404) {
      title = "Sorry, this page isn't available";
      message =
        "The link you followed may be broken, or the page may have been removed.";
    }
  }

  function handleNavigate() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center gap-4 max-w-[400px] w-full mx-auto p-4">
      <div className="rounded-full text-white flex items-center justify-center relative border border-[#FF4DC3]  p-4">
        <IoWarning className="text-5xl " />
      </div>
      <p className="text-lg opacity-50 font-semibold">{status.toUpperCase()}</p>
      <p className="text-xl opacity-50 font-bold">{title}</p>
      <p className="text-sm text-center opacity-50 font-semibold">{message}</p>
      <Button onClick={handleNavigate} className="w-30">
        Back To Safety
      </Button>
    </div>
  );
}

export default ErrorPage;
