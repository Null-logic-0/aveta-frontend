import { useAuth } from "../../hooks/useAuth";

function UserPlanIndicator() {
  const { data } = useAuth();

  const userPlan = data?.data.data.UserPlan;
  return (
    <p
      className={`text-end  font-bold text-sm  absolute top-2 right-2  ${
        userPlan === "premium" || userPlan === "basic"
          ? "text-[#FF4DC3] opacity-100"
          : "hidden"
      }`}
    >
      {userPlan?.toUpperCase()}
    </p>
  );
}

export default UserPlanIndicator;
