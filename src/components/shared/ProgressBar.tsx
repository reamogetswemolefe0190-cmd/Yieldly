"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  size?: "sm" | "md";
  color?: "primary" | "accent";
}

export function ProgressBar({
  current,
  total,
  label,
  size = "md",
  color = "primary",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  const barColor = color === "primary" ? "#0B8C6B" : "#E88D3A";
  const height = size === "sm" ? "h-2" : "h-3";

  return (
    <div className="w-full">
      {(label || total > 0) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-medium text-[#4A4A5A]">{label}</span>
          )}
          <span className="text-xs text-[#8A8A9A]">
            {current} of {total}
          </span>
        </div>
      )}
      <div className={`w-full ${height} bg-[#E2E4E8] rounded-full overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}
