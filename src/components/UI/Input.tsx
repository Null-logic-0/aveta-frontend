import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isTextArea?: boolean;
    isPassword?: boolean;
    isLabel?: boolean;
    label?: string;
    hasIcon?: boolean;
    icon?: React.ReactNode;
    error?: string;
  };

function Input({
  isTextArea,
  isPassword,
  error,
  isLabel,
  label,
  hasIcon,
  icon,
  id,
  name,
  type,
  placeholder,
  className,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;
  const isActualPassword = isPassword && !showPassword;
  const inputType = isActualPassword
    ? "password"
    : showPassword
    ? "text"
    : type || "text";

  const mergedClass = twMerge(
    `w-full border ${
      error ? "border-[#E50000]" : "border-[#3B3A3F]"
    }  font-medium text-sm rounded-[6px] resize-none ${
      hasIcon ? "pl-[42px]" : "px-3"
    } py-3 focus:border-white focus:outline-none`,
    className
  );

  return (
    <div className="flex flex-col gap-2">
      {isLabel && (
        <label htmlFor={inputId} className="font-semibold text-sm">
          {label}
        </label>
      )}

      {isTextArea ? (
        <textarea
          id={inputId}
          name={name}
          className={mergedClass}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <div className="flex items-center relative w-full">
          {hasIcon && <div className="absolute left-3">{icon}</div>}
          <input
            id={inputId}
            type={inputType}
            name={name}
            placeholder={placeholder}
            className={mergedClass}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              className="bg-transparent absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEye className="text-lg text-[#818DA2]" />
              ) : (
                <FiEyeOff className="text-lg text-[#818DA2]" />
              )}
            </button>
          )}
        </div>
      )}
      {error && <p className="text-sm text-[#E50000] font-medium">{error}</p>}
    </div>
  );
}

export default Input;
