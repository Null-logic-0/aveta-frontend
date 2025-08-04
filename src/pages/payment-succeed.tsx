import { MdOutlineDone } from "react-icons/md";
import PaymentStatusCard from "../components/payments/PaymentStatusCard";

function PaymentSucceed() {
  return (
    <PaymentStatusCard
      icon={<MdOutlineDone className="text-4xl text-[#FF4DC3]" />}
      message="Payment completed successfully!"
    />
  );
}

export default PaymentSucceed;
