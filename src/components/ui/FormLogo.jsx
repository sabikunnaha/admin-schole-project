
import formLogo from '../../assets/images/form-logo.jpg'


const FormLogo = () => {
    return (
        <div
            className="w-24 h-24 mx-auto rounded-full border border-blue-500 flex items-center justify-center shadow-lg mb-6
                        animate-fadeInScale
                       hover:scale-110
                       hover:rotate-6
                       transition-transform
                       duration-500
                       ease-in-out absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       "
        >
            <img
                src={formLogo}
                alt="Logo"
                className="w-20 h-20 rounded-full object-cover"
            />
        </div>

    );
};

export default FormLogo;