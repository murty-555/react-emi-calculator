import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downPayment) => {
    if (!cost) return;
    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;
    // Formula for EMI = [P x R x (1 + R)^N]/[(1 + R)^N-1]
    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = () => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    // calculate emi and update it
    const emi = calculateEMI(dp);
    setEmi(emi);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    // calculate downPayment and update it
    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  return (
    <div className="emi-calculator-container">
      <h1>EMI CALCULATOR</h1>
      <TextInput
        title={"Total Cost of Asset"}
        value={cost}
        setState={setCost}
      />
      <TextInput
        title={"Interest Rate (in %)"}
        value={interest}
        setState={setInterest}
      />
      <TextInput
        title={"Processing Fee (in %)"}
        value={fee}
        setState={setFee}
      />
      <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />
      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Emi - ${totalEMI()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />
      <span className="title">Tenure</span>
      <div className="tenure-container">
        {tenureData.map((t) => (
          <button
            className={`tenure-buttons ${
              t === tenure ? "selected-button" : ""
            }`}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
