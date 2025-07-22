import { useNavigate } from "react-router";
import AuthForm from "../components/authentication/AuthForm";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import Input from "../components/UI/Input";
import { MdOutlineEmail } from "react-icons/md";
import { useForgotPassword } from "../hooks/useForgotPassword";

function ForgotPassword() {
  const navigate = useNavigate();
  const { mutate, isPending } = useForgotPassword();

  function handleCancelOperation() {
    navigate("/sign-in");
  }
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      email: rawData.email as string,
    };

    mutate(data);
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
          required
          name="email"
          label="Email"
          placeholder="Enter email"
          hasIcon
          icon={<MdOutlineEmail className="text-xl text-[#818DA2]" />}
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
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </AuthForm>
    </main>
  );
}

export default ForgotPassword;
