import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Input({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  error,
  required = false,
  icon: Icon,
  disabled = false,
  className = "",
  step,
  ...rest
}) {
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      {/* Icon */}
      {Icon && (
        <Icon
          className={`absolute left-2 top-1/2 -translate-y-1/2 text-sm
          ${darkMode ? "text-gray-200" : "text-gray-500"}`}
        />
      )}

      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        step={step}
        autoComplete="off"
        disabled={disabled}
        {...rest}
        className={`
        peer h-[39px] w-full text-[12px] border
        ${Icon ? "pl-7 pr-7" : "px-2"}
        focus:outline-none transition

        ${
          darkMode
            ? "bg-gray-500 text-white border-gray-600"
            : "bg-white text-gray-600 border-gray-300"
        }

        ${error ? "border-red-500" : ""}
        ${className}
        `}
      />

      {/* Label */}
      <label
        className={`
        absolute text-xs left-2 top-1/2 -translate-y-1/2
        pointer-events-none transition-all duration-200 px-1

        ${darkMode ? "text-white bg-gray-500" : "text-gray-600 bg-white"}

        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:-translate-y-1/2

        peer-focus:-top-0.5
        peer-not-placeholder-shown:-top-2
      `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Password toggle */}
      {type === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-sm"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}