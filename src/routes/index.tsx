import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import PublicRoute from "@/components/PublicRoute";
import Dashboard from "@/containers/Dashboard";
import EmployeeDetails from "@/containers/EmployeeDetails";
import EmploymentDetails from "@/containers/EmploymentDetails";
import ForgotPassword from "@/containers/ForgotPassword";
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
        path="/dashboard"
        element={(
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )}
      />
      <Route
        path="/employee-management/employee-details"
        element={(
          <PrivateRoute>
            <EmployeeDetails />
          </PrivateRoute>
        )}
      />
      <Route
        path="/employee-management/employment-details"
        element={(
          <PrivateRoute>
            <EmploymentDetails />
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
