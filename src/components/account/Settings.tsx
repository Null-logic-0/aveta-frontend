import { useState } from "react";
import { RootState } from "../../store";
import { close } from "../../store/UI-slice";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../UI/modal/Modal";
import UpdatePassword from "./UpdatePassword";
import SettingsMenuItem from "./SettingsMenuItem";
import UpdateProfile from "./UpdateProfile";
import Account from "./Account";

import { IoMdClose } from "react-icons/io";
import DeleteAccount from "./DeleteAccount";

function Settings() {
  const [navigate, setNavigate] = useState("profile");
  const { data } = useAuth();
  const user = data?.data?.data;
  const active = useSelector((state: RootState) => state.ui.active);
  const dispatch = useDispatch();

  function handleNavigate(tab: string) {
    setNavigate(tab);
  }

  function handleClose() {
    dispatch(close());
  }
  return (
    <>
      {active === user?.id && (
        <Modal
          className="p-0 max-w-[622px]  w-full max-sm:max-h-[100vh] max-sm:top-0 max-sm:h-full max-sm:rounded-none"
          onClose={handleClose}
        >
          <button
            className="fixed text-white/50 cursor-pointer top-3 text-xl right-4"
            onClick={handleClose}
          >
            <IoMdClose />
          </button>
          <div className="flex-1/2  flex max-sm:flex-col-reverse">
            <ul className="bg-[#131316]  w-[150px] gap-2 flex-col flex max-sm:w-full max-sm:p-2 py-6 max-sm:flex-row max-sm:justify-between ">
              <SettingsMenuItem
                navigate={() => handleNavigate("profile")}
                isActive={navigate === "profile"}
              >
                Profile
              </SettingsMenuItem>
              {user.googleId === null && (
                <SettingsMenuItem
                  navigate={() => handleNavigate("update-password")}
                  isActive={navigate === "update-password"}
                >
                  Update Password
                </SettingsMenuItem>
              )}
              <SettingsMenuItem
                navigate={() => handleNavigate("account")}
                isActive={navigate === "account"}
              >
                Account
              </SettingsMenuItem>
            </ul>

            <div className="px-4 py-6 flex flex-1/2  w-full">
              {navigate === "profile" && (
                <UpdateProfile onClose={handleClose} />
              )}
              {navigate === "update-password" && (
                <UpdatePassword onClose={handleClose} />
              )}
              {navigate === "account" && <Account />}
            </div>
          </div>
        </Modal>
      )}
      {active === "delete-modal" && <DeleteAccount onClose={handleClose} />}
    </>
  );
}

export default Settings;
