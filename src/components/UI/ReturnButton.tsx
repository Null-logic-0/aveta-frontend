import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router";

function ReturnButton() {
  const navigate = useNavigate();
  return (
    <div className="mb-6 max-md:hidden fixed top-4 z-10 ml-[300px]  flex items-center justify-start w-full">
      <button className="cursor-pointer" onClick={() => navigate(-1)}>
        <RiArrowGoBackFill className="text-xl" />
      </button>
    </div>
  );
}

export default ReturnButton;
