"use client";

import React from "react";
import type { RiskLevel } from "@/lib/types";
import { RISK_ALLOCATIONS } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ETFAllocationPreviewProps {
  risk: RiskLevel;
  showLegend?: boolean;
  showChart?: boolean;
  size?: "sm" | "md";
}

export function ETFAllocationPreview({
  risk,
  showLegend = true,
  showChart = true,
  size = "md",
}: ETFAllocationPreviewProps) {
  const data = RISK_ALLOCATIONS[risk];

  const chartSize = size === "sm" ? 120 : 240;

  return (
    <div className="bg-[#F6F7F9] rounded-xl p-4 md:p-6">
      <h4
        className="text-base font-semibold text-[#1A1A2E] mb-1"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        ETF Allocation Preview
      </h4>
      <p className="text-sm text-[#8A8A9A] mb-4">
        Based on your selected risk appetite.
      </p>

      {showChart && (
        <div className="flex justify-center mb-4">
          <ResponsiveContainer width={chartSize} height={chartSize}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={size === "sm" ? 30 : 60}
                outerRadius={size === "sm" ? 50 : 90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {showLegend && (
        <div className="space-y-2">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-[#4A4A5A]">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-[#1A1A2E]">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-[#8A8A9A] mt-4">
        This is a theoretical allocation. Actual ETFs are selected during formal registration.
      </p>
    </div>
  );
}

export function ETFAllocationBar({ risk }: { risk: RiskLevel }) {
  const data = RISK_ALLOCATIONS[risk];

  return (
    <div className="w-full">
      <div className="flex h-3 rounded-full overflow-hidden">
        {data.map((item) => (
          <div
            key={item.label}
            className="h-full transition-all duration-500"
            style={{
              width: `${item.value}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-[#4A4A5A]">
              {item.label} {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
