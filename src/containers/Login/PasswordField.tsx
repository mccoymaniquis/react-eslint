import { InputTextField } from "@/components/InputTextField";

export default function PasswordField() {
  return (
    <InputTextField
      name="password"
      label="Password*"
      type="password"
      placeholder="Enter your password"
    />
  );
}
