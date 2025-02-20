import { formatCurrency } from "@/shared/helpers/amount-format";
import React from "react";

interface Props {
  title: string;
  amount: number;
  isGreen?: boolean;
}
export const SummaryCard = ({ amount, title, isGreen = false }: Props) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="text-sm text-slate-600">{title}</p>
      <p
        className={
          !!isGreen
            ? "text-2xl font-semibold text-green-700 animate-number-change"
            : "text-2xl font-semibold text-primary animate-number-change"
        }
      >
        {formatCurrency(amount)}
      </p>
    </div>
  );
};
