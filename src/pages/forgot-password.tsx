import { useNavigate } from "react-router";
import AuthForm from "../components/authentication/AuthForm";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import Input from "../components/UI/Input";
import { MdOutlineEmail } from "react-icons/md";

function ForgotPassword() {
  const navigate = useNavigate();
  function handleCancelOperation() {
    navigate("/sign-in");
  }
  function submitHandler() {
    navigate("/success");
  }
  return (
    <main className="h-screen flex justify-center items-center w-full p-4">
      <AuthForm className="resize-none" onSubmit={submitHandler}>
        <div className="flex flex-col items-center gap-4">
          <Heading isTitle title="Forgot password" />
        </div>

        <Input
          isLabel
          type="email"
          label="Email"
          placeholder="Enter email"
          hasIcon
          icon={<MdOutlineEmail className="text-xl text-[#818DA2]" />}
        />
        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            buttonType="outline"
            type="button"
            onClick={handleCancelOperation}
          >
            Cancel
          </Button>
          <Button buttonType="fill">Send</Button>
        </div>
      </AuthForm>
    </main>
  );
}

export default ForgotPassword;
