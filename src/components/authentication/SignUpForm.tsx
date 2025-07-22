import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import Input from "../UI/Input";
import Heading from "../UI/Heading";
import AuthForm from "./AuthForm";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import GoogleOAuth from "./GoogleOAuth";
import AuthRedirectLink from "./AuthRedirectLink";
import { useAuthMutation } from "../../hooks/useAuthMutation";
import { signup } from "../../util/http";

function SignUpForm() {
  const { mutate, formErrors, isPending, data } = useAuthMutation(signup, {
    redirectTo: "/",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const data = {
      userName: rawData.userName as string,
      email: rawData.email as string,
      password: rawData.password as string,
      passwordConfirm: rawData.passwordConfirm as string,
    };

    mutate(data);
  }

  return (
    <AuthForm className="resize-none" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4">
        <Heading isTitle title="Join Now" />
        <Heading subTitle="The future is here. Your AI companion awaits." />
      </div>
      <Input
        isLabel
        error={formErrors?.userName}
        name="userName"
        label="User Name"
        placeholder="User Name"
        defaultValue={data?.data.user?.userName ?? ""}
        hasIcon
        icon={<FaRegUser className="text-lg text-[#818DA2]" />}
      />
      <Input
        isLabel
        error={formErrors?.email}
        type="email"
        name="email"
        label="Email"
        placeholder="Enter email"
        defaultValue={data?.data.user?.email ?? ""}
        hasIcon
        icon={<MdOutlineEmail className="text-xl text-[#818DA2]" />}
      />
      <Input
        isPassword
        error={formErrors?.password}
        name="password"
        isLabel
        label="Enter Password"
        placeholder="Enter password"
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />
      <Input
        isPassword
        error={formErrors?.passwordConfirm}
        name="passwordConfirm"
        isLabel
        label="Confirm Password"
        placeholder="Confirm password"
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />
      <Button isDisabled={isPending} isPending={isPending}>
        {isPending ? "Creating account..." : "Sign up"}
      </Button>
      <Separator />
      <GoogleOAuth />
      <AuthRedirectLink
        text="Already have an account?"
        link="/sign-in"
        linkText="Sign in"
      />
    </AuthForm>
  );
}

export default SignUpForm;
