import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

import BurgerMenuButton from "../components/UI/BurgerMenuButton";
import UserPlanIndicator from "../components/UI/UserPlanIndicator";

function RootLayout() {
  return (
    <main className="flex">
      <BurgerMenuButton />
      <UserPlanIndicator />
      <SideBar />
      <div className="flex flex-col justify-center md:ml-[275px] items-center p-6 w-full">
        <Outlet />
      </div>
    </main>
  );
}

export default RootLayout;
