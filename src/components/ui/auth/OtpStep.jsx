import Button from "../Button";
import Input from "../formFields/Input";


const OtpStep = ({ otp, setOtp, timer, verifyOtp, goBack, resendOtp }) => {
    return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-600 text-center mb-6">Verify OTP</h2>
      <p className="text-center text-sm text-gray-500">Time left: {timer}s</p>
      <Input label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <div className="flex gap-4">
        <Button className="w-1/2" onClick={goBack}>Back</Button>
        <Button className="w-1/2" onClick={verifyOtp}>Verify OTP</Button>
      </div>
      {timer === 0 && (
        <p onClick={resendOtp} className="text-center text-sm text-blue-600 cursor-pointer">
          Resend OTP
        </p>
      )}
    </div>
  );
};

export default OtpStep;