import Button from "../Button";
import Input from "../formFields/Input";


const ResetStep = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, handleResetPassword, goBack, error }) => {
    return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-600 text-center mb-6">New Password</h2>
      <Input type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <Input type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-4">
        <Button className="w-1/2" onClick={goBack}>Back</Button>
        <Button className="w-1/2" onClick={handleResetPassword}>Reset Password</Button>
      </div>
    </div>
  );
};

export default ResetStep;