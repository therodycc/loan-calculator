import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  DollarSign,
} from "lucide-react";
import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from "react";
import Layout from "@/components/layout";

interface AmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    AmortizationRow[]
  >([]);
  const [showAmortization, setShowAmortization] = useState(true);
  const [termType, setTermType] = useState<"months" | "years">("months");
  const [interestType, setInterestType] = useState<"monthly" | "annual">(
    "annual"
  );

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, termType, interestType]);

  const calculateLoan = () => {
    const principal = loanAmount;
    // Convert interest rate to monthly if it's annual
    const monthlyRate =
      interestType === "annual" ? interestRate / 100 / 12 : interestRate / 100;
    // Convert term to months if it's in years
    const numberOfPayments = termType === "years" ? loanTerm * 12 : loanTerm;

    const monthlyPaymentCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPaymentCalc = monthlyPaymentCalc * numberOfPayments;
    const totalInterestCalc = totalPaymentCalc - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);

    // Calculate Calendario de amortización
    let balance = principal;
    const schedule: AmortizationRow[] = [];

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
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const setLoanAmountValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-full mx-auto space-y-8">
        <Card className="p-6 sm:p-8 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <Label htmlFor="loan-amount" className="text-lg font-medium">
                    Monto del préstamo
                  </Label>
                </div>
                <div className="space-y-3">
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={10000000}
                    step={1000}
                    className="py-4"
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={setLoanAmountValue}
                      className="text-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <Label
                    htmlFor="interest-rate"
                    className="text-lg font-medium"
                  >
                    Tasa %
                  </Label>
                </div>
                <div className="space-y-3">
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={20}
                    step={0.1}
                    className="py-4"
                  />
                  <div className="flex gap-2">
                    <Input
                      id="interest-rate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="text-lg"
                      step="0.1"
                    />
                    <select
                      value={interestType}
                      onChange={(e) =>
                        setInterestType(e.target.value as "monthly" | "annual")
                      }
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  <Label htmlFor="loan-term" className="text-lg font-medium">
                    Plazo del préstamo
                  </Label>
                </div>
                <div className="space-y-3">
                  <Slider
                    style={{ width: "100%" }}
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    max={termType === "years" ? 30 : 360}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex gap-2">
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="text-lg"
                    />
                    <select
                      value={termType}
                      onChange={(e) =>
                        setTermType(e.target.value as "months" | "years")
                      }
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Resumen de pago
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-slate-600">Monto del préstamo</p>
                  <p className="text-2xl font-semibold text-primary animate-number-change">
                    {formatCurrency(loanAmount)}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-slate-600">
                    Monto de la cuota mensual.
                  </p>
                  <p className="text-2xl font-semibold text-green-700 animate-number-change">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-slate-600">
                    Monto de interés pagado
                  </p>
                  <p className="text-2xl font-semibold text-primary animate-number-change">
                    {formatCurrency(totalInterest)}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-slate-600">Monto total a pagar</p>
                  <p className="text-2xl font-semibold text-slate-800 animate-number-change">
                    {formatCurrency(totalPayment)}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Calendario de amortización
                </h2>
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  {showAmortization ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {showAmortization && (
                <div className="overflow-y-auto max-h-[500px] overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        <th className="p-3 text-left font-medium text-slate-600">
                          #
                        </th>
                        <th className="p-3 text-left font-medium text-slate-600">
                          Cuota
                        </th>
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
                        <tr
                          key={row.paymentNumber}
                          className="hover:bg-slate-50"
                        >
                          <td className="p-3">{row.paymentNumber}</td>
                          <td className="p-3">{formatCurrency(row.payment)}</td>
                          <td className="p-3">
                            {formatCurrency(row.principal)}
                          </td>
                          <td className="p-3">
                            {formatCurrency(row.interest)}
                          </td>
                          <td className="p-3">
                            {formatCurrency(row.remainingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};


LoanCalculator.getLayout = (page: ReactElement) => (
  <Layout>
    {page}
  </Layout >
)

export default LoanCalculator;
