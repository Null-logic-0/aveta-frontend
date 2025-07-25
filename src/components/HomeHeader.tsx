import { IoIosSearch } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import Welcome from "./Welcome";
import Input from "./UI/Input";

function HomeHeader() {
  const { data } = useAuth();
  const userPlan = data?.data.data.UserPlan;

  return (
    <header className="w-full flex flex-col  gap-6 max-md:mt-[30px]">
      <p
        className={`text-end font-bold text-xl  max-md:hidden  ${
          userPlan === "premium" ? "text-[#FF4DC3] opacity-100" : "hidden"
        }`}
      >
        {userPlan?.toUpperCase()}
      </p>
      <div className="flex justify-between flex-wrap max-lg:justify-center items-center w-full">
        <Welcome />

        <Input
          placeholder="Search character..."
          hasIcon
          icon={<IoIosSearch />}
          className="w-[370px] max-md:w-[280px] "
        />
      </div>
    </header>
  );
}

export default HomeHeader;
