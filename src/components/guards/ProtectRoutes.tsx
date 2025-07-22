import { Navigate } from "react-router";
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

  if (redirectIfAuthenticated && token) {
    return <Navigate to="/" replace />;
  }

  if (!redirectIfAuthenticated && !token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectRoutes;
