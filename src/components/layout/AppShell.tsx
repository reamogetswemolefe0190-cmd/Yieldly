"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Home,
  Search,
  PlusCircle,
  Settings,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/stokvels", label: "Explore", icon: Search },
  { href: "/stokvels/create", label: "Create", icon: PlusCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-[#F6F7F9]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-[#E2E4E8] sticky top-0 h-[100dvh] z-30">
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <span className="text-[#0B8C6B] font-bold text-lg" style={{ fontFamily: "var(--font-poppins)" }}>
            Yieldly
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[rgba(11,140,107,0.06)] text-[#0B8C6B]"
                    : "text-[#4A4A5A] hover:bg-[rgba(11,140,107,0.06)] hover:text-[#0B8C6B]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E2E4E8]">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-[#0B8C6B] text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A2E] truncate">{user?.name}</p>
              <p className="text-xs text-[#8A8A9A] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-[#4A4A5A] hover:text-[#E76F51] transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(26,26,46,0.55)] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#E2E4E8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <span className="text-[#0B8C6B] font-bold text-lg">Yieldly</span>
          </div>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-[#4A4A5A]" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[rgba(11,140,107,0.06)] text-[#0B8C6B]"
                    : "text-[#4A4A5A] hover:bg-[rgba(11,140,107,0.06)]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E2E4E8]">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-[#0B8C6B] text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">{user?.name}</p>
              <p className="text-xs text-[#8A8A9A]">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-[#4A4A5A] hover:text-[#E76F51]"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E4E8] sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-[#4A4A5A]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
              <span className="text-white font-bold text-xs">Y</span>
            </div>
            <span className="text-[#0B8C6B] font-bold text-base">Yieldly</span>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#0B8C6B] text-white text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-[#E2E4E8] sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#1A1A2E]" style={{ fontFamily: "var(--font-poppins)" }}>
            {pathname === "/dashboard" && "Dashboard"}
            {pathname === "/stokvels" && "Explore Stokvels"}
            {pathname === "/stokvels/create" && "Create Stokvel"}
            {pathname.startsWith("/stokvels/") && pathname !== "/stokvels/create" && pathname !== "/stokvels" && "Stokvel Details"}
            {pathname === "/settings" && "Settings"}
            {pathname === "/onboarding" && "Onboarding"}
          </h1>
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#0B8C6B] text-white text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E4E8] z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 ${
                  active ? "text-[#0B8C6B]" : "text-[#8A8A9A]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
