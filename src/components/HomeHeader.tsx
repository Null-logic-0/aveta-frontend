import { IoIosSearch } from "react-icons/io";
import Welcome from "./Welcome";
import Input from "./UI/Input";

function HomeHeader() {
  return (
    <header className="w-full flex flex-col   gap-6 max-md:mt-[30px]">
      <div className="flex justify-between  max-w-[1020px]  flex-wrap max-lg:justify-center items-center w-full">
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
