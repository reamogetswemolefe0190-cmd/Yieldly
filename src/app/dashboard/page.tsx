"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { MOCK_STOKVELS, MOCK_ACTIVITIES } from "@/lib/mock-data";
import { AppShell } from "@/components/layout/AppShell";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Wallet,
  Users,
  Calculator,
  TrendingUp,
  Search,
  Plus,
  Share2,
  ArrowRight,
  Wallet as WalletIcon,
  UserPlus,
  Bell,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

function StatsCards({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      icon: Wallet,
      iconBg: "#E2F0EC",
      iconColor: "#0B8C6B",
      label: "Total contributed",
      value: "R 24 500.00",
      trend: "+R 2 500 this month",
      trendColor: "#2A9D8F",
    },
    {
      icon: Users,
      iconBg: "#FEF3E2",
      iconColor: "#B8860B",
      label: "Active stokvels",
      value: "3",
      trend: "2 public, 1 invite-only",
      trendColor: "#8A8A9A",
    },
    {
      icon: TrendingUp,
      iconBg: "#E2F0EC",
      iconColor: "#0B8C6B",
      label: "Projected value (12 mo)",
      value: "R 31 200.00",
      trend: "+27% estimated growth",
      trendColor: "#2A9D8F",
    },
    {
      icon: Calculator,
      iconBg: "#FEF3E2",
      iconColor: "#E88D3A",
      label: "Est. annual yield",
      value: "7.2%",
      trend: "Based on moderate ETF allocation",
      trendColor: "#E88D3A",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#E2E4E8] p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: stat.iconBg }}
              >
                <Icon className="w-6 h-6" style={{ color: stat.iconColor }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
              {stat.value}
            </p>
            <p className="text-sm text-[#8A8A9A] mb-1">{stat.label}</p>
            <p className="text-xs font-medium" style={{ color: stat.trendColor }}>
              {stat.trend}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function QuickActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <Link href="/stokvels" className="flex-1">
        <Button variant="outline" className="w-full h-12 gap-2 border-[#E2E4E8] text-[#1A1A2E] hover:bg-[#F6F7F9]">
          <Search className="w-4 h-4" />
          Join a Stokvel
        </Button>
      </Link>
      <Link href="/stokvels/create" className="flex-1">
        <Button className="w-full h-12 gap-2 bg-[#0B8C6B] hover:bg-[#14A085] text-white">
          <Plus className="w-4 h-4" />
          Create a Stokvel
        </Button>
      </Link>
      <Button
        variant="outline"
        className="flex-1 h-12 gap-2 bg-[#E88D3A] hover:bg-[#D47B2A] text-white border-none"
        onClick={() => {
          toast.success("Invite link copied to clipboard!");
        }}
      >
        <Share2 className="w-4 h-4" />
        Invite Friends
      </Button>
    </div>
  );
}

function MyStokvelsSection({ loading }: { loading: boolean }) {
  const myStokvels = MOCK_STOKVELS.slice(0, 3);
  const router = useRouter();

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E2E4E8] p-6">
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (myStokvels.length === 0) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#E2F0EC] flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-[#0B8C6B]" />
        </div>
        <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">You haven&apos;t joined any stokvels yet</h3>
        <p className="text-sm text-[#4A4A5A] mb-4">Browse or create one to get started</p>
        <Link href="/stokvels">
          <Button className="bg-[#0B8C6B] hover:bg-[#14A085] text-white">Browse stokvels</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1A1A2E]" style={{ fontFamily: "var(--font-poppins)" }}>
          My stokvels
        </h2>
        <Link href="/stokvels" className="text-sm text-[#0B8C6B] font-medium flex items-center gap-1 hover:underline">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {myStokvels.map((stokvel) => {
          const currentMonth = stokvel.members[0]?.contributionStatus === "paid" ? 8 : 7;
          const contributed = currentMonth * stokvel.monthlyContribution;
          const goal = stokvel.duration * stokvel.monthlyContribution;

          return (
            <div
              key={stokvel.id}
              onClick={() => router.push(`/stokvels/${stokvel.id}`)}
              className="bg-white rounded-2xl border border-[#E2E4E8] p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-3">
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
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">{stokvel.name}</h3>
              <div className="flex items-center gap-3 text-sm text-[#8A8A9A] mb-4">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {stokvel.currentMembers}/{stokvel.maxMembers} members
                </span>
                <span className="flex items-center gap-1">
                  <Wallet className="w-4 h-4" /> R {stokvel.monthlyContribution.toLocaleString()}/mo
                </span>
              </div>
              <ProgressBar
                current={currentMonth}
                total={stokvel.duration}
                label="Progress"
                size="sm"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-[#0B8C6B]">
                  R {contributed.toLocaleString()} contributed
                </span>
                <span className="text-sm text-[#8A8A9A]">
                  R {goal.toLocaleString()} goal
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityFeed({ loading }: { loading: boolean }) {
  const activities = MOCK_ACTIVITIES;

  const iconMap = {
    contribution: { icon: WalletIcon, bg: "#E2F0EC", color: "#0B8C6B" },
    member_joined: { icon: UserPlus, bg: "#FEF3E2", color: "#B8860B" },
    etf_update: { icon: TrendingUp, bg: "#E2F0EC", color: "#0B8C6B" },
    notification: { icon: Bell, bg: "#F4F4F6", color: "#8A8A9A" },
    milestone: { icon: CheckCircle, bg: "#E2F0EC", color: "#0B8C6B" },
    settings: { icon: Bell, bg: "#F4F4F6", color: "#8A8A9A" },
  };

  if (loading) {
    return (
      <div className="mt-8">
        <Skeleton className="h-8 w-32 mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E2E4E8] p-4 mb-2">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
        Recent activity
      </h2>
      <div className="space-y-2">
        {activities.map((activity) => {
          const config = iconMap[activity.type] || iconMap.notification;
          const Icon = config.icon;
          return (
            <div
              key={activity.id}
              className="bg-white rounded-xl border border-[#E2E4E8] p-4 flex items-center gap-3 hover:bg-[rgba(11,140,107,0.03)] transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: config.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: config.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1A1A2E] font-medium">{activity.text}</p>
                {activity.subtext && (
                  <p className="text-xs text-[#8A8A9A]">{activity.subtext}</p>
                )}
              </div>
              <span className="text-xs text-[#8A8A9A] flex-shrink-0">{activity.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell>
      <div className="max-w-[1200px] mx-auto">
        <StatsCards loading={loading} />
        <QuickActions />
        <MyStokvelsSection loading={loading} />
        <ActivityFeed loading={loading} />
      </div>
    </AppShell>
  );
}
