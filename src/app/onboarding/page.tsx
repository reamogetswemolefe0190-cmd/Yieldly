"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  GOAL_OPTIONS,
  DURATION_OPTIONS,
  EMPLOYMENT_OPTIONS,
  INCOME_OPTIONS,
  BANK_OPTIONS,
  RISK_ALLOCATIONS,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Rocket,
  GraduationCap,
  Shield,
  Plane,
  Pencil,
  Lock,
  CreditCard,
  ChevronLeft,
  Check,
  Shield as ShieldIcon,
  Scale,
  TrendingUp,
} from "lucide-react";
import { ETFAllocationBar } from "@/components/shared/ETFAllocationPreview";

const goalIcons: Record<string, React.ElementType> = {
  home: Home,
  business: Rocket,
  education: GraduationCap,
  emergency: Shield,
  travel: Plane,
  custom: Pencil,
};

const riskConfig = {
  conservative: { icon: ShieldIcon, color: "#0B8C6B", bg: "#E2F0EC" },
  moderate: { icon: Scale, color: "#B8860B", bg: "#FEF3E2" },
  aggressive: { icon: TrendingUp, color: "#C0392B", bg: "#FDE8E4" },
};

interface WizardData {
  fullName: string;
  idNumber: string;
  phone: string;
  address: string;
  employmentStatus: string;
  incomeRange: string;
  goal: string;
  customGoal: string;
  duration: number;
  riskAppetite: "conservative" | "moderate" | "aggressive";
  monthlyContribution: number;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  bankName: string;
  confirmed: boolean;
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 max-w-[720px] mx-auto">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  isCompleted
                    ? "bg-[#0B8C6B] text-white"
                    : isActive
                    ? "bg-white border-2 border-[#0B8C6B] text-[#0B8C6B]"
                    : "bg-white border-2 border-[#E2E4E8] text-[#8A8A9A]"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step}
              </div>
              <span className={`text-[10px] mt-1 hidden md:block ${isActive ? "text-[#0B8C6B] font-medium" : "text-[#8A8A9A]"}`}>
                {["Personal", "Financial", "Goals", "Risk", "Contribution", "Payment", "Review"][i]}
              </span>
            </div>
            {step < totalSteps && (
              <div className={`flex-1 h-0.5 max-w-8 ${step < currentStep ? "bg-[#0B8C6B]" : "bg-[#E2E4E8]"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [data, setData] = useState<WizardData>({
    fullName: user?.name || "",
    idNumber: "",
    phone: "",
    address: "",
    employmentStatus: "",
    incomeRange: "",
    goal: "",
    customGoal: "",
    duration: 12,
    riskAppetite: "moderate",
    monthlyContribution: 1000,
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bankName: "",
    confirmed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  const update = useCallback(<K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.fullName.trim()) e.fullName = "Required";
      if (!data.idNumber.trim()) e.idNumber = "Required";
      else if (!/^\d{13}$/.test(data.idNumber.replace(/\s/g, ""))) e.idNumber = "Enter 13 digits";
      if (!data.phone.trim()) e.phone = "Required";
      if (!data.address.trim()) e.address = "Required";
    } else if (step === 2) {
      if (!data.employmentStatus) e.employmentStatus = "Required";
      if (!data.incomeRange) e.incomeRange = "Required";
    } else if (step === 3) {
      if (!data.goal) e.goal = "Required";
      if (data.goal === "custom" && !data.customGoal.trim()) e.customGoal = "Required";
    } else if (step === 6) {
      if (!data.cardName.trim()) e.cardName = "Required";
      if (!data.cardNumber.trim()) e.cardNumber = "Required";
      if (!data.expiry.trim()) e.expiry = "Required";
      if (!data.cvv.trim()) e.cvv = "Required";
      if (!data.bankName) e.bankName = "Required";
    } else if (step === 7) {
      if (!data.confirmed) e.confirmed = "You must confirm";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setDirection(1);
    if (step < totalSteps) setStep((s) => s + 1);
    else {
      completeOnboarding({
        name: data.fullName,
        idNumber: data.idNumber,
        phone: data.phone,
        address: data.address,
        employmentStatus: data.employmentStatus,
        incomeRange: data.incomeRange,
        goal: data.goal,
        customGoal: data.customGoal,
        duration: data.duration,
        riskAppetite: data.riskAppetite,
        monthlyContribution: data.monthlyContribution,
        cardLast4: data.cardNumber.slice(-4),
        bankName: data.bankName,
      });
      toast.success("Welcome to Yieldly! Your profile is ready.");
      router.push("/dashboard/");
    }
  };

  const back = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="min-h-[100dvh] bg-[#F6F7F9] py-8 px-4">
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
            <span className="text-white font-bold">Y</span>
          </div>
          <span className="text-[#0B8C6B] font-bold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>Yieldly</span>
        </div>

        <StepIndicator currentStep={step} totalSteps={totalSteps} />

        <div className="max-w-[560px] mx-auto">
          <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Tell us about yourself</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">We need this for your KYC profile. Your data is kept secure.</p>
                    <div className="space-y-4">
                      {[
                        { key: "fullName" as const, label: "Full name (as per ID)", placeholder: "Thabo Mokoena" },
                        { key: "idNumber" as const, label: "South African ID number", placeholder: "000101 1234 087" },
                        { key: "phone" as const, label: "Mobile number", placeholder: "+27 82 123 4567" },
                      ].map((f) => (
                        <div key={f.key}>
                          <Label className="text-sm text-[#4A4A5A] font-medium">{f.label}</Label>
                          <Input
                            value={data[f.key]}
                            onChange={(e) => update(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className={`mt-1.5 ${errors[f.key] ? "border-[#E76F51]" : ""}`}
                          />
                          {errors[f.key] && <p className="text-xs text-[#E76F51] mt-1">{errors[f.key]}</p>}
                        </div>
                      ))}
                      <div>
                        <Label className="text-sm text-[#4A4A5A] font-medium">Residential address</Label>
                        <textarea
                          value={data.address}
                          onChange={(e) => update("address", e.target.value)}
                          placeholder="123 Luthuli Street, Berea, Johannesburg, 2198"
                          rows={3}
                          className={`w-full mt-1.5 px-4 py-3 rounded-lg border text-sm bg-white outline-none focus:border-[#0B8C6B] focus:ring-[0_0_0_3px_rgba(11,140,107,0.15)] transition-all ${errors.address ? "border-[#E76F51]" : "border-[#E2E4E8]"}`}
                        />
                        {errors.address && <p className="text-xs text-[#E76F51] mt-1">{errors.address}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Your financial picture</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">This helps us understand your capacity and recommend suitable stokvels.</p>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-[#4A4A5A] font-medium">Employment status</Label>
                        <Select value={data.employmentStatus} onValueChange={(v) => update("employmentStatus", v || "")}>
                          <SelectTrigger className={`mt-1.5 w-full ${errors.employmentStatus ? "border-[#E76F51]" : ""}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {EMPLOYMENT_OPTIONS.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.employmentStatus && <p className="text-xs text-[#E76F51] mt-1">{errors.employmentStatus}</p>}
                      </div>
                      <div>
                        <Label className="text-sm text-[#4A4A5A] font-medium">Monthly income range (ZAR)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {INCOME_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => update("incomeRange", opt)}
                              className={`px-3 py-3 rounded-lg text-xs font-medium border transition-all text-left ${
                                data.incomeRange === opt
                                  ? "border-[#0B8C6B] bg-[rgba(11,140,107,0.06)] text-[#0B8C6B]"
                                  : "border-[#E2E4E8] text-[#4A4A5A] hover:border-[#0B8C6B]"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {errors.incomeRange && <p className="text-xs text-[#E76F51] mt-1">{errors.incomeRange}</p>}
                      </div>
                      <p className="text-xs text-[#8A8A9A]">This information is only used for your profile and will never be shared with other members.</p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>What are you saving for?</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">Choose a goal and how long your stokvel will run.</p>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-[#4A4A5A] font-medium">Select your primary goal</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {GOAL_OPTIONS.map((opt) => {
                            const Icon = goalIcons[opt.value];
                            const active = data.goal === opt.value;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => update("goal", opt.value)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                                  active
                                    ? "border-[#0B8C6B] bg-[rgba(11,140,107,0.06)]"
                                    : "border-[#E2E4E8] hover:border-[#0B8C6B]"
                                }`}
                              >
                                <Icon className={`w-6 h-6 ${active ? "text-[#0B8C6B]" : "text-[#8A8A9A]"}`} />
                                <span className={`text-xs font-medium ${active ? "text-[#0B8C6B]" : "text-[#4A4A5A]"}`}>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.goal && <p className="text-xs text-[#E76F51] mt-1">{errors.goal}</p>}
                        {data.goal === "custom" && (
                          <div className="mt-3">
                            <Input
                              value={data.customGoal}
                              onChange={(e) => update("customGoal", e.target.value)}
                              placeholder="Describe your goal"
                              className={errors.customGoal ? "border-[#E76F51]" : ""}
                            />
                            {errors.customGoal && <p className="text-xs text-[#E76F51] mt-1">{errors.customGoal}</p>}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm text-[#4A4A5A] font-medium">Stokvel duration</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {DURATION_OPTIONS.map((d) => (
                            <button
                              key={d}
                              onClick={() => update("duration", d)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                data.duration === d
                                  ? "bg-[#0B8C6B] text-white"
                                  : "bg-[#F6F7F9] text-[#4A4A5A] hover:bg-[#E2E4E8]"
                              }`}
                            >
                              {d} months
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-[#4A4A5A] mt-3">Most members choose 12 or 24 months for a balance between commitment and flexibility.</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>How do you feel about risk?</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">This determines how your stokvel&apos;s pool will be allocated across ETFs.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(["conservative", "moderate", "aggressive"] as const).map((risk) => {
                        const config = riskConfig[risk];
                        const Icon = config.icon;
                        const active = data.riskAppetite === risk;
                        const alloc = RISK_ALLOCATIONS[risk];
                        return (
                          <button
                            key={risk}
                            onClick={() => update("riskAppetite", risk)}
                            className={`flex flex-col items-center gap-3 p-5 rounded-xl border transition-all text-left ${
                              active
                                ? "border-[#0B8C6B] shadow-[0_0_0_4px_rgba(11,140,107,0.15)]"
                                : "border-[#E2E4E8] hover:border-[#0B8C6B]"
                            }`}
                          >
                            <div
                              className="w-16 h-16 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: config.bg }}
                            >
                              <Icon className="w-8 h-8" style={{ color: config.color }} />
                            </div>
                            <div className="text-center">
                              <h4 className="font-semibold text-[#1A1A2E] capitalize">{risk}</h4>
                              <p className="text-xs text-[#4A4A5A] mt-1">
                                {risk === "conservative" && "Preserve capital with minimal risk."}
                                {risk === "moderate" && "Balance growth and stability."}
                                {risk === "aggressive" && "Maximize growth potential."}
                              </p>
                            </div>
                            <div className="w-full mt-2">
                              <div className="flex h-2 rounded-full overflow-hidden">
                                {alloc.map((a) => (
                                  <div key={a.label} className="h-full transition-all" style={{ width: `${a.value}%`, backgroundColor: a.color }} />
                                ))}
                              </div>
                              <div className="flex gap-2 mt-1 justify-center">
                                {alloc.map((a) => (
                                  <span key={a.label} className="text-[10px] text-[#4A4A5A]">{a.value}%</span>
                                ))}
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              risk === "conservative" ? "bg-[#E2F0EC] text-[#0B8C6B]" :
                              risk === "moderate" ? "bg-[#FEF3E2] text-[#B8860B]" :
                              "bg-[#FDE8E4] text-[#C0392B]"
                            }`}>
                              {risk}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-sm text-[#8A8A9A] mt-4 text-center">You can change this later when creating or joining a stokvel.</p>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>How much will you contribute monthly?</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">Set an amount you can comfortably commit to each month.</p>
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-[#0B8C6B]" style={{ fontFamily: "var(--font-poppins)" }}>
                          R {data.monthlyContribution.toLocaleString()}
                        </p>
                      </div>
                      <Slider
                        value={[data.monthlyContribution]}
                        onValueChange={(v) => {
                          const arr = Array.isArray(v) ? v : [v];
                          update("monthlyContribution", arr[0]);
                        }}
                        min={100}
                        max={10000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[500, 1000, 2500, 5000, 10000].map((val) => (
                          <button
                            key={val}
                            onClick={() => update("monthlyContribution", val)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              data.monthlyContribution === val
                                ? "bg-[#0B8C6B] text-white"
                                : "bg-[#F6F7F9] text-[#4A4A5A]"
                            }`}
                          >
                            R {val.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <div className="bg-[#E2F0EC] rounded-xl p-5">
                        <p className="text-sm text-[#0B8C6B] font-medium">Projected total after {data.duration} months</p>
                        <p className="text-2xl font-bold text-[#0B8C6B] mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                          R {(data.monthlyContribution * data.duration).toLocaleString()}
                        </p>
                        <p className="text-xs text-[#0B8C6B] mt-1">This is your pooled contribution. ETF returns are projected separately.</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Set up your payment method</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">Link a bank card for your monthly contributions.</p>
                    <div className="bg-[#E2F0EC] rounded-lg p-3 mb-5 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#0B8C6B]" />
                      <p className="text-sm text-[#0B8C6B]">This is a demo. No real payments are processed. Do not enter real card details.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[
                          { key: "cardName" as const, label: "Name on card", placeholder: "Thabo Mokoena" },
                          { key: "cardNumber" as const, label: "Card number", placeholder: "0000 0000 0000 0000" },
                          { key: "expiry" as const, label: "Expiry date (MM/YY)", placeholder: "MM/YY" },
                          { key: "cvv" as const, label: "CVV", placeholder: "123", type: "password" },
                        ].map((f) => (
                          <div key={f.key}>
                            <Label className="text-sm text-[#4A4A5A] font-medium">{f.label}</Label>
                            <Input
                              type={f.type || "text"}
                              value={data[f.key]}
                              onChange={(e) => {
                                let v = e.target.value;
                                if (f.key === "cardNumber") v = formatCard(v);
                                update(f.key, v);
                              }}
                              placeholder={f.placeholder}
                              className={`mt-1.5 ${errors[f.key] ? "border-[#E76F51]" : ""}`}
                            />
                            {errors[f.key] && <p className="text-xs text-[#E76F51] mt-1">{errors[f.key]}</p>}
                          </div>
                        ))}
                        <div>
                          <Label className="text-sm text-[#4A4A5A] font-medium">Bank</Label>
                          <Select value={data.bankName} onValueChange={(v) => update("bankName", v || "")}>
                            <SelectTrigger className={`mt-1.5 w-full ${errors.bankName ? "border-[#E76F51]" : ""}`}>
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {BANK_OPTIONS.map((b) => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.bankName && <p className="text-xs text-[#E76F51] mt-1">{errors.bankName}</p>}
                        </div>
                      </div>
                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-80 h-52 rounded-2xl bg-gradient-to-br from-[#0B8C6B] to-[#14A085] p-6 flex flex-col justify-between shadow-lg text-white">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-lg">Yieldly</span>
                            <CreditCard className="w-6 h-6 opacity-80" />
                          </div>
                          <div>
                            <p className="font-mono text-xl tracking-widest mb-4">
                              {data.cardNumber ? data.cardNumber.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").padEnd(19, "•") : "•••• •••• •••• ••••"}
                            </p>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-[10px] opacity-70 uppercase">Cardholder</p>
                                <p className="text-sm font-medium truncate max-w-[140px]">{data.cardName || "YOUR NAME"}</p>
                              </div>
                              <div>
                                <p className="text-[10px] opacity-70 uppercase">Expiry</p>
                                <p className="text-sm font-medium">{data.expiry || "MM/YY"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Review your profile</h2>
                    <p className="text-sm text-[#4A4A5A] mb-6">Everything look correct? Submit to complete your onboarding.</p>
                    <div className="space-y-0 border border-[#E2E4E8] rounded-xl overflow-hidden">
                      {[
                        { label: "Personal Info", value: `${data.fullName}, ${data.idNumber}, ${data.phone}` },
                        { label: "Financial Profile", value: `${data.employmentStatus}, ${data.incomeRange}` },
                        { label: "Goal", value: `${data.goal === "custom" ? data.customGoal : data.goal} — ${data.duration} months` },
                        { label: "Risk Appetite", value: `${data.riskAppetite} — See allocation below` },
                        { label: "Monthly Contribution", value: `R ${data.monthlyContribution.toLocaleString()} — Projected R ${(data.monthlyContribution * data.duration).toLocaleString()}` },
                        { label: "Payment", value: `Card ending in ${data.cardNumber.slice(-4) || "••••"} — ${data.bankName}` },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-3 border-b border-[#E2E4E8] last:border-b-0">
                          <div>
                            <p className="text-sm font-medium text-[#1A1A2E]">{item.label}</p>
                            <p className="text-xs text-[#4A4A5A] truncate max-w-[300px]">{item.value}</p>
                          </div>
                          <button
                            onClick={() => setStep(idx + 1)}
                            className="text-xs text-[#0B8C6B] font-medium hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <ETFAllocationBar risk={data.riskAppetite} />
                    </div>
                    <div className="flex items-start gap-3 mt-6">
                      <Checkbox
                        id="confirm"
                        checked={data.confirmed}
                        onCheckedChange={(c) => update("confirmed", c === true)}
                      />
                      <label htmlFor="confirm" className="text-sm text-[#4A4A5A] leading-tight">
                        I confirm that the information provided is accurate and I agree to Yieldly&apos;s simulated terms of service.
                      </label>
                    </div>
                    {errors.confirmed && <p className="text-xs text-[#E76F51] mt-1">{errors.confirmed}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={back}
              disabled={step === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={next}
              className="gap-2 bg-[#0B8C6B] hover:bg-[#14A085] text-white"
            >
              {step === totalSteps ? "Complete onboarding" : "Next"}
              {step === totalSteps && <Check className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
