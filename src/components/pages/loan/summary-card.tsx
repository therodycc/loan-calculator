import { formatCurrency } from "@/shared/helpers/amount-format";
import React from "react";

interface Props {
  title: string;
  amount: number;
  isActive?: boolean;
}
export const SummaryCard = ({ amount, title, isActive = false }: Props) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="text-sm text-slate-600">{title}</p>
      <p
        className={
          !!isActive
            ? "text-2xl font-semibold text-orange-400 animate-number-change"
            : "text-2xl font-semibold text-primary animate-number-change"
        }
      >
        {formatCurrency(amount)}
      </p>
    </div>
  );
};
