import Button from "../Button";
import Input from "../formFields/Input";



const ForgetStep = ({ forgetData, setForgetData, sendOtp, goToLogin }) => {
      const handleChange = (e) => setForgetData({ ...forgetData, [e.target.name]: e.target.value });
    return(
    <div>
      <h2 className="text-lg font-bold text-gray-600 text-center mb-6">Forget Password</h2>
      <div className="space-y-4">
        <Input name="idNumber" label="ID Number" value={forgetData.idNumber} onChange={handleChange} />
        <Input name="contact" label="Email or Phone" value={forgetData.contact} onChange={handleChange} />
        <div className="flex gap-4">
          <Button className="w-1/2" onClick={goToLogin}>Login</Button>
          <Button className="w-1/2" onClick={sendOtp}>Send OTP</Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetStep;