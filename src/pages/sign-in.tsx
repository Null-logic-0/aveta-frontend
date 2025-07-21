import AuthLayout from "../components/authentication/AuthLayout";
import SignInForm from "../components/authentication/SignInForm";

function SignIn() {
  return (
    <AuthLayout className="h-screen">
      <SignInForm />
    </AuthLayout>
  );
}

export default SignIn;
