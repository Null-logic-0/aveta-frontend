import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../UI/Spinner/Spinner";

type ProtectRoutesProps = {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
};

function ProtectRoutes({
  children,
  redirectIfAuthenticated,
}: ProtectRoutesProps) {
  const { token, isPending } = useAuth();
  const location = useLocation();

  if (token && isPending) {
    return (
      <div className="flex justify-center items-center  h-screen">
        <Spinner />
      </div>
    );
  }

  if (redirectIfAuthenticated && token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!redirectIfAuthenticated && !token) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default ProtectRoutes;
