import { AmortizationRowI } from "@/interfaces/amortization.interface";
import { useState, useCallback } from "react";

export const useLoanCalculator = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    AmortizationRowI[]
  >([]);

  const calculateLoan = useCallback(
    (
      loanAmount: number = 0,
      interestRate: number = 0,
      loanTerm: number = 0,
      interestType = "annual",
      termType = "years"
    ) => {
      const principal = loanAmount;
      const monthlyRate =
        interestType === "annual"
          ? interestRate / 100 / 12
          : interestRate / 100;
      const numberOfPayments = termType === "years" ? loanTerm * 12 : loanTerm;

      if (monthlyRate === 0) {
        const monthlyPaymentCalc = principal / numberOfPayments;
        setMonthlyPayment(monthlyPaymentCalc);
        setTotalPayment(principal);
        setTotalInterest(0);
        setAmortizationSchedule([]);
        return;
      }

      const monthlyPaymentCalc =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalPaymentCalc = monthlyPaymentCalc * numberOfPayments;
      const totalInterestCalc = totalPaymentCalc - principal;

      setMonthlyPayment(monthlyPaymentCalc);
      setTotalPayment(totalPaymentCalc);
      setTotalInterest(totalInterestCalc);

      let balance = principal;
      const schedule = [];

      for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPaymentCalc - interestPayment;
        balance -= principalPayment;

        schedule.push({
          paymentNumber: i,
          payment: monthlyPaymentCalc,
          principal: principalPayment,
          interest: interestPayment,
          remainingBalance: Math.max(0, balance),
        });
      }

      setAmortizationSchedule(schedule);
    },
    []
  );

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
    calculateLoan,
  };
};
