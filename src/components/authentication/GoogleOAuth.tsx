import { GoogleOAuthProvider } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

function GoogleOAuth() {
  return (
    <GoogleOAuthProvider clientId={""}>
      <button
        onClick={() => {}}
        className="flex items-center cursor-pointer hover:opacity-50 justify-center border border-[#3B3A3F] gap-2 rounded-[6px] py-3 px-2 w-full "
      >
        <FcGoogle className="text-2xl" />
        <span className="text-sm font-semibold">Sign up with Google</span>
      </button>
    </GoogleOAuthProvider>
  );
}

export default GoogleOAuth;
