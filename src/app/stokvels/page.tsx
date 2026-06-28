"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_STOKVELS } from "@/lib/mock-data";
import { AppShell } from "@/components/layout/AppShell";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Users, Calendar, Lock, Globe, Plus } from "lucide-react";

export default function StokvelsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const router = useRouter();

  const filtered = useMemo(() => {
    return MOCK_STOKVELS.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.goal.toLowerCase().includes(search.toLowerCase()) ||
        (s.customGoal?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesRisk = riskFilter === "all" || s.riskAppetite === riskFilter;
      const matchesGoal = goalFilter === "all" || s.goal === goalFilter;
      const matchesDuration = durationFilter === "all" || s.duration === parseInt(durationFilter);
      return matchesSearch && matchesRisk && matchesGoal && matchesDuration;
    });
  }, [search, riskFilter, goalFilter, durationFilter]);

  const activeFilters = [
    riskFilter !== "all" ? { key: "risk", label: riskFilter, clear: () => setRiskFilter("all") } : null,
    goalFilter !== "all" ? { key: "goal", label: goalFilter, clear: () => setGoalFilter("all") } : null,
    durationFilter !== "all" ? { key: "duration", label: `${durationFilter} months`, clear: () => setDurationFilter("all") } : null,
  ].filter(Boolean);

  return (
    <AppShell>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A9A]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or goal..."
              className="pl-10 pr-10"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[#8A8A9A]" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#E2E4E8] text-sm bg-white text-[#4A4A5A]"
            >
              <option value="all">All risks</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
            <select
              value={goalFilter}
              onChange={(e) => setGoalFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#E2E4E8] text-sm bg-white text-[#4A4A5A]"
            >
              <option value="all">All goals</option>
              <option value="home">Home</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="emergency">Emergency</option>
              <option value="travel">Travel</option>
              <option value="custom">Custom</option>
            </select>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#E2E4E8] text-sm bg-white text-[#4A4A5A]"
            >
              <option value="all">All durations</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="60">60 months</option>
            </select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((f) => (
              <span key={f!.key} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E2F0EC] text-[#0B8C6B] text-xs font-medium">
                {f!.label}
                <button onClick={f!.clear}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-[#8A8A9A] mb-4">Showing {filtered.length} stokvels</p>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#F6F7F9] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#8A8A9A]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">No stokvels match your filters</h3>
            <Button variant="outline" onClick={() => { setSearch(""); setRiskFilter("all"); setGoalFilter("all"); setDurationFilter("all"); }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((stokvel) => {
              const isFull = stokvel.currentMembers >= stokvel.maxMembers;
              return (
                <div
                  key={stokvel.id}
                  onClick={() => router.push(`/stokvels/${stokvel.id}`)}
                  className="bg-white rounded-2xl border border-[#E2E4E8] p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#E2F0EC] text-[#0B8C6B]">
                      {stokvel.goal === "custom" ? stokvel.customGoal : stokvel.goal}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      stokvel.privacy === "public" ? "bg-[#E2F0EC] text-[#0B8C6B]" : "bg-[#F4F4F6] text-[#4A4A5A]"
                    }`}>
                      {stokvel.privacy === "public" ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      {stokvel.privacy === "public" ? "Public" : "Invite-only"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A2E] mb-1">{stokvel.name}</h3>
                  <p className="text-sm text-[#4A4A5A] line-clamp-2 mb-3">{stokvel.description}</p>
                  <div className="flex items-center gap-4 text-sm text-[#8A8A9A] mb-3">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {stokvel.currentMembers}/{stokvel.maxMembers}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {stokvel.duration} mo</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1A1A2E] mb-3">R {stokvel.monthlyContribution.toLocaleString()} / month</p>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-3 ${
                    stokvel.riskAppetite === "conservative" ? "bg-[#E2F0EC] text-[#0B8C6B]" :
                    stokvel.riskAppetite === "moderate" ? "bg-[#FEF3E2] text-[#B8860B]" :
                    "bg-[#FDE8E4] text-[#C0392B]"
                  }`}>
                    {stokvel.riskAppetite}
                  </span>
                  <ProgressBar
                    current={stokvel.currentMembers}
                    total={stokvel.maxMembers}
                    size="sm"
                    color="accent"
                  />
                  <div className="mt-4">
                    {isFull ? (
                      <Button disabled variant="outline" className="w-full">Full</Button>
                    ) : stokvel.privacy === "invite-only" ? (
                      <Button disabled variant="outline" className="w-full gap-2"><Lock className="w-4 h-4" /> Invite only</Button>
                    ) : (
                      <Button className="w-full bg-[#0B8C6B] hover:bg-[#14A085] text-white">Join stokvel</Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Link href="/stokvels/create">
          <button className="md:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full bg-[#0B8C6B] text-white flex items-center justify-center shadow-lg z-30 hover:scale-105 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </AppShell>
  );
}
