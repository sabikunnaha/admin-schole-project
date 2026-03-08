import React, { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import Select from "../formFields/Select";
import Input from "../formFields/Input";


// moved outside component (better performance)
const locationDB = {
  Dhaka: {
    Gazipur: {
      Savar: [
        { name: "Sunshine High School", admissionFee: 5000 },
        { name: "Greenfield Academy", admissionFee: 4500 },
      ],
    },
    Comilla: {
      Sonargaon: [{ name: "Comilla Central School", admissionFee: 4800 }],
    },
  },
  Chattogram: {
    Comilla: {
      Sonargaon: [{ name: "Chattogram High School", admissionFee: 5200 }],
    },
  },
};

const Step1 = ({
    formData,
    handleChange,
    hideLocationSection = false,
    hideSchoolAndTitle = false,
}) => {

    const { darkMode } = useTheme();
    const [availableSchools, setAvailableSchools] = useState([]);

    const titleClass = darkMode ? "text-gray-200" : "text-gray-600";

    // update schools when location changes
useEffect(() => {
  const { division, district, upazila } = formData;

  if (division && district && upazila) {
    const schools = locationDB?.[division]?.[district]?.[upazila] || [];
    setAvailableSchools(schools);
  } else {
    setAvailableSchools([]);
  }

  if (formData.school !== "") {
    handleChange({ target: { name: "school", value: "" } });
  }

  if (formData.admissionFee !== "") {
    handleChange({ target: { name: "admissionFee", value: "" } });
  }

}, [formData.division, formData.district, formData.upazila]);

    // set admission fee automatically
   useEffect(() => {
  if (formData.school) {
    const school = availableSchools.find(
      (s) => s.name === formData.school
    );

    if (school && formData.admissionFee !== school.admissionFee) {
      handleChange({
        target: { name: "admissionFee", value: school.admissionFee },
      });
    }
  }
}, [formData.school, availableSchools]);

    return (
        <div>
            {/* Title */}
            {!hideLocationSection && (
                <>
                    <h2
                        className={`text-center font-semibold text-base md:text-lg mb-4 ${titleClass}`}
                    >
                        Find Your Location
                    </h2>

                    {/* Location selects */}
                    <div className="space-y-4">
                        <Select
                            type="select"
                            label="Division"
                            name="division"
                            value={formData.division || ""}
                            onChange={handleChange}
                            options={["Select Division", ...Object.keys(locationDB)]}
                        />

                        <Select
                            type="select"
                            label="District"
                            name="district"
                            value={formData.district || ""}
                            onChange={handleChange}
                            options={
                                formData.division
                                    ? [
                                        "Select District",
                                        ...Object.keys(locationDB[formData.division] || {}),
                                    ]
                                    : ["Select District"]
                            }
                        />

                        <Select
                            type="select"
                            label="Upazila"
                            name="upazila"
                            value={formData.upazila || ""}
                            onChange={handleChange}
                            options={
                                formData.division && formData.district
                                    ? [
                                        "Select Upazila",
                                        ...Object.keys(
                                            locationDB[formData.division][formData.district] || {},
                                        ),
                                    ]
                                    : ["Select Upazila"]
                            }
                        />
                    </div>
                </>
            )}

            {/* School Title */}
            {!hideSchoolAndTitle && (
                <h2
                    className={`text-center font-semibold text-base md:text-lg ${hideLocationSection ? "mb-4" : "my-4"
                        } ${titleClass}`}
                >
                    New School Information
                </h2>
            )}

            <div className="space-y-4">
                {!hideSchoolAndTitle && (
                    <Select
                        type="select"
                        label="School"
                        name="school"
                        value={formData.school || ""}
                        onChange={handleChange}
                        options={
                            hideLocationSection
                                ? ["Select School", "School A", "School B", "School C"]
                                : ["Select School", ...availableSchools.map((s) => s.name)]
                        }
                    />
                )}

                <Select
                    type="select"
                    label="Class"
                    name="class"
                    value={formData.class || ""}
                    onChange={handleChange}
                    options={["Select Class", "1", "2", "3"]}
                />

                <Select
                    type="select"
                    label="Group"
                    name="group"
                    value={formData.group || ""}
                    onChange={handleChange}
                    options={["Select Group", "Science", "Arts", "Commerce"]}
                />

                {hideSchoolAndTitle && (
                    <Select
                        type="select"
                        label="Section"
                        name="sectionName"
                        value={formData.sectionName || ""}
                        onChange={handleChange}
                        options={["Select Section", "Morning", "Day", "Evening"]}
                    />
                )}

                <Select
                    type="select"
                    label="Session"
                    name="session"
                    value={formData.session || ""}
                    onChange={handleChange}
                    options={["Select Session", "2023-24", "2024-25"]}
                />

                <Input
                    type="text"
                    label="Admission fee"
                    name="admissionFee"
                    value={formData.admissionFee || ""}
                    readOnly
                />

                <Input
                    type="date"
                    label="Admission date"
                    name="admissionDate"
                    value={formData.admissionDate || ""}
                    onChange={handleChange}
                    showDropdownTop={true}
                />
            </div>
        </div>
    );
};

export default Step1;