import { useTheme } from "../../../contexts/ThemeContext";
import Select from "../formFields/Select";


const Step2 = ({ formData, handleChange }) => {

     const { darkMode } = useTheme();
    return (
        <div
            className={`space-y-4  animate-fadeIn ${darkMode ? "text-gray-200" : "text-gray-700"
                }`}
        >
            <p
                className={`text-xs text-center  mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
            >
                Provide the details of the previous school.
            </p>

            {[
                { label: "Previous school", name: "previousSchool" },
                { label: "Class ", name: "className" },
                { label: "Group ", name: "groupName" },
                { label: "Section", name: "sectionName" },
                { label: "Session ", name: "sessionYear" },
                { label: "Result", name: "result" },
            ].map((field) => (
                <Select
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    inputClassName={` ${darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-700 placeholder-gray-400"
                        }`}
                />
            ))}
        </div>
    );
};

export default Step2;