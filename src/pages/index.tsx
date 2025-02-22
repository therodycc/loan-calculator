import Layout from "@/components/layout";
import { AmortizationTable } from "@/components/pages/loan/amortization-table";
import { SummaryCard } from "@/components/pages/loan/summary-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useLoanCalculator } from "@/hooks/calculate-loan";
import {
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  DollarSign,
} from "lucide-react";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(18);
  const [loanTerm, setLoanTerm] = useState(12);
  const [showAmortization, setShowAmortization] = useState(true);
  const [termType, setTermType] = useState<"months" | "years">("months");
  const [interestType, setInterestType] = useState<"monthly" | "annual">(
    "annual"
  );

  const {
    amortizationSchedule,
    calculateLoan,
    monthlyPayment,
    totalInterest,
    totalPayment,
  } = useLoanCalculator();

  useEffect(() => {
    calculateLoan(loanAmount, interestRate, loanTerm, interestType, termType);
  }, [loanAmount, interestRate, loanTerm, termType, interestType]);

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
                    min={1}
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
                    max={1000}
                    min={1}
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
                      <option value="monthly">Mensual</option>
                      <option value="annual">Anual</option>
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
                    min={1}
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
                      <option value="months">Meses</option>
                      <option value="years">Años</option>
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
                <SummaryCard title="Monto del préstamo" amount={loanAmount} />
                <SummaryCard
                  title="Monto de la cuota mensual."
                  amount={monthlyPayment}
                  isGreen
                />
                <SummaryCard
                  title="Monto de interés pagado"
                  amount={totalInterest}
                />
                <SummaryCard
                  title="Monto total a pagar"
                  amount={totalPayment}
                />
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
                <AmortizationTable
                  amortizationSchedule={amortizationSchedule}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

LoanCalculator.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default LoanCalculator;
