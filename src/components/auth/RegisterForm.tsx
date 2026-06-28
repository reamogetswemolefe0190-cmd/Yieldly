"use client";

import React, { useState, useMemo } from "react";
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

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthColors = [
  "#E2E4E8",
  "#E9C46A",
  "#E88D3A",
  "#2A9D8F",
  "#0B8C6B",
];

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName || fullName.length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!agreed) {
      newErrors.terms = "You must agree to the terms to continue.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const success = await register(fullName, email, password);
      if (success) {
        router.push("/onboarding");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (field: string) => {
    if (field === "fullName" && (!fullName || fullName.length < 2)) {
      setErrors((prev) => ({ ...prev, fullName: "Please enter your full name." }));
    } else if (field === "fullName") {
      setErrors((prev) => { const n = { ...prev }; delete n.fullName; return n; });
    }
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
    if (field === "confirmPassword" && password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    } else if (field === "confirmPassword") {
      setErrors((prev) => { const n = { ...prev }; delete n.confirmPassword; return n; });
    }
    if (field === "terms" && !agreed) {
      setErrors((prev) => ({ ...prev, terms: "You must agree to the terms to continue." }));
    } else if (field === "terms") {
      setErrors((prev) => { const n = { ...prev }; delete n.terms; return n; });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
            Full name
          </label>
          <input
            type="text"
            placeholder="e.g., Thabo Mokoena"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={`w-full h-10 px-3 rounded-lg border bg-white text-sm outline-none transition-colors focus:border-[#0B8C6B] focus:ring-2 focus:ring-[#0B8C6B]/20 ${
              errors.fullName ? "border-[#E76F51]" : "border-[#E2E4E8]"
            }`}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-[#E76F51] animate-in fade-in duration-200">
              {errors.fullName}
            </p>
          )}
        </div>

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
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
            Password
          </label>
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
          {/* Strength indicator */}
          <div className="mt-2 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor:
                    i < strength ? strengthColors[strength] : "#E2E4E8",
                }}
              />
            ))}
          </div>
          <p className="mt-1.5 text-xs text-[#8A8A9A]">
            Use at least 8 characters with a mix of letters and numbers.
          </p>
          {errors.password && (
            <p className="mt-1.5 text-xs text-[#E76F51] animate-in fade-in duration-200">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              className={`w-full h-10 px-3 pr-10 rounded-lg border bg-white text-sm outline-none transition-colors focus:border-[#0B8C6B] focus:ring-2 focus:ring-[#0B8C6B]/20 ${
                errors.confirmPassword ? "border-[#E76F51]" : "border-[#E2E4E8]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A9A] hover:text-[#4A4A5A] transition-opacity"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-[#E76F51] animate-in fade-in duration-200">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) {
                  setErrors((prev) => { const n = { ...prev }; delete n.terms; return n; });
                }
              }}
              onBlur={() => handleBlur("terms")}
              className="mt-0.5 w-4 h-4 rounded border border-[#E2E4E8] text-[#0B8C6B] focus:ring-[#0B8C6B]"
            />
            <span className="text-sm text-[#4A4A5A] leading-relaxed">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setTermsOpen(true)}
                className="text-[#0B8C6B] hover:underline"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-[#0B8C6B] hover:underline"
              >
                Privacy Policy
              </button>{" "}
              (simulated).
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-xs text-[#E76F51] animate-in fade-in duration-200">
              {errors.terms}
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#4A4A5A]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#0B8C6B] font-semibold hover:underline"
        >
          Log in
        </Link>
      </p>

      {/* Terms dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              This is a simulated Terms of Service for the demo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>

      {/* Privacy dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogDescription>
              This is a simulated Privacy Policy for the demo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  );
}
