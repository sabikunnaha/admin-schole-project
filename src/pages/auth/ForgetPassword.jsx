import { useState } from "react";
import formLogo from "../../assets/images/form-logo.jpg";
import { Link } from "react-router";


const ForgetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
    };
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">

            {/* Card */}
            <div className="max-w-[400px] w-full items-center justify-center">
                <div className="bg-white shadow-lg px-8 py-12 animate-fade-in-up relative my-20">

                    {/* Avatar Circle - overlaps top */}
                    <div className="animate-fade-in-up relative mb-7">
                        <div className="w-24 h-24 mx-auto rounded-full border border-blue-500 flex items-center justify-center shadow-lg mb-6
                        animate-fadeInScale
                       hover:scale-110
                       hover:rotate-6
                       transition-transform
                       duration-500
                       ease-in-out absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       " style={{ marginTop: "-48px", marginBottom: "12px" }}>
                            <img
                                src={formLogo}
                                alt="Logo"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center font-bold text-gray-800 mb-6"
                        style={{ fontSize: 22, letterSpacing: 0.5, }}>
                        Login
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        {/* ID Number */}
                        <div className="mb-6">
                            <input
                                type="text"
                                required="Number"
                                placeholder="ID Number"
                                value={idNumber}
                                onChange={e => setIdNumber(e.target.value)}
                                onFocus={() => setFocused("id")}
                                onBlur={() => setFocused("")}
                                className="w-full px-4 py-2 h-[38px] outline-none text-gray-700 text-sm"
                                style={{
                                    border: focused === "id" ? "1.5px solid #2563eb" : "1.5px solid #d1d5db",
                                    background: "#fafbff",
                                    transition: "border 0.2s",

                                }}
                            />
                        </div>

                        {/* Email or Phone */}
                        <div className="mb-6 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Email or Phone"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onFocus={() => setFocused("pw")}
                                onBlur={() => setFocused("")}
                                className="w-full px-4 py-2 h-[39px]  outline-none text-gray-700 text-sm pr-10"
                                style={{
                                    border: focused === "pw" ? "1.5px solid #2563eb" : "1.5px solid #d1d5db",
                                    background: "#fafbff",
                                    transition: "border 0.2s",

                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute h-[39px] right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                                style={{ background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}>
                                {showPassword ? (
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Buttons Row */}
                        <div className="flex gap-3 mb-6">
                            <Link to={'forget'}
                                type="button"
                                className="flex-1 h-[39px] py-2 font-semibold text-white text-sm"
                                style={{
                                    background: "#2563eb",
                                    cursor: "pointer",
                                    border: "none",
                                    transition: "background 0.2s, transform 0.1s",
                                    letterSpacing: 0.3
                                }}
                                onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                                Login
                            </Link>
                            <button
                                type="submit"
                                className="flex-1 py-2 h-[39px] font-semibold text-white text-sm flex items-center justify-center gap-2"
                                style={{
                                    background: loading ? "#93c5fd" : "#2563eb",
                                    fontFamily: "'Segoe UI', sans-serif",
                                    cursor: "pointer",
                                    border: "none",
                                    transition: "background 0.3s, transform 0.1s",
                                    letterSpacing: 0.3
                                }}
                                onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                                        </svg>
                                        <span>Loading...</span>
                                    </>
                                ) : "Login"}
                            </button>
                        </div>

                        {/* Register row */}
                        <p className="h-8 border border-gray-300 flex items-center justify-center text-sm text-gray-500 mt-6">
                            <Link to="register">
                                Don’t have an account?{" "}
                                <span className="text-blue-600 font-semibold ml-1">Register</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ForgetPassword;