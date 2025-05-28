import React from "react";
import { SummaryCard } from "./summary-card";

interface Props {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export const PaymentResume = ({
  loanAmount,
  monthlyPayment,
  totalInterest,
  totalPayment,
}: Props) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-slate-800">Resumen de pago</h2>
      <div className="space-y-4">
        <SummaryCard title="Monto del préstamo" amount={loanAmount} />
        <SummaryCard
          title="Monto de la cuota mensual."
          amount={monthlyPayment}
          isActive
        />
        <SummaryCard title="Monto de interés pagado" amount={totalInterest} />
        <SummaryCard title="Monto total a pagar" amount={totalPayment} />
      </div>
    </>
  );
};
