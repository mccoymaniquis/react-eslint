import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import PublicRoute from "@/components/PublicRoute";
import ForgotPassword from "@/containers/ForgotPassword";
import Home from "@/containers/Home";
import Login from "@/containers/Login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={(
          <PublicRoute>
            <Login />
          </PublicRoute>
        )}
      />
      <Route
        path="/forgot-password"
        element={(
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        )}
      />

      {/* Private route */}
      <Route
        path="/home"
        element={(
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )}
      />

      {/* Redirect root "/" to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Redirect unknown routes (like /qweqweqwe) to root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
