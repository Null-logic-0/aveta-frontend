import { useAuth } from "../../hooks/useAuth";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { close, open } from "../../store/UI-slice";
import { useNavigate } from "react-router";

function Account() {
  const { data } = useAuth();
  const user = data?.data.data;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOpen = async () => dispatch(open("delete-modal"));
  return (
    <>
      <div className="flex flex-col w-full pt-6 gap-6 items-end">
        <div className="flex w-full items-center rounded-xl bg-[#131316] p-3  justify-between">
          <div className="flex flex-col">
            <p className="text-white/50 text-sm">Your current plan</p>
            <p className="text-white font-semibold text-sm">
              {user?.UserPlan.toUpperCase()}
            </p>
          </div>
          <Button
            className="text-white w-[30%]"
            onClick={() => {
              navigate("/prices");
              dispatch(close());
            }}
          >
            Upgrade
          </Button>
        </div>
        <Button
          onClick={handleOpen}
          buttonType="outline"
          className="text-red-700 border-red-700 w-[40%] max-md:w-[50%]"
        >
          Delete account
        </Button>
      </div>
    </>
  );
}

export default Account;
