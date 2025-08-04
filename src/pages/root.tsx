import { Outlet } from "react-router";
import SideBar from "../components/aside-menu/SideBar";

import BurgerMenuButton from "../components/UI/BurgerMenuButton";

function RootLayout() {
  return (
    <main className="flex">
      <BurgerMenuButton />

      <SideBar />
      <div className="flex flex-col justify-center p-6 md:ml-[275px] items-center  w-full">
        <div className="max-w-[1200px] mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default RootLayout;
