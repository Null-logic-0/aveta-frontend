import PaymentStatusCard from "../components/payments/PaymentStatusCard";
import { MdPayment } from "react-icons/md";

function PaymentDeclined() {
  return (
    <PaymentStatusCard
      icon={<MdPayment className="text-4xl text-[#FF4DC3]" />}
      message="Payment has been declined!"
    />
  );
}

export default PaymentDeclined;
