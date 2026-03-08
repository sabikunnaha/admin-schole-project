import { NavLink, Outlet, useLocation } from "react-router-dom";
import FormLogo from "../../../components/ui/FormLogo";


const Register = ({ submitted }) => {

    const location = useLocation();
    const isAdmission = location.pathname === "/register/admission";


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            {/* Card */}
            <div className="relative w-full max-w-md bg-white shadow-lg px-8 pt-12 pb-4 mt-16 mb-4   ">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <FormLogo></FormLogo>
                </div>

                {/* Tabs */}
                {!submitted && (
                    <div className="flex w-full gap-4 mb-6">

                        <NavLink
                            to="/register"
                            end
                            className={({ isActive }) =>
                                `flex-1 text-center h-[39px] flex items-center justify-center text-sm font-semibold transition
                ${isActive
                                    ? "bg-green-400 hover:bg-green-700 text-white"
                                    : "bg-purple-500 hover:bg-purple-700 text-white"
                                }`
                            }
                        >
                            School
                        </NavLink>

                        <NavLink
                            to="/register/admission"
                            className={({ isActive }) =>
                                `flex-1 text-center h-[39px] flex items-center justify-center text-sm font-semibold transition
                ${isActive
                                    ? "bg-green-400 hover:bg-green-700 text-white"
                                    : "bg-purple-500 hover:bg-purple-700 text-white"
                                }`
                            }
                        >
                            Admission
                        </NavLink>

                    </div>
                )}

                {/* Title */}
                {!isAdmission && (
                    <h2 className="text-base md:text-xl text-slate-600 font-bold text-center mb-6">
                        New School Registration
                    </h2>
                )}

                {/* Form */}
                <div className="space-y-4">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default Register;