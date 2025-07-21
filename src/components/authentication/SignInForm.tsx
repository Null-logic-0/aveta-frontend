import Button from "../UI/Button";
import Heading from "../UI/Heading";
import Input from "../UI/Input";
import Separator from "../UI/Separator";
import AuthForm from "./AuthForm";
import AuthRedirectLink from "./AuthRedirectLink";
import GoogleOAuth from "./GoogleOAuth";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

function SignInForm() {
  return (
    <AuthForm className="resize-none">
      <div className="flex flex-col items-center gap-4">
        <Heading isTitle title="Sign in" />
      </div>

      <Input
        isLabel
        type="email"
        label="Email"
        placeholder="Enter email"
        hasIcon
        icon={<MdOutlineEmail className="text-xl text-[#818DA2]" />}
      />
      <Input
        isPassword
        isLabel
        label="Enter Password"
        placeholder="Enter password"
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />

      <Button>Sign in</Button>
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
