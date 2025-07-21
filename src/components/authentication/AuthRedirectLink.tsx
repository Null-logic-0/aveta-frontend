import { Link } from "react-router";

type AuthRedirectLinkProps = {
  link: string;
  linkText: string;
  text: string;
};
function AuthRedirectLink({ link, text, linkText }: AuthRedirectLinkProps) {
  return (
    <p className="text-sm font-medium text-center text-[#94A2B8]">
      {text}{" "}
      <Link
        to={link}
        className="underline underline-offset-3 font-semibold text-white"
      >
        {linkText}
      </Link>
    </p>
  );
}

export default AuthRedirectLink;
