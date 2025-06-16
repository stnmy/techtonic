import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi";

export default function RequireAdminAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) return null;

  if (!user || !user.roles?.includes("Admin")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
