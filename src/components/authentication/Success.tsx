import Heading from "../UI/Heading";
import Icon from "../../assets/received.png";
import { Link } from "react-router";

function Success() {
  return (
    <main className="h-screen flex justify-center items-center p-4">
      <div className="flex items-center flex-col gap-4 bg-[#11141D] border border-[#3B3A3F] p-6  max-w-[462px] w-full rounded-xl">
        <Heading isTitle title="Aveta.app" />
        <div className="rounded-full relative border border-[#FF4DC3]  p-4 w-20 h-20">
          <span className="absolute -right-2 bottom-12 rounded-full h-6 w-6  text-center bg-[#FF4DC3]">
            1
          </span>
          <img src={Icon} alt="icon" />
        </div>
        <h2 className=" font-semibold text-xl text-center">Check your inbox</h2>
        <p className="text-white/50 font-medium tex-sm text-center">
          Click the link to reset your password
        </p>
        <p className="text-white/50 font-medium tex-sm text-center">
          Didn't receive an email?{" "}
          <Link
            to={"/forgot-password"}
            className="text-[#FF4DC3] font-semibold underline underline-offset-4"
          >
            Resend email
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Success;
