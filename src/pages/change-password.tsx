import AuthForm from "../components/authentication/AuthForm";
import { TbLockPassword } from "react-icons/tb";
import Heading from "../components/UI/Heading";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router";

function ChangePassword() {
  const navigate = useNavigate();

  function handleCancelOperation() {
    navigate("/sign-in");
  }
  return (
    <main className="h-screen flex justify-center items-center w-full p-4">
      <AuthForm className="resize-none">
        <div className="flex flex-col items-center gap-4">
          <Heading isTitle title="Change password" />
        </div>

        <Input
          isPassword
          isLabel
          label="Enter Password"
          placeholder="Enter password"
          hasIcon
          icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
        />
        <Input
          isPassword
          isLabel
          label="Confirm Password"
          placeholder="Confirm password"
          hasIcon
          icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
        />
        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            buttonType="outline"
            type="button"
            onClick={handleCancelOperation}
          >
            Cancel
          </Button>
          <Button buttonType="fill">Save</Button>
        </div>
      </AuthForm>
    </main>
  );
}

export default ChangePassword;
