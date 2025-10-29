/* eslint-disable no-console */
/* eslint-disable no-alert */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";

import PasswordField from "./PasswordField";
import UsernameField from "./UserNameField";

// ✅ Validation schema
const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { userName: "", password: "" },
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
        <h1 className="text-2xl sm:text-3xl font-semibold">HRIS - LOGIN</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <UsernameField />
              <PasswordField />

              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" className="w-full text-black">
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
