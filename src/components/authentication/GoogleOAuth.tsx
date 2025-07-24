import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { GOOGLE_ID } from "../../constants/url.constants";
import toast from "react-hot-toast";
import Button from "../UI/Button";
import { FaGoogle } from "react-icons/fa";
import { useRef } from "react";

function GoogleAuth() {
  const { mutate } = useGoogleAuth();
  const googleLoginRef = useRef<HTMLDivElement>(null);

  const handleGoogleResponse = (response: CredentialResponse) => {
    if (response.credential) {
      mutate({ credential: response.credential });
    }
  };

  const triggerGoogleLogin = () => {
    const button = googleLoginRef.current?.querySelector(
      "div[role=button]"
    ) as HTMLElement;
    button?.click();
  };

  return (
    <div className="flex justify-center items-center ">
      <div hidden ref={googleLoginRef}>
        <GoogleOAuthProvider clientId={GOOGLE_ID}>
          <GoogleLogin
            size="large"
            shape="square"
            onSuccess={handleGoogleResponse}
            onError={() => {
              toast.error("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
      <Button type="button" buttonType="outline" onClick={triggerGoogleLogin}>
        <FaGoogle className="text-xl" />
        Sign in with google
      </Button>
    </div>
  );
}

export default GoogleAuth;
