"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { MOCK_CARDS } from "@/lib/mock-data";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  MoreVertical,
  Plus,
  Lock,
  Smartphone,
  Globe,
} from "lucide-react";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddCard, setShowAddCard] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
    { id: "kyc", label: "KYC Status" },
    { id: "cards", label: "Bank Cards" },
  ];

  const bankColors: Record<string, string> = {
    FNB: "from-[#0B8C6B] to-[#14A085]",
    ABSA: "from-[#C41E3A] to-[#E76F51]",
    "Standard Bank": "from-[#003B5C] to-[#005A87]",
    Capitec: "from-[#E31837] to-[#FF4757]",
    Nedbank: "from-[#006341] to-[#00965E]",
    Investec: "from-[#003366] to-[#0055A4]",
    Other: "from-[#4A4A5A] to-[#8A8A9A]",
  };

  return (
    <AppShell>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "var(--font-poppins)" }}>Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#0B8C6B] text-white"
                  : "bg-white text-[#4A4A5A] border border-[#E2E4E8] hover:text-[#0B8C6B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6 md:p-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Profile</h2>
              <p className="text-sm text-[#4A4A5A] mb-6">Manage your personal information.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-[#0B8C6B] flex items-center justify-center text-white text-xl font-bold">
                  {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"}
                </div>
                <button
                  className="text-sm text-[#0B8C6B] font-medium hover:underline"
                  onClick={() => toast("Photo upload is simulated in this demo.")}
                >
                  Change photo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px]">
                <div className="md:col-span-2">
                  <Label className="text-sm text-[#4A4A5A] font-medium">Full name</Label>
                  <Input defaultValue={user?.name} className="mt-1.5" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm text-[#4A4A5A] font-medium">Email address</Label>
                  <Input defaultValue={user?.email} disabled className="mt-1.5 bg-[#F6F7F9]" />
                </div>
                <div>
                  <Label className="text-sm text-[#4A4A5A] font-medium">Mobile number</Label>
                  <Input defaultValue={user?.phone} className="mt-1.5" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm text-[#4A4A5A] font-medium">Residential address</Label>
                  <textarea
                    defaultValue={user?.address}
                    rows={3}
                    className="w-full mt-1.5 px-4 py-3 rounded-lg border border-[#E2E4E8] text-sm bg-white outline-none focus:border-[#0B8C6B] focus:ring-[0_0_0_3px_rgba(11,140,107,0.15)]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  className="bg-[#0B8C6B] hover:bg-[#14A085] text-white"
                  onClick={() => toast.success("Profile updated.")}
                >
                  Save changes
                </Button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Notifications</h2>
              <p className="text-sm text-[#4A4A5A] mb-6">Choose how you want to be notified.</p>
              <div className="space-y-4 max-w-[600px]">
                {[
                  { label: "Contribution reminders", desc: "Get reminded before your monthly contribution is due." },
                  { label: "Stokvel updates", desc: "When a member joins, leaves, or a milestone is reached." },
                  { label: "Goal progress", desc: "Weekly summary of your stokvel goals and projected values." },
                  { label: "Marketing & tips", desc: "Occasional updates about new features and savings tips." },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#E2E4E8]">
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">{item.label}</p>
                      <p className="text-xs text-[#8A8A9A]">{item.desc}</p>
                    </div>
                    <Switch
                      defaultChecked
                      onCheckedChange={() => toast("Preference saved.")}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-[#1A1A2E] mb-3">Push Notifications (Mock)</p>
                <p className="text-xs text-[#8A8A9A] mb-3">Push notifications are simulated in this demo.</p>
                {["Enable push notifications", "Contribution due alerts", "Stokvel invites"].map((label) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-[#E2E4E8]">
                    <p className="text-sm text-[#1A1A2E]">{label}</p>
                    <Switch />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Label className="text-sm text-[#4A4A5A] font-medium">Digest frequency</Label>
                <select className="mt-2 px-3 py-2 rounded-lg border border-[#E2E4E8] text-sm bg-white">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Security</h2>
              <p className="text-sm text-[#4A4A5A] mb-6">Manage your password and account security.</p>
              <div className="space-y-4 max-w-[500px]">
                <div>
                  <Label className="text-sm text-[#4A4A5A] font-medium">Current password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm text-[#4A4A5A] font-medium">New password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm text-[#4A4A5A] font-medium">Confirm new password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <Button
                  className="bg-[#0B8C6B] hover:bg-[#14A085] text-white"
                  onClick={() => toast.success("Password updated (simulated).")}
                >
                  Update password
                </Button>
              </div>

              <div className="h-px bg-[#E2E4E8] my-8" />

              <div>
                <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Two-factor authentication</h3>
                <p className="text-sm text-[#4A4A5A] mb-4">Add an extra layer of security to your account. In this demo, 2FA is simulated.</p>
                <div className="flex items-center gap-3">
                  <Switch checked={twoFAEnabled} onCheckedChange={(v) => { setTwoFAEnabled(v); if (v) setShow2FA(true); }} />
                  <span className="text-sm text-[#1A1A2E]">Enable 2FA</span>
                </div>
                {show2FA && (
                  <div className="mt-4 p-4 border border-[#E2E4E8] rounded-xl bg-[#F6F7F9]">
                    <p className="text-sm font-medium text-[#1A1A2E] mb-2">1. Scan QR code</p>
                    <div className="w-32 h-32 bg-[#E2E4E8] rounded-lg flex items-center justify-center mb-4">
                      <span className="text-xs text-[#8A8A9A]">QR code placeholder</span>
                    </div>
                    <p className="text-sm font-medium text-[#1A1A2E] mb-2">2. Enter 6-digit code</p>
                    <Input className="max-w-[200px]" placeholder="000000" />
                    <Button
                      className="mt-3 bg-[#0B8C6B] hover:bg-[#14A085] text-white"
                      onClick={() => { toast.success("2FA verified (simulated)."); setShow2FA(false); }}
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </div>

              <div className="h-px bg-[#E2E4E8] my-8" />

              <div>
                <h3 className="text-lg font-semibold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-poppins)" }}>Active sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-[#E2E4E8]">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
                      <div>
                        <p className="text-sm text-[#1A1A2E]">Johannesburg, South Africa — Chrome on Windows</p>
                        <p className="text-xs text-[#8A8A9A]">Current</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#E2E4E8]">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#E2E4E8]" />
                      <div>
                        <p className="text-sm text-[#1A1A2E]">Cape Town, South Africa — Safari on iPhone</p>
                        <p className="text-xs text-[#8A8A9A]">2 days ago</p>
                      </div>
                    </div>
                    <button
                      className="text-xs text-[#E76F51] font-medium hover:underline"
                      onClick={() => toast("Session ended (simulated).")}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === "kyc" && (
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>KYC Status</h2>
              <p className="text-sm text-[#4A4A5A] mb-6">Your identity verification status.</p>
              <div className="bg-[#E2F0EC] rounded-xl p-5 mb-6 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#0B8C6B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#0B8C6B]">Verified</p>
                  <p className="text-sm text-[#0B8C6B]">Your identity has been verified. You can create and join stokvels.</p>
                </div>
              </div>
              <div className="space-y-0 border border-[#E2E4E8] rounded-xl overflow-hidden">
                {[
                  { label: "Full Name", value: user?.name },
                  { label: "SA ID Number", value: user?.idNumber },
                  { label: "Phone Number", value: user?.phone },
                  { label: "Address", value: user?.address },
                  { label: "Employment Status", value: user?.employmentStatus },
                  { label: "Income Range", value: user?.incomeRange },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3 border-b border-[#E2E4E8] last:border-b-0">
                    <span className="text-sm text-[#4A4A5A]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1A1A2E]">{item.value || "—"}</span>
                      <CheckCircle className="w-4 h-4 text-[#2A9D8F]" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#8A8A9A] mt-4">
                KYC data is encrypted and stored in compliance with POPIA (Protection of Personal Information Act). This is a demo — no real data is stored.
              </p>
            </div>
          )}

          {/* Bank Cards Tab */}
          {activeTab === "cards" && (
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>Bank Cards</h2>
              <p className="text-sm text-[#4A4A5A] mb-6">Manage your linked payment methods.</p>
              <div className="space-y-4 max-w-[400px]">
                {MOCK_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className={`w-full h-44 rounded-2xl bg-gradient-to-br ${bankColors[card.bank] || bankColors.Other} p-5 flex flex-col justify-between text-white shadow-lg relative`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-lg">{card.bank}</p>
                        {card.isDefault && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 mt-1 inline-block">Default</span>
                        )}
                      </div>
                      <CreditCard className="w-6 h-6 opacity-80" />
                    </div>
                    <p className="font-mono text-xl tracking-widest">
                      •••• •••• •••• {card.last4}
                    </p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] opacity-70 uppercase">Cardholder</p>
                        <p className="text-sm font-medium">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] opacity-70 uppercase">Expiry</p>
                        <p className="text-sm font-medium">{card.expiry}</p>
                      </div>
                    </div>
                    <button
                      className="absolute top-4 right-12"
                      onClick={() => toast("Card options (simulated).")}
                    >
                      <MoreVertical className="w-5 h-5 opacity-80" />
                    </button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full max-w-[400px] gap-2"
                onClick={() => setShowAddCard(true)}
              >
                <Plus className="w-4 h-4" /> Add new card
              </Button>
              <p className="text-xs text-[#8A8A9A] mt-4 max-w-[400px]">
                Your card details are tokenized and encrypted. This is a demo — no real payments are processed.
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add new card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Name on card</Label>
              <Input className="mt-1.5" placeholder="Thabo Mokoena" />
            </div>
            <div>
              <Label>Card number</Label>
              <Input className="mt-1.5" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Expiry</Label>
                <Input className="mt-1.5" placeholder="MM/YY" />
              </div>
              <div>
                <Label>CVV</Label>
                <Input className="mt-1.5" placeholder="123" />
              </div>
            </div>
            <div>
              <Label>Bank</Label>
              <select className="w-full mt-1.5 px-3 py-2 rounded-lg border border-[#E2E4E8] text-sm bg-white">
                <option>FNB</option>
                <option>ABSA</option>
                <option>Standard Bank</option>
                <option>Capitec</option>
                <option>Nedbank</option>
              </select>
            </div>
            <Button
              className="w-full bg-[#0B8C6B] hover:bg-[#14A085] text-white"
              onClick={() => { toast.success("Card added (simulated)."); setShowAddCard(false); }}
            >
              Add card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
