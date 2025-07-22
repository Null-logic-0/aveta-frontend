import AuthForm from "../components/authentication/AuthForm";
import { TbLockPassword } from "react-icons/tb";
import Heading from "../components/UI/Heading";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router";
import { useChangePassword } from "../hooks/useChangePassword";

function ChangePassword() {
  const navigate = useNavigate();
  const { isPending, mutate } = useChangePassword();

  function handleCancelOperation() {
    navigate("/sign-in");
  }
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      newPassword: rawData.newPassword as string,
      confirmPassword: rawData.confirmPassword as string,
    };
    mutate(data);
  }
  return (
    <main className="h-screen flex justify-center items-center w-full p-4">
      <AuthForm className="resize-none" onSubmit={submitHandler}>
        <div className="flex flex-col items-center gap-4">
          <Heading isTitle title="Change password" />
        </div>

        <Input
          isPassword
          name="newPassword"
          required
          isLabel
          label="Enter Password"
          placeholder="Enter password"
          hasIcon
          icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
        />
        <Input
          isPassword
          isLabel
          required
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm password"
          hasIcon
          icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
        />
        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            isDisabled={isPending}
            buttonType="outline"
            type="button"
            onClick={handleCancelOperation}
          >
            Cancel
          </Button>
          <Button isDisabled={isPending} isPending={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </AuthForm>
    </main>
  );
}

export default ChangePassword;
