"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ETFAllocationBar } from "@/components/shared/ETFAllocationPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GOAL_OPTIONS, DURATION_OPTIONS, RISK_ALLOCATIONS } from "@/lib/types";
import { toast } from "sonner";
import { Globe, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateStokvelPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "invite-only">("public");
  const [duration, setDuration] = useState(12);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [maxMembers, setMaxMembers] = useState(10);
  const [riskAppetite, setRiskAppetite] = useState<"conservative" | "moderate" | "aggressive">("moderate");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.length < 3) e.name = "Name must be at least 3 characters";
    if (!description.trim()) e.description = "Description is required";
    if (description.length > 280) e.description = "Max 280 characters";
    if (!goal) e.goal = "Select a goal";
    if (goal === "custom" && !customGoal.trim()) e.customGoal = "Describe your goal";
    if (!maxMembers || maxMembers < 2 || maxMembers > 50) e.maxMembers = "Members must be 2-50";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    toast.success(`Your stokvel "${name}" has been created!`);
    router.push("/stokvels/s1");
  };

  const goalIcons = {
    home: "🏠",
    business: "🚀",
    education: "🎓",
    emergency: "🛡️",
    travel: "✈️",
    custom: "✏️",
  };

  return (
    <AppShell>
      <div className="max-w-[560px] mx-auto">
        <Link href="/stokvels" className="inline-flex items-center gap-2 text-sm text-[#0B8C6B] font-medium mb-4 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to stokvels
        </Link>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "var(--font-poppins)" }}>Create a stokvel</h1>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6 md:p-8 space-y-8">
          {/* Section A: Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>Basic Info</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Stokvel name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Soweto Business Circle"
                  className={`mt-1.5 ${errors.name ? "border-[#E76F51]" : ""}`}
                />
                {errors.name && <p className="text-xs text-[#E76F51] mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Description</Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this stokvel about?"
                  rows={3}
                  className={`w-full mt-1.5 px-4 py-3 rounded-lg border text-sm bg-white outline-none focus:border-[#0B8C6B] focus:ring-[0_0_0_3px_rgba(11,140,107,0.15)] transition-all ${errors.description ? "border-[#E76F51]" : "border-[#E2E4E8]"}`}
                />
                <p className="text-xs text-[#8A8A9A] mt-1">{description.length} / 280</p>
                {errors.description && <p className="text-xs text-[#E76F51] mt-1">{errors.description}</p>}
              </div>
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Goal</Label>
                <Select value={goal} onValueChange={(v) => setGoal(v || "")}>
                  <SelectTrigger className={`mt-1.5 ${errors.goal ? "border-[#E76F51]" : ""}`}>
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {GOAL_OPTIONS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>{goalIcons[g.value as keyof typeof goalIcons]} {g.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.goal && <p className="text-xs text-[#E76F51] mt-1">{errors.goal}</p>}
                {goal === "custom" && (
                  <div className="mt-3">
                    <Input
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      placeholder="Describe your goal"
                      className={errors.customGoal ? "border-[#E76F51]" : ""}
                    />
                    {errors.customGoal && <p className="text-xs text-[#E76F51] mt-1">{errors.customGoal}</p>}
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Privacy</Label>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setPrivacy("public")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      privacy === "public"
                        ? "border-[#0B8C6B] bg-[rgba(11,140,107,0.06)] text-[#0B8C6B]"
                        : "border-[#E2E4E8] text-[#4A4A5A]"
                    }`}
                  >
                    <Globe className="w-4 h-4" /> Public
                  </button>
                  <button
                    onClick={() => setPrivacy("invite-only")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      privacy === "invite-only"
                        ? "border-[#0B8C6B] bg-[rgba(11,140,107,0.06)] text-[#0B8C6B]"
                        : "border-[#E2E4E8] text-[#4A4A5A]"
                    }`}
                  >
                    <Lock className="w-4 h-4" /> Invite-only
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E2E4E8]" />

          {/* Section B: Financial Setup */}
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>Financial Setup</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Duration</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {DURATION_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        duration === d
                          ? "bg-[#0B8C6B] text-white"
                          : "bg-[#F6F7F9] text-[#4A4A5A]"
                      }`}
                    >
                      {d} months
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Monthly Contribution</Label>
                <p className="text-2xl font-bold text-[#0B8C6B] mt-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  R {monthlyContribution.toLocaleString()}
                </p>
                <Slider
                  value={[monthlyContribution]}
                  onValueChange={(v) => {
                    const arr = Array.isArray(v) ? v : [v];
                    setMonthlyContribution(arr[0]);
                  }}
                  min={100}
                  max={10000}
                  step={100}
                  className="w-full mt-4"
                />
              </div>
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Maximum members</Label>
                <Input
                  type="number"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(parseInt(e.target.value) || 0)}
                  min={2}
                  max={50}
                  className={`mt-1.5 ${errors.maxMembers ? "border-[#E76F51]" : ""}`}
                />
                <p className="text-xs text-[#8A8A9A] mt-1">Including yourself</p>
                {errors.maxMembers && <p className="text-xs text-[#E76F51] mt-1">{errors.maxMembers}</p>}
              </div>
              <div>
                <Label className="text-sm text-[#4A4A5A] font-medium">Risk Appetite</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  {(["conservative", "moderate", "aggressive"] as const).map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setRiskAppetite(risk)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        riskAppetite === risk
                          ? "border-[#0B8C6B] bg-[rgba(11,140,107,0.06)]"
                          : "border-[#E2E4E8]"
                      }`}
                    >
                      <p className="font-semibold text-[#1A1A2E] capitalize">{risk}</p>
                      <p className="text-xs text-[#4A4A5A] mt-1">
                        {risk === "conservative" && "Preserve capital"}
                        {risk === "moderate" && "Balance growth"}
                        {risk === "aggressive" && "Maximize growth"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E2E4E8]" />

          {/* Section C: ETF Preview */}
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>ETF Allocation Preview</h2>
            <div className="bg-[#F6F7F9] rounded-xl p-5">
              <p className="text-sm text-[#4A4A5A] mb-4">Based on your selected risk appetite.</p>
              <ETFAllocationBar risk={riskAppetite} />
              <p className="text-xs text-[#8A8A9A] mt-4">This is a theoretical allocation. Actual ETFs are selected during formal registration.</p>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-[#0B8C6B] hover:bg-[#14A085] text-white font-semibold"
          >
            Create stokvel
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
