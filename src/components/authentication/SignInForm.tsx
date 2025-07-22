import Button from "../UI/Button";
import Heading from "../UI/Heading";
import Input from "../UI/Input";
import Separator from "../UI/Separator";
import AuthForm from "./AuthForm";
import AuthRedirectLink from "./AuthRedirectLink";
import GoogleOAuth from "./GoogleOAuth";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router";
import { useAuthMutation } from "../../hooks/useAuthMutation";
import { signin } from "../../util/http";

function SignInForm() {
  const { mutate, formErrors, isPending } = useAuthMutation(signin, {
    redirectTo: "/",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const data = {
      email: rawData.email as string,
      password: rawData.password as string,
    };

    mutate(data);
  }
  return (
    <AuthForm className="resize-none" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4">
        <Heading isTitle title="Sign in" />
      </div>

      <Input
        isLabel
        type="email"
        error={formErrors?.email}
        label="Email"
        name="email"
        placeholder="Enter email"
        hasIcon
        icon={<MdOutlineEmail className="text-xl text-[#818DA2]" />}
      />
      <Input
        isPassword
        error={formErrors?.password}
        isLabel
        name="password"
        label="Enter Password"
        placeholder="Enter password"
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />

      <Button isDisabled={isPending} isPending={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
      <Link
        to="/forgot-password"
        className="text-sm font-semibold opacity-50 hover:opacity-100 underline"
      >
        Forgot password ?
      </Link>
      <Separator />
      <GoogleOAuth />
      <AuthRedirectLink
        text="Don't have an account?"
        link="/sign-up"
        linkText="Sign up"
      />
    </AuthForm>
  );
}

export default SignInForm;
