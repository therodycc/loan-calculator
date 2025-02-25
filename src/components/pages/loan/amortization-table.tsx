import { AmortizationRowI } from "@/interfaces/amortization.interface";
import { formatCurrency } from "@/shared/helpers/amount-format";
import React from "react";

interface Props {
  amortizationSchedule: AmortizationRowI[];
}

export const AmortizationTable = ({ amortizationSchedule }: Props) => {
  return (
    <div className="overflow-y-auto max-h-[500px] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 sticky top-0">
          <tr>
            <th className="p-3 text-left font-medium text-slate-600">#</th>
            <th className="p-3 text-left font-medium text-slate-600">
              Restar al capital
            </th>
            <th className="p-3 text-left font-medium text-slate-600">
              Interés
            </th>
            <th className="p-3 text-left font-medium text-slate-600">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {amortizationSchedule.map((row) => (
            <tr key={row.paymentNumber} className="hover:bg-slate-50">
              <td className="p-3">{row.paymentNumber}</td>
              <td className="p-3">{formatCurrency(row.principal)}</td>
              <td className="p-3">{formatCurrency(row.interest)}</td>
              <td className="p-3">{formatCurrency(row.remainingBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
