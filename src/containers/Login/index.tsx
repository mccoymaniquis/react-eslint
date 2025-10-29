/* eslint-disable no-console */
/* eslint-disable no-alert */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { LoginFormValues } from "@/types/login";

import {
  Form,
} from "@/components/ui/form";
import { DEFAULT_LOGIN } from "@/constants/login";
import { loginSchema } from "@/validations/login";

import ForgotPassword from "./ForgotPassword";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import UsernameField from "./UserNameField";

export default function Login() {
  const [error, setError] = useState("");

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: DEFAULT_LOGIN,
  });

  const onSubmit = (data: LoginFormValues) => {
    try {
      console.log("Logging in with:", data);
      localStorage.setItem("token", "dummy_token");
      window.location.href = "/home";
      alert("✅ Login successful!");
    }
    catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">HRIS - LOGIN</h1>
        <div className="pt-2">
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <UsernameField />
              <PasswordField />

              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              <ForgotPassword />

              <SubmitButton />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
