import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../../../components/ui/admissionRegiStepper/Stepper";
import Step1 from "../../../components/ui/admissionRegiStepper/Step1";
import Step2 from "../../../components/ui/admissionRegiStepper/Step2";
import Step3 from "../../../components/ui/admissionRegiStepper/Step3";
import Step4 from "../../../components/ui/admissionRegiStepper/Step4";
import Button from "../../../components/ui/Button";

const AdmissionRegiForm = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [error, setError] = useState("");
    const [stepErrors, setStepErrors] = useState({
        0: false,
        1: false,
        2: false,
        3: false
    });

    useEffect(() => {
        setStepErrors(prev => ({
            ...prev,
            [step]: true
        }));
    }, [step]);


    // Organized form state
    const [formData, setFormData] = useState({
        admission: {
            division: "",
            district: "",
            upazila: "",
            school: "",
            class: "",
            group: "",
            session: "",
            admissionFee: "",
            admissionDate: "",
        },

        previousSchool: {
            previousSchool: "",
            className: "",
            groupName: "",
            sectionName: "",
            sessionYear: "",
            interviewCode: "",
            lastResult: "",
        },

        guardian: {
            guardianname: "",
            relation: "",
            mobile: "",
            guardianDivision: "",
            guardianDistrict: "",
            guardianUpazila: "",
        },

        student: {
            studentname: "",
            father: "",
            mother: "",

            currentDivision: "",
            currentDistrict: "",
            currentUpazila: "",
            currentVillage: "",

            permanentDivision: "",
            permanentDistrict: "",
            permanentUpazila: "",
            permanentVillage: "",

            mobileNumber: "",
            password: "",
            newpassword: "",
            photo: null,
        },
    });

    // Handle change
    const handleChange = (section, e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: files ? files[0] : value,
            },
        }));
    };

    // Step wise required fields
    const stepRequiredFields = {
        0: ["division", "district", "upazila", "school", "class", "session"],
        1: ["previousSchool", "className", "sectionName", "sessionYear"],
        2: [
            "guardianname",
            "relation",
            "mobile",
            "guardianDivision",
            "guardianDistrict",
            "guardianUpazila",
        ],
        3: [
            "studentname",
            "father",
            "mother",
            "currentDivision",
            "currentDistrict",
            "currentUpazila",
            "permanentDivision",
            "permanentDistrict",
            "permanentUpazila",
            "mobileNumber",
            "password",
            "newpassword",
        ],
    };

    const stepTitles = {
        0: "New Student Admission",
        1: "Previous School Information",
        2: "Guardian Information",
        3: "Student Information",
    };

    // validation
    const isStepValid = () => {
        const fields = stepRequiredFields[step] || [];

        let section = "";

        if (step === 0) section = "admission";
        if (step === 1) section = "previousSchool";
        if (step === 2) section = "guardian";
        if (step === 3) section = "student";

        for (let field of fields) {
            if (!formData[section][field]?.toString().trim()) {
                setError("All required fields must be completed.");
                return false;
            }
        }

        if (step === 3) {
            if (formData.student.password.length < 6) {
                setError("Password must be at least 6 characters long.");
                return false;
            }

            if (formData.student.password !== formData.student.newpassword) {
                setError("Passwords do not match.");
                return false;
            }
        }

        setError("");
        return true;
    };

    const next = () => {
        if (!isStepValid()) return;
        setStep(step + 1);
    };

    const back = () => {
        setError("");
        setStep(step - 1);
    };

    // Final submit
    const handleAdmission = () => {
        if (!isStepValid()) return;

        // send to backend
        const finalData = {
            ...formData.admission,
            ...formData.previousSchool,
            ...formData.guardian,
            ...formData.student,
        };

        console.log("Final Data:", finalData);

        // Example API call
        // axios.post("/api/admission", finalData)

        navigate("/success", {
            state: finalData,
        });
    };


    return (
        <div className="max-w-md mx-auto bg-white pt-6 px-5 pb-2">

            <h1 className="text-center text-base md:text-xl mb-6 flex items-center justify-center gap-2">
                <span className="text-slate-600 font-bold">{stepTitles[step]}</span>
            </h1>

            <Stepper
                activeStep={step}
                setActiveStep={setStep}
                errors={stepErrors}
            />

            <div className="mt-2 transition-all duration-500">
                {step === 0 && (
                    <Step1
                        formData={formData.admission}
                        handleChange={(e) => handleChange("admission", e)}
                    />
                )}

                {step === 1 && (
                    <Step2
                        formData={formData.previousSchool}
                        handleChange={(e) => handleChange("previousSchool", e)}
                    />
                )}

                {step === 2 && (
                    <Step3
                        formData={formData.guardian}
                        handleChange={(e) => handleChange("guardian", e)}
                    />
                )}

                {step === 3 && (
                    <Step4
                        formData={formData.student}
                        handleChange={(e) => handleChange("student", e)}
                    />
                )}
            </div>

            {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <div className="flex gap-4 mt-4 w-full">

                {step === 0 && (
                    <>
                        <Link
                            to="/"
                            className="w-1/2 bg-blue-600 text-white text-sm h-[39px] flex items-center justify-center hover:bg-slate-800"
                        >
                            Login
                        </Link>

                        <Button onClick={next} className="w-1/2">
                            Next
                        </Button>
                    </>
                )}

                {(step === 1 || step === 2) && (
                    <>
                        <Button onClick={back} className="w-1/2">
                            Back
                        </Button>

                        <Button onClick={next} className="w-1/2">
                            Next
                        </Button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Button onClick={back} className="w-1/2">
                            Back
                        </Button>

                        <Button onClick={handleAdmission} className="w-1/2">
                            Admission
                        </Button>
                    </>
                )}
            </div>

            <p className="text-center mt-6 text-xs text-gray-400">
                Copyright © 2025 - Astha Academic
            </p>
        </div>
    );
};

export default AdmissionRegiForm;