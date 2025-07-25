import { useAuth } from "../hooks/useAuth";

function Welcome() {
  const { data } = useAuth();
  const user = data?.data.data;
  return (
    <div className="flex items-center gap-2 max-lg:hidden">
      <h1 className=" font-bold text-lg">Welcome back, {user?.userName} 👋</h1>
    </div>
  );
}

export default Welcome;
