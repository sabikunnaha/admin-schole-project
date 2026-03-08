import { useTheme } from "../../../contexts/ThemeContext";

export default function Input({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  error,
  disabled = false,
  className = "",
  step,
  ...rest
}) {
  const { darkMode } = useTheme();

  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        step={step}
        autoComplete="off"
        disabled={disabled}
        {...rest}
        className={`
          peer h-[39px] w-full px-2 text-[12px] border focus:outline-none
          ${
            darkMode
              ? "bg-gray-500 text-white border-gray-600"
              : "bg-white text-gray-600 border-gray-300"
          }
          ${error ? "border-red-500" : ""}
          ${className}
        `}
      />

      <label
        className={`
          absolute text-xs left-2 top-1/2 -translate-y-1/2 text-[12px]
          pointer-events-none transition-all duration-200
          ${darkMode ? "text-white" : "text-gray-600"}

          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2

          peer-focus:-top-1
          peer-focus:px-1

          peer-not-placeholder-shown:-top-1
          peer-not-placeholder-shown:px-1
        `}
      >
        {label}
      </label>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}