
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../formFields/Input";
import Button from "../Button";


const LoginStep = ({ formData, setFormData, errors, handleLogin, togglePassword, showPassword, goToForget }) => {

      const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
     return (
    <div>
      <h2 className="text-lg font-bold text-gray-600 text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <Input name="idNumber" label="ID Number" value={formData.idNumber} onChange={handleChange} />
          {errors.idNumber && <p className="text-xs text-red-500 mt-1">{errors.idNumber}</p>}
        </div>
        <div className="relative">
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>
        <div className="flex gap-4">
          <Button className="w-1/2" type="button" onClick={goToForget}>Forget</Button>
          <Button className="w-1/2" type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginStep;