import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <p className="mb-4 text-gray-600">Enter your email to reset password.</p>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded mb-4 w-64"
      />
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-blue-500 underline"
      >
        Back to Login
      </button>
    </div>
  );
}
