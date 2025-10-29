import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = localStorage.getItem("token");

  // ✅ If user already logged in, redirect to home
  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
