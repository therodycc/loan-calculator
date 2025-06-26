import Layout from "@/components/layout";
import { Header } from "@/components/layout/header";
import { AmortizationTable } from "@/components/pages/loan/amortization-table";
import { PaymentResume } from "@/components/pages/loan/payment-resume";
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
  }, [
    loanAmount,
    interestRate,
    loanTerm,
    termType,
    interestType,
    calculateLoan,
  ]);

  const setLoanAmountValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  }, []);

  const setSlideLoanAmountValue = useCallback((value: number[]) => {
    setLoanAmount(value[0]);
  }, []);

  const setInterestRateValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInterestRate(Number(e.target.value));
    },
    []
  );

  const setSlideInterestRateValue = useCallback((value: number[]) => {
    setInterestRate(value[0]);
  }, []);

  const setLoanTermValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoanTerm(Number(e.target.value));
  }, []);

  const setTermTypeSelectValue = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setTermType(e.target.value as "months" | "years");
    },
    []
  );

  const setInterestTypeSelectValue = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setInterestType(e.target.value as "monthly" | "annual");
    },
    []
  );

  const setSlideLoanTermValue = useCallback((value: number[]) => {
    setLoanTerm(value[0]);
  }, []);

  const toggleAmortization = useCallback(() => {
    setShowAmortization((prev) => !prev);
  }, []);

  return (
    <div className="bg-secondary">
      <div className="container mx-auto h-full p-4 sm:p-6 md:p-8">
        <Header />
        <div className="max-w-full mx-auto space-y-8">
          <Card className="p-6 sm:p-8 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor="loan-amount"
                      className="text-lg font-medium"
                    >
                      Monto del préstamo
                    </Label>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={[loanAmount]}
                      onValueChange={setSlideLoanAmountValue}
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
                      onValueChange={setSlideInterestRateValue}
                      max={1000}
                      min={1}
                      step={0.1}
                      className="py-4 w-full"
                    />
                    <div className="flex gap-2">
                      <Input
                        id="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={setInterestRateValue}
                        className="text-lg"
                        step="0.1"
                      />
                      <select
                        value={interestType}
                        onChange={setInterestTypeSelectValue}
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
                      onValueChange={setSlideLoanTermValue}
                      max={termType === "years" ? 30 : 360}
                      min={1}
                      step={1}
                      className="py-4 w-full"
                    />
                    <div className="flex gap-2">
                      <Input
                        id="loan-term"
                        type="number"
                        value={loanTerm}
                        onChange={setLoanTermValue}
                        className="text-lg"
                      />
                      <select
                        value={termType}
                        onChange={setTermTypeSelectValue}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value="months">Meses</option>
                        <option value="years">Años</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-6 space-y-6 lg:col-span-5">
                <PaymentResume
                  loanAmount={loanAmount}
                  monthlyPayment={monthlyPayment}
                  totalInterest={totalInterest}
                  totalPayment={totalPayment}
                />
              </div>
            </div>
          </Card>
          <Card className="p-6 sm:p-8 shadow-lg bg-white/80 backdrop-blur-sm col-span-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Calendario de amortización
              </h2>
              <button
                onClick={toggleAmortization}
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
              <div className="w-full overflow-auto amortization-table">
                <AmortizationTable
                  amortizationSchedule={amortizationSchedule}
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

LoanCalculator.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default LoanCalculator;
