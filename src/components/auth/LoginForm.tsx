"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forgotOpen, setForgotOpen] = useState(false);
  const [socialToast, setSocialToast] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (field: string) => {
    if (field === "email" && (!email || !/^\S+@\S+\.\S+$/.test(email))) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
    } else if (field === "email") {
      setErrors((prev) => { const n = { ...prev }; delete n.email; return n; });
    }
    if (field === "password" && (!password || password.length < 8)) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters." }));
    } else if (field === "password") {
      setErrors((prev) => { const n = { ...prev }; delete n.password; return n; });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`w-full h-10 px-3 rounded-lg border bg-white text-sm outline-none transition-colors focus:border-[#0B8C6B] focus:ring-2 focus:ring-[#0B8C6B]/20 ${
              errors.email ? "border-[#E76F51]" : "border-[#E2E4E8]"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-[#E76F51] animate-in fade-in duration-200">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-[#1A1A2E]">
              Password
            </label>
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="text-sm text-[#0B8C6B] hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`w-full h-10 px-3 pr-10 rounded-lg border bg-white text-sm outline-none transition-colors focus:border-[#0B8C6B] focus:ring-2 focus:ring-[#0B8C6B]/20 ${
                errors.password ? "border-[#E76F51]" : "border-[#E2E4E8]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A9A] hover:text-[#4A4A5A] transition-opacity"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-[#E76F51] animate-in fade-in duration-200">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 flex items-center justify-center rounded-lg bg-[#0B8C6B] text-white font-medium text-sm hover:bg-[#14A085] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E2E4E8]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-[#8A8A9A]">or</span>
        </div>
      </div>

      {/* Social login */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setSocialToast("google")}
          className="h-10 flex items-center justify-center gap-2 rounded-lg border border-[#E2E4E8] bg-white text-sm font-medium text-[#1A1A2E] hover:bg-[#F6F7F9] transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => setSocialToast("apple")}
          className="h-10 flex items-center justify-center gap-2 rounded-lg border border-[#E2E4E8] bg-white text-sm font-medium text-[#1A1A2E] hover:bg-[#F6F7F9] transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.2 0-1.44.63-2.21.45-3.08-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.25.07 2.12.67 2.9.67.84 0 2.12-.74 3.35-.67 1.41.1 2.44.65 3.14 1.66-2.79 1.66-2.34 5.98.22 7.13-.57 1.5-1.31 2.99-2.61 4.18zm-5.85-15c.07-1.92 1.66-3.58 3.58-3.72.29 2.14-1.88 4.37-3.58 3.72z" />
          </svg>
          Continue with Apple
        </button>
      </div>

      {socialToast && (
        <p className="mt-3 text-center text-xs text-[#8A8A9A]">
          Social login is simulated in this demo.
        </p>
      )}

      {/* Footer link */}
      <p className="mt-6 text-center text-sm text-[#4A4A5A]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#0B8C6B] font-semibold hover:underline"
        >
          Register
        </Link>
      </p>

      {/* Forgot password dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password Reset</DialogTitle>
            <DialogDescription>
              Password reset is simulated in this demo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  );
}
