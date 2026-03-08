import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import Input from "../../../components/ui/formFields/Input";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/formFields/Select";

const SchoolRegiForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        schoolName: "",
        address: "",
        id: "",
        eiin: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        logo: null,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // ✅ Email Regex
    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // ✅ Validation
    const validateForm = () => {
        const {
            schoolName,
            address,
            id,

            mobile,
            email,
            password,
            confirmPassword,
            logo,
        } = formData;

        if (
            !schoolName ||
            !address ||
            !id ||

            !mobile ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all required fields.");
            return false;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        if (logo) {
            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/jpg",
                "application/pdf",
            ];

            if (!allowedTypes.includes(logo.type)) {
                setError("Only PNG, JPG, JPEG or PDF files are allowed.");
                return false;
            }

            if (logo.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB.");
                return false;
            }
        }

        setError("");
        return true;
    };
    // ✅ Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Demo auth save
        localStorage.setItem(
            "schoolAuth",
            JSON.stringify({
                id: formData.id,
                password: formData.password,
            })
        );

        setSuccess("School registered successfully. Redirecting to login...");
        const successData = {
            schoolName: formData.schoolName,
            id: formData.id,
            mobile: formData.mobile,
            password: formData.password,
        };

        navigate("/schoolsuccess", {
            state: successData,
        });
    };

    useEffect(() => {
        // Only generate if id is empty
        if (!formData.id) {
            const generatedId = Math.floor(10000000 + Math.random() * 90000000); // 8 digit
            setFormData((prev) => ({ ...prev, id: generatedId.toString() }));
        }
    }, []);


    return (
        <>
            <form className="space-y-4 px-5" onSubmit={handleSubmit}>
                <Input label="School name" name="schoolName" value={formData.schoolName} onChange={handleChange} />

                {/* dropdrawn */}
                <div className="space-y-4">
                    <Select
                        type="select"
                        label="Division"
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                        options={["Dhaka", "Chattogram"]}
                    />

                    <Select
                        type="select"
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        options={["Gazipur", "Comilla"]}
                    />

                    <Select
                        type="select"
                        label="Upazila"
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        options={["Savar", "Sonargaon"]}
                    />
                </div>


                <Input label="Village" name="address" value={formData.address} onChange={handleChange} />

                <div className="grid grid-cols-2 gap-4">
                    <Input label="ID number" name="id" value={formData.id} onChange={handleChange} />
                    <Input label="EIIN number" name="eiin" value={formData.eiin} onChange={handleChange} />
                </div>

                <Input label="Mobile number" name="mobile" value={formData.mobile} onChange={handleChange} />
                <Input label="Email address" name="email" value={formData.email} onChange={handleChange} />
                <div className="relative">
                    <Input type={showPassword ? "text" : "password"} label="Password" name="password" value={formData.password} onChange={handleChange} />
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="relative">
                    <Input type={showConfirmPassword ? "text" : "password"} label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Select Subscription Plan */}

                <h2 className="text-gray-500 text-[12px] border-b-[1px]">Select Subscription Plan</h2>

                <div className="space-y-4">
                    <Select
                        type="select"
                        label="Select package"
                        name="select package"
                        value={formData.district}
                        onChange={handleChange}
                        options={["Select package", "Basic", "Standad", "primiam", "Advance"]}
                    />

                    <Select
                        type="select"
                        label="Duration"
                        name="duration"
                        value={formData.upazila}
                        onChange={handleChange}
                        options={["2 Month", "3 Month", "4 Month"]}
                    />

                </div>


                <div className="text-[12px] text-gray-500 p-2 border-dashed border-2">
                    <p>Total Parice: 0 TK</p>
                    <p>Discount Parice: 0 TK</p>
                </div>

                {/* Upload */}
                <div className="relative">
                    {!formData.logo ? (
                        <label className="flex flex-col items-center justify-center  border border-dashed  h-18 cursor-pointer text-gray-500 hover:border-indigo-600 transition-all duration-300">

                            <span className="text-xs flex items-center gap-2 "> <TfiGallery /> Upload School Logo</span>
                            <span className="text-xs text-gray-400">
                                PNG, JPG, PDF
                            </span>

                            <input
                                type="file"
                                name="logo"
                                accept=".png,.jpg,.jpeg,.pdf"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <div className="relative h-18 border border-gray-300  p-1 flex items-center justify-center gap-4 bg-gray-50">
                            {/* Image Preview */}
                            {formData.logo.type.startsWith("image/") ? (
                                <img
                                    src={URL.createObjectURL(formData.logo)}
                                    alt="Preview"
                                    className="w-12 h-12 object-cover "
                                />
                            ) : (
                                <div className="w-20 h-20 flex items-center justify-center bg-indigo-100 text-indigo-600  font-semibold">
                                    PDF
                                </div>
                            )}

                            {/* File Info */}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700 truncate">
                                    {formData.logo.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {(formData.logo.size / 1024).toFixed(1)} KB
                                </p>
                            </div>

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, logo: null }))
                                }
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>


                {/* Error / Success */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center">{success}</p>}

                {/* Pricing */}

                

                <Button
                    type="submit"
                    className="w-full "
                >
                    Registration
                </Button>
            </form>

            <p className="text-center border border-gray-300 text-sm  h-[39px] leading-8 text-gray-600 mt-9">
                Already have an account?
                <Link to="/" className="text-indigo-600 font-semibold ml-1 hover:underline">
                    Sign In
                </Link>
            </p>

            <style>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
         
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,.25);
        }
      `}</style>
        </>
    );
};

export default SchoolRegiForm;