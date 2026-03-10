import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Input from "../ui/formFields/Input";


export default function ResetModal({ onClose, redirectPath = "/school/dashboard" }) {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile: "",
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);

  const handleCancel = () => {
    onClose();
    navigate(redirectPath);
  };

  const handleReset = () => {
    console.log("Reset data:", formData);
    // API call to reset account goes here
    onClose();
    navigate(redirectPath);
  };

  return (
    // Outer backdrop with click to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleCancel}  // click outside closes modal
    >
      {/* Inner modal container: stop click from propagating */}
      <div
        className={`relative w-full m-4 max-w-sm p-8 pt-10 shadow-lg flex flex-col
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}  // Prevent modal click from closing
      >
        {/* Close button horizontally centered at top */}
        <button
          onClick={onClose}
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-300 text-white rounded-full h-5 w-5 leading-none transition ${
            darkMode
              ? "text-gray-400 hover:text-gray-300"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          ✕
        </button>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4 mt-8">
            <h2 className="text-sm font-semibold ">Are you sure you want to reset your account?</h2>
            <p className="text-sm ">All data will be permanently deleted.</p>
            <Input label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
            <Input label="ID Number" name="id" value={formData.id} onChange={handleChange} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCancel}
                className={`flex-1 py-1 border ${
                  darkMode
                    ? "border-gray-500 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button onClick={handleNext} className="flex-1 py-1 bg-blue-600 hover:bg-blue-700 text-white">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4 mt-2">
            <h2 className="text-lg font-semibold text-center">Reset Form</h2>
            <p className="text-sm text-center">Please confirm your information:</p>

            <Input label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
            <Input label="ID Number" name="id" value={formData.id} onChange={handleChange} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCancel}
                className={`flex-1 py-1 border ${
                  darkMode
                    ? "border-gray-500 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button onClick={handleReset} className="flex-1 py-1 bg-red-600 hover:bg-red-700 text-white">
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
