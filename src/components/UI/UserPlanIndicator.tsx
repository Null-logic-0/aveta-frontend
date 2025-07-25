import { useAuth } from "../../hooks/useAuth";

function UserPlanIndicator() {
  const { data } = useAuth();

  const userPlan = data?.data.data.UserPlan;
  return (
    <p
      className={`text-end fixed top-2 z-10 right-2 font-bold text-sm  max-md:hidden  ${
        userPlan === "premium" ? "text-[#FF4DC3] opacity-100" : "hidden"
      }`}
    >
      {userPlan?.toUpperCase()}
    </p>
  );
}

export default UserPlanIndicator;
