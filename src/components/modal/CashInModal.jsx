import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { useTheme } from "../../contexts/ThemeContext";


export default function CashInModal({ onClose }) {

  const { darkMode } = useTheme();

  // -------- INITIAL FORM VALUES --------
  const initialValues = {
    account: "",
    dateTime: new Date().toLocaleString(),
    lastCashIn: "0",
    lastCashOut: "0",
    totalBalance: "0",
    availableBalance: "0",
    requestAmount: "",
  };

  const [values, setValues] = useState(initialValues);

  // reset on modal open
  useEffect(() => {
    setValues(initialValues);
  }, [onClose]);

  // Simulated account data
  const accountData = {
    "DBBL - 987654": {
      lastCashIn: 5000,
      lastCashOut: 2000,
      totalBalance: 15000,
    },
    "Brac Bank - 123456": {
      lastCashIn: 3000,
      lastCashOut: 1000,
      totalBalance: 12000,
    },
  };

  // -------- AUTO SHOW CALCULATION --------
  useEffect(() => {
    const account = values.account;
    const requested = parseFloat(values.requestAmount) || 0;

    if (account && accountData[account]) {
      const lastIn = accountData[account].lastCashIn;
      const lastOut = accountData[account].lastCashOut;
      const total = accountData[account].totalBalance;
      const available = total - lastOut + requested;

      setValues((prev) => ({
        ...prev,
        dateTime: new Date().toLocaleString(),
        lastCashIn: lastIn,
        lastCashOut: lastOut,
        totalBalance: total,
        availableBalance: available,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        dateTime: new Date().toLocaleString(),
        lastCashIn: 0,
        lastCashOut: 0,
        totalBalance: 0,
        availableBalance: 0,
      }));
    }
  }, [values.account, values.requestAmount]);

  // -------- FORM FIELDS --------
  const fields = [
    {
      key: "account",
      label: "Account",
      type: "select",
      placeholder: " Account",
      options: Object.keys(accountData),
    },
    { key: "dateTime", label: "Date & Time", type: "text", disabled: true },
    { key: "lastCashIn", label: "Last Cash In", type: "text", disabled: true },
    { key: "lastCashOut", label: "Last Cash Out", type: "text", disabled: true },
    { key: "totalBalance", label: "Total Balance", type: "text", disabled: true },
    { key: "availableBalance", label: "Available Balance", type: "text", disabled: true },
    {
      key: "requestAmount",
      label: "Request Balance",
      type: "number",
      placeholder: "Enter request amount",
    },
  ];

  // -------- SUBMIT --------
  const handleSubmit = (formData) => {
    if (!formData.account || !formData.requestAmount) {
      alert("Account and request amount are required");
      return;
    }
    console.log("Cash In Request Submitted:", formData);
    alert(`Cash In Request for ${formData.requestAmount} submitted!`);
    onClose();
  };

  return (
    <FormModal
      open={true}
      title="Cash In Request"
      fields={fields}
      initialValues={values}
      onValuesChange={setValues}
      onSubmit={handleSubmit}
      onClose={onClose}
      darkMode={darkMode}
      submitText="Request Now"
    />
  );
}
