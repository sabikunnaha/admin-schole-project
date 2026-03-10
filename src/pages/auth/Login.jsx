import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormLogo from "../../components/ui/FormLogo";
import LoginStep from "../../components/ui/auth/LoginStep";
import ForgetStep from "../../components/ui/auth/ForgetStep";
import OtpStep from "../../components/ui/auth/OtpStep";
import ResetStep from "../../components/ui/auth/ResetStep";
import { BiSupport } from "react-icons/bi";


const loginUser = (data) => {
  const { idNumber, password } = data;

  if (idNumber === "A001" && password === "123456") return "admin";
  if (idNumber === "T001" && password === "123456") return "teacher";
  if (idNumber === "S001" && password === "123456") return "school";
  if (idNumber === "SC001" && password === "123456") return "student";

  throw new Error("Invalid ID or Password");
};

export default function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // login | forget | otp | reset
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ idNumber: "", password: "" });
  const [forgetData, setForgetData] = useState({ idNumber: "", contact: "" });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  // OTP Timer
  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const togglePassword = () => setShowPassword(!showPassword);

  // ===== LOGIN HANDLER =====
  const handleLogin = async (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!formData.idNumber) tempErrors.idNumber = "ID Number required";
    if (!formData.password) tempErrors.password = "Password required";
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      // Placeholder: backend call
      const role = loginUser(formData); // dummy function
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("dummyID", formData.idNumber);

      alert(`Login Successful ✅ Role: ${role}`);

      switch (role) {
        case "admin": navigate("/admin/dashboard"); break;
        case "teacher": navigate("/teacher/dashboard"); break;
        case "school": navigate("/school/dashboard"); break;
        default: navigate("/student/dashboard");
      }
    } catch (err) {
      alert(err.message || "Login failed ❌");
    }
  };

  // ===== FORGET / OTP / RESET LOGIC =====
  const sendOtp = async () => {
    if (!forgetData.idNumber || !forgetData.contact) {
      alert("ID Number and Email/Phone required");
      return;
    }
    // Placeholder API call
    await sendOtpApi(forgetData);
    setTimer(60);
    alert("OTP sent ✅ (check console for dummy OTP)");
    setStep("otp");
  };

  const resendOtp = async () => {
    await sendOtpApi(forgetData);
    setTimer(60);
    alert("OTP resent ✅");
  };

  const verifyOtp = async () => {
    const valid = await verifyOtpApi(otp);
    if (valid) {
      alert("OTP verified ✅");
      setStep("reset");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    await resetPasswordApi(newPassword); // placeholder
    alert("Password reset successful ✅");
    setStep("login");
  };

  const cardClasses = "bg-white shadow-lg px-10 py-10 animate-fade-in-up relative my-20";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="max-w-[400px] w-full">
        <div className={cardClasses}>
          <FormLogo />

          {step === "login" && (
            <LoginStep
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleLogin={handleLogin}
              togglePassword={togglePassword}
              showPassword={showPassword}
              goToForget={() => setStep("forget")}
            />
          )}

          {step === "forget" && (
            <ForgetStep
              forgetData={forgetData}
              setForgetData={setForgetData}
              sendOtp={sendOtp}
              goToLogin={() => setStep("login")}
            />
          )}

          {step === "otp" && (
            <OtpStep
              otp={otp}
              setOtp={setOtp}
              timer={timer}
              verifyOtp={verifyOtp}
              goBack={() => setStep("forget")}
              resendOtp={resendOtp}
            />
          )}

          {step === "reset" && (
            <ResetStep
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleResetPassword={handleResetPassword}
              goBack={() => setStep("otp")}
              error={error}
            />
          )}



          {/* ===== REGISTER LINK ===== */}
          <p className="h-[39px] border border-gray-300 flex items-center justify-center text-sm text-gray-500 mt-6">
            <Link to="register">
              Don’t have an account?{" "}
              <span className="text-blue-600 font-semibold ml-1">Register</span>
            </Link>
          </p>

          {/* ===== SOCIAL ===== */}
          <div className="mt-4 text-center">
            <div class="flex items-center pt-4 space-x-1">
              <div class="flex-1 h-px sm:w-12 dark:bg-gray-300"></div>
              <p class="px-3 text-sm dark:text-gray-400">Join with us</p>
              <div class="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>
            <div className="flex justify-center gap-2">
              <div className="text-blue-600 text-2xl p-1 md:p-1 flex justify-center items-center border-gray-200 border rounded-full ">
                <FaFacebookF />
              </div>
              <div className="text-green-500  text-2xl p-1 md:p-1 flex justify-center items-center border-gray-200 border rounded-full ">
                <FaWhatsapp />
              </div>
              <div className="text-gray-700 text-2xl p-1 md:p-1 flex justify-center items-center border-gray-200 border  rounded-full ">
                <BiSupport />
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
}