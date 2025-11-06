import { X } from "lucide-react";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  disabled?: boolean;
};

const SearchField: React.FC<SearchFieldProps> = ({
  name,
  placeholder = "Search...",
  onSearch,
  disabled = false,
}) => {
  const { control, setValue } = useFormContext();

  const handleClear = (onChange: (v: string) => void) => {
    onChange("");
    setValue(name, "");
    onSearch?.("");
  };

  return (
    <div className="flex flex-col gap-1 w-full">

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="relative flex items-center">
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearch?.(field.value);
                }
              }}
              className="pr-8"
            />
            {field.value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleClear(field.onChange)}
                className="absolute right-1 h-7 w-7 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SearchField;
