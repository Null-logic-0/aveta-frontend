import Button from "../UI/Button";

type PricePlanProps = {
  title: string;
  price: string;
  caption?: string;
  buttonText: string;
  isFree?: boolean;
  children: React.ReactNode;
  onPay: () => void;
  isPending: boolean;
};

function PricePlan({
  title,
  price,
  caption,
  buttonText,
  isFree,
  children,
  isPending,
  onPay,
}: PricePlanProps) {
  return (
    <div className="bg-[#11141D] border border-[#3B3A3F] rounded-2xl h-[458px] max-w-[310px] w-full p-6 flex flex-col justify-center gap-6">
      <h3 className="text-2xl font-bold text-[#FF4DC3]">{title}</h3>
      <div>
        <p className="text-3xl font-bold">{price}</p>
        {caption && <span className="text-white/50 text-sm">{caption}</span>}
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
      <Button
        type="button"
        isDisabled={isFree || isPending}
        buttonType={isFree ? "outline" : "fill"}
        onClick={onPay}
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default PricePlan;
