import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type InputTextFieldProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export const InputTextField: React.FC<InputTextFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  defaultValue = "",
  disabled = false,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label.replace("*", "")}
              {label.includes("*") && (
                <span className="text-red-500 ml-0.5">*</span>
              )}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={isPassword && showPassword ? "text" : type}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full pr-10"
              />
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword
                    ? (
                        <EyeOff className="h-4 w-4" />
                      )
                    : (
                        <Eye className="h-4 w-4" />
                      )}
                </Button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputTextField;
