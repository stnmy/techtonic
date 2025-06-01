import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
