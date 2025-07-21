import Input from "../UI/Input";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Heading from "../UI/Heading";
import AuthForm from "./AuthForm";
import Button from "../UI/Button";
import Separator from "../UI/Separator";
import GoogleOAuth from "./GoogleOAuth";
import AuthRedirectLink from "./AuthRedirectLink";

function SignUpForm() {
  return (
    <AuthForm className="resize-none">
      <div className="flex flex-col items-center gap-4">
        <Heading isTitle title="Join Now" />
        <Heading subTitle="The future is here. Your AI companion awaits." />
      </div>
      <Input
        isLabel
        label="User Name"
        placeholder="User Name"
        hasIcon
        icon={<FaRegUser className="text-lg text-[#818DA2]" />}
      />
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
      <Input
        isPassword
        isLabel
        label="Confirm Password"
        placeholder="Confirm password"
        hasIcon
        icon={<TbLockPassword className="text-2xl text-[#818DA2]" />}
      />
      <Button>Sign up</Button>
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
