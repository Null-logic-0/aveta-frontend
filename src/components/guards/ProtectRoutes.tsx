import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

type ProtectRoutesProps = {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
};

function ProtectRoutes({
  children,
  redirectIfAuthenticated,
}: ProtectRoutesProps) {
  const { token } = useAuth();
  const location = useLocation();

  if (redirectIfAuthenticated && token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!redirectIfAuthenticated && !token) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default ProtectRoutes;
