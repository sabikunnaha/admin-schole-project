
const STEPS = ["Register", "School", "Guardian", "Student"];

const Stepper = ({
    activeStep = 0,
    setActiveStep,
    errors = {}
}) => {

     const progress = (activeStep / (STEPS.length - 1)) * 100;

    return (
        <div className="mb-6 w-full relative">

            {/* Background line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300"></div>

            {/* Animated progress line */}
            <div
                className="absolute top-6 left-0 h-0.5 bg-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
            ></div>

            {/* Steps */}
            <div className="relative flex justify-between w-full">

                {STEPS.map((label, index) => {

                    const isActive = index === activeStep;
                    const isCompleted = index < activeStep;
                    const hasError = errors[index];

                    return (
                        <div
                            key={label}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => setActiveStep(index)}
                        >

                            {/* Circle */}
                            <div
                                className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                ${hasError
                                        ? "bg-red-500 text-white"
                                        : isCompleted
                                            ? "bg-green-500 text-white"
                                            : isActive
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                {hasError ? "!" : isCompleted ? "✓" : index + 1}
                            </div>

                            {/* Label */}
                            <span
                                className={`mt-2 text-xs font-medium text-center
                ${hasError
                                        ? "text-red-500"
                                        : isActive
                                            ? "text-blue-600"
                                            : isCompleted
                                                ? "text-green-600"
                                                : "text-gray-500"
                                    }`}
                            >
                                {label}
                            </span>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;