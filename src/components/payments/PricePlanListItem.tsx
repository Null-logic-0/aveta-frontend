import { MdOutlineDone } from "react-icons/md";

function PricePlanListItem({ listName }: { listName: string }) {
  return (
    <li className="flex items-center gap-2">
      <MdOutlineDone className="text-[#FF4DC3]" />
      <span className="text-[16px] font-medium">{listName}</span>
    </li>
  );
}

export default PricePlanListItem;
