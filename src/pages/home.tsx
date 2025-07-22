import Button from "../components/UI/Button";
import { useAuth } from "../hooks/useAuth";
import { useSignOut } from "../hooks/useSignOut";

function Home() {
  const { data } = useAuth();
  const { mutate, isPending } = useSignOut();
  const userName = data?.data?.data.userName;
  const email = data?.data?.data.email;

  return (
    <div>
      <h1>Home Page</h1>
      <p className="text-white">{userName}</p>
      <p className="text-white">{email}</p>
      <Button
        className="w-30"
        isPending={isPending}
        isDisabled={isPending}
        onClick={() => mutate()}
      >
        logout
      </Button>
    </div>
  );
}

export default Home;
