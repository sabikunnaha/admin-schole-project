import { useState } from "react";
import loginLogo from "../../assets/images/login-logo.jpg";

const cardClasses =
    "bg-white shadow-lg px-8 py-12 animate-fade-in-up relative my-20";
const titleClasses = "text-lg font-bold text-gray-600 text-center mb-6";
const inputWrapper = "relative";
const buttonFull = "w-full";

const Login = () => {

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
                    <div className=" animate-fade-in-up relative">
                        <div className="w-24 h-24 mx-auto rounded-full border border-blue-500 flex items-center justify-center shadow-lg mb-6
                        animate-fadeInScale
                       hover:scale-110
                       hover:rotate-6
                       transition-transform
                       duration-500
                       ease-in-out absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       " style={{ marginTop: "-48px", marginBottom: "12px" }}>
                            <img
                                src={loginLogo}
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
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="ID Number"
                                value={idNumber}
                                onChange={e => setIdNumber(e.target.value)}
                                onFocus={() => setFocused("id")}
                                onBlur={() => setFocused("")}
                                className="w-full px-4 py-2 h-[40px] outline-none text-gray-700 text-sm"
                                style={{
                                    border: focused === "id" ? "1.5px solid #2563eb" : "1.5px solid #d1d5db",
                                    background: "#fafbff",
                                    transition: "border 0.2s",
                                    
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-5 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onFocus={() => setFocused("pw")}
                                onBlur={() => setFocused("")}
                                className="w-full px-4 py-2 h-[40px]  outline-none text-gray-700 text-sm pr-10"
                                style={{
                                    border: focused === "pw" ? "1.5px solid #2563eb" : "1.5px solid #d1d5db",
                                    background: "#fafbff",
                                    transition: "border 0.2s",
                                    
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute h-[40px] right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
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
                        <div className="flex gap-3 mb-4">
                            <button
                                type="button"
                                className="flex-1 h-[40px] py-2 font-semibold text-white text-sm"
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
                                Forget
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2 h-[40px] font-semibold text-white text-sm flex items-center justify-center gap-2"
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
                        <div className="mb-5">
                            <div className="flex items-center justify-center gap-1 py-2 text-sm h-[40px] "
                                style={{ border: "1.5px solid #e5e7eb", background: "#fafbff" }}>
                                <span className="text-gray-500">
                                    Don't have an account?
                                </span>
                                <button type="button"
                                    className="font-semibold"
                                    style={{
                                        color: "#2563eb", background: "none", border: "none",
                                        cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                                        textDecoration: "underline", textUnderlineOffset: 2
                                    }}>
                                    Register
                                </button>
                            </div>
                        </div>

                        {/* Social */}
                        <p className="text-center text-gray-500 text-xs mb-3">
                            Join our Group
                        </p>
                        <div className="flex justify-center gap-4">
                            {/* Facebook */}
                            <button type="button"
                                className="flex items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95"
                                style={{ width: 44, height: 44, background: "#1877f2", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(24,119,242,0.3)" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </button>
                            {/* WhatsApp */}
                            <button type="button"
                                className="flex items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95"
                                style={{ width: 44, height: 44, background: "#25d366", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(37,211,102,0.3)" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col justify-center  items-center text-gray-500 text-xs mt-6">
                            <h2 className=" items-center">Help Line(24/7)</h2>
                            <h2 className=" items-center">09606102050</h2>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;