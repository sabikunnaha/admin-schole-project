import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import { useTheme } from "../../../contexts/ThemeContext";
import Input from "../formFields/Input";

const Step4 = ({ formData, handleChange }) => {

    const { darkMode } = useTheme();
    const [showPassword, setShowPassword] = useState({
        password: false,
        newpassword: false,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        handleChange(e);
        setPreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setPreview(null);
        handleChange({ target: { name: "photo", value: null } });
    };

    useEffect(() => {
        if (!formData.idNumber) {
            handleChange({
                target: {
                    name: "idNumber",
                    value: Math.floor(10000000 + Math.random() * 90000000),
                },
            });
        }
    }, []);
    return (
        <div
            className={`space-y-4 animate-fadeIn ${darkMode ? "text-gray-200" : "text-gray-700"}`}
        >
            <p
                className={`text-xs text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
                Please provide the student information.
            </p>

            {/* Student Info Inputs */}
            {[
                { label: "Student name", name: "studentname" },
                { label: "Father name", name: "father" },
                { label: "Mother name", name: "mother" },
            ].map((field) => (
                <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    inputClassName={`py-1 ${darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                        }`}
                />
            ))}
            {[{ label: "ID number", name: "idNumber" }].map((field) => (
                <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    inputClassName={` ${darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                        }`}
                />
            ))}

            {/* Current Location */}
            <LocationSelect
                darkMode={darkMode}
                formData={formData}
                handleChange={handleChange}
                title="Current Location"
                fields={[
                    {
                        name: "currentDivision",
                        label: "Division",
                        type: "select",
                        options: ["Dhaka", "Chattogram"],
                    },
                    {
                        name: "currentDistrict",
                        label: "District",
                        type: "select",
                        options: ["Gazipur", "Comilla"],
                    },
                    {
                        name: "currentUpazila",
                        label: "Upazila",
                        type: "select",
                        options: ["Savar", "Sonargaon"],
                    },
                    { name: "currentVillage", label: "Village", type: "text" },
                ]}
            />

            {/* Permanent Location */}
            <LocationSelect
                darkMode={darkMode}
                formData={formData}
                handleChange={handleChange}
                title="Permanent Location"
                fields={[
                    {
                        name: "permanentDivision",
                        label: "Division",
                        type: "select",
                        options: ["Dhaka", "Chattogram"],
                    },
                    {
                        name: "permanentDistrict",
                        label: "District",
                        type: "select",
                        options: ["Gazipur", "Comilla"],
                    },
                    {
                        name: "permanentUpazila",
                        label: "Upazila",
                        type: "select",
                        options: ["Savar", "Sonargaon"],
                    },
                    { name: "permanentVillage", label: "Village", type: "text" },
                    { label: "Mobile number", name: "mobileNumber", type: "text" },
                ]}
            />

            {/* Password Fields */}
            {["password", "newpassword"].map((name) => (
                <div className="relative" key={name}>
                    <Input
                        type={showPassword[name] ? "text" : "password"}
                        label={name === "password" ? "Password" : "Confirm Password"}
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        inputClassName={`${darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                            }`}
                    />

                    <span
                        onClick={() =>
                            setShowPassword((prev) => ({
                                ...prev,
                                [name]: !prev[name],
                            }))
                        }
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    >
                        {showPassword[name] ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            ))}

            {/* Upload Photo */}
            <div className="">
                {!preview ? (
                    <div
                        className={`border border-dashed border-gray-300 h-18 flex flex-col items-center justify-center relative cursor-pointer hover:border-indigo-400 transition ${darkMode
                            ? "text-gray-400 border-gray-600"
                            : "text-gray-400 border-gray-300"
                            }`}
                    >
                        <span className="flex items-center gap-2 text-xs">
                            <TfiGallery /> Upload Photo
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            name="photo"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                    </div>
                ) : (
                    <div className="relative h-12 w-full flex justify-center items-center border rounded-lg overflow-hidden">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-md shadow"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};



// LocationSelect Component using Input
function LocationSelect({ darkMode, title, formData, handleChange, fields }) {
    return (
        <div className="space-y-4 ">
            <h2
                className={`text-center font-semibold text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
                {title}
            </h2>
            {fields.map(({ name, label, type = "select", options }) => (
                <Input
                    key={name}
                    type={type}
                    label={label}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    options={type === "select" ? options : undefined}
                    inputClassName={` ${darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                        }`}
                />
            ))}
        </div>
    );
}


export default Step4;