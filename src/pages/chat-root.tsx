import { Outlet } from "react-router";
import BurgerMenuButton from "../components/UI/BurgerMenuButton";
import SideBar from "../components/aside-menu/SideBar";

function ChatRootLayout() {
  return (
    <main className="flex">
      <BurgerMenuButton />

      <SideBar />
      <div className="flex flex-col justify-center  md:ml-[275px] items-center w-full">
        <Outlet />
      </div>
    </main>
  );
}

export default ChatRootLayout;
