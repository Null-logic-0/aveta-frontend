import { useNavigate } from "react-router";
import Button from "../UI/Button";
import Heading from "../UI/Heading";

type PaymentStatusProps = {
  message: string;
  icon: React.ReactNode;
};

function PaymentStatusCard({ message, icon }: PaymentStatusProps) {
  const navigate = useNavigate();
  return (
    <main className="h-screen flex justify-center items-center p-4">
      <div className="flex items-center flex-col gap-4 bg-[#11141D] border border-[#3B3A3F] p-6  max-w-[462px] w-full rounded-xl">
        <Heading isTitle title="Aveta.app" />
        <div className="rounded-full relative border border-[#FF4DC3] flex justify-center items-center  p-4 w-20 h-20">
          {icon}
        </div>
        <h2 className=" font-semibold text-xl text-center">{message}</h2>

        <p className="text-white/50 font-medium tex-sm text-center">
          Go back to home page{" "}
        </p>
        <Button className="w-40" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    </main>
  );
}

export default PaymentStatusCard;
