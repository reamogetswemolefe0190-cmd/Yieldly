"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_STOKVELS } from "@/lib/mock-data";
import { AppShell } from "@/components/layout/AppShell";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { ETFAllocationPreview } from "@/components/shared/ETFAllocationPreview";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  ArrowLeft,
  UserPlus,
  CheckCircle,
  Circle,
  Users,
  Lock,
  TrendingUp,
} from "lucide-react";

export default function StokvelDetailClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const stokvel = MOCK_STOKVELS.find((s) => s.id === params.id);

  if (!stokvel) {
    return (
      <AppShell>
        <div className="max-w-[1200px] mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Stokvel not found</h1>
          <Link href="/stokvels" className="text-[#0B8C6B] hover:underline">Back to stokvels</Link>
        </div>
      </AppShell>
    );
  }

  const totalPool = stokvel.monthlyContribution * stokvel.currentMembers;
  const monthsRemaining = stokvel.duration - 8;
  const isMember = true;
  const isFull = stokvel.currentMembers >= stokvel.maxMembers;

  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase();
  const getAvatarColor = (name: string) => {
    const colors = ["#0B8C6B", "#14A085", "#E88D3A", "#2A9D8F", "#B8860B", "#C0392B"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <AppShell>
      <div className="max-w-[1200px] mx-auto">
        <Link href="/stokvels" className="inline-flex items-center gap-2 text-sm text-[#0B8C6B] font-medium mb-4 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-poppins)" }}>
              {stokvel.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#E2F0EC] text-[#0B8C6B]">
                {stokvel.goal === "custom" ? stokvel.customGoal : stokvel.goal}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                stokvel.riskAppetite === "conservative" ? "bg-[#E2F0EC] text-[#0B8C6B]" :
                stokvel.riskAppetite === "moderate" ? "bg-[#FEF3E2] text-[#B8860B]" :
                "bg-[#FDE8E4] text-[#C0392B]"
              }`}>
                {stokvel.riskAppetite}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${
                stokvel.privacy === "public" ? "bg-[#E2F0EC] text-[#0B8C6B]" : "bg-[#F4F4F6] text-[#4A4A5A]"
              }`}>
                {stokvel.privacy === "public" ? <Users className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {stokvel.privacy}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isMember ? (
              <>
                <Button variant="outline" className="gap-2" onClick={() => toast.success("Invite link copied to clipboard!")}>
                  <UserPlus className="w-4 h-4" /> Invite
                </Button>
                <Button variant="ghost" className="text-[#E76F51]" onClick={() => toast("You left the stokvel")}>
                  Leave
                </Button>
              </>
            ) : (
              <Button
                className="bg-[#0B8C6B] hover:bg-[#14A085] text-white"
                disabled={isFull || stokvel.privacy === "invite-only"}
                onClick={() => toast.success(`You joined ${stokvel.name}!`)}
              >
                {isFull ? "Full" : stokvel.privacy === "invite-only" ? "Invite only" : "Join stokvel"}
              </Button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Pool", value: `R ${totalPool.toLocaleString()}`, sub: "monthly × members" },
            { label: "Members", value: `${stokvel.currentMembers}/${stokvel.maxMembers}`, sub: "Members joined" },
            { label: "Monthly", value: `R ${stokvel.monthlyContribution.toLocaleString()}`, sub: "Per member / month" },
            { label: "Remaining", value: `${monthsRemaining}`, sub: `Months left (of ${stokvel.duration})` },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E4E8] p-4">
              <p className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-poppins)" }}>{stat.value}</p>
              <p className="text-xs text-[#8A8A9A] mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* ETF Allocation */}
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1A1A2E]" style={{ fontFamily: "var(--font-poppins)" }}>ETF Allocation</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  stokvel.riskAppetite === "conservative" ? "bg-[#E2F0EC] text-[#0B8C6B]" :
                  stokvel.riskAppetite === "moderate" ? "bg-[#FEF3E2] text-[#B8860B]" :
                  "bg-[#FDE8E4] text-[#C0392B]"
                }`}>
                  {stokvel.riskAppetite}
                </span>
              </div>
              <ETFAllocationPreview risk={stokvel.riskAppetite} showChart size="sm" />
              <p className="text-sm text-[#4A4A5A] mt-4">
                {stokvel.riskAppetite === "moderate" && "This balanced approach aims to protect capital while capturing moderate growth through a mix of bond and equity ETFs."}
                {stokvel.riskAppetite === "conservative" && "Focused on preserving capital with minimal volatility, primarily through cash and bond instruments."}
                {stokvel.riskAppetite === "aggressive" && "Higher exposure to equity markets for maximum growth potential, accepting higher volatility."}
              </p>
            </div>

            {/* Members */}
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1A1A2E]" style={{ fontFamily: "var(--font-poppins)" }}>Members</h3>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F6F7F9] text-[#4A4A5A]">
                  {stokvel.currentMembers}
                </span>
              </div>
              <div className="space-y-3">
                {stokvel.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback style={{ backgroundColor: getAvatarColor(member.name), color: "white", fontSize: "12px" }}>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1A1A2E]">{member.name}</p>
                    </div>
                    {member.role === "admin" && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E2F0EC] text-[#0B8C6B]">Admin</span>
                    )}
                    {member.role === "pending" && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#FEF3E2] text-[#B8860B]">Pending</span>
                    )}
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      member.contributionStatus === "paid" ? "bg-[#2A9D8F]" : "bg-[#E2E4E8]"
                    }`} />
                  </div>
                ))}
              </div>
              {isMember && (
                <Button
                  variant="outline"
                  className="w-full mt-4 gap-2"
                  onClick={() => toast.success("Invite link copied to clipboard!")}
                >
                  <UserPlus className="w-4 h-4" /> Invite more members
                </Button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>Timeline</h3>
              <ProgressBar current={8} total={stokvel.duration} size="sm" />
              <div className="mt-4 space-y-3">
                {stokvel.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {m.completed ? (
                      <CheckCircle className="w-5 h-5 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#E2E4E8] flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm ${m.completed ? "text-[#1A1A2E] font-medium" : "text-[#8A8A9A]"}`}>{m.title}</p>
                      <p className="text-xs text-[#8A8A9A]">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>Payment history</h3>
              <div className="space-y-3">
                {stokvel.payments.slice(0, 5).map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#E2E4E8] last:border-b-0">
                    <span className="text-sm text-[#4A4A5A]">{p.month}</span>
                    <span className="text-sm font-semibold text-[#0B8C6B]">R {p.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>Recent activity</h3>
              <div className="space-y-3">
                {stokvel.activities.map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F6F7F9] flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-[#0B8C6B]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#1A1A2E]">{a.text}</p>
                      <p className="text-xs text-[#8A8A9A]">{a.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
