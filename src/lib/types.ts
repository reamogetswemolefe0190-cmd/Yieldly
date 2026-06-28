export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  idNumber?: string;
  address?: string;
  employmentStatus?: string;
  incomeRange?: string;
  goal?: string;
  customGoal?: string;
  duration?: number;
  riskAppetite?: "conservative" | "moderate" | "aggressive";
  monthlyContribution?: number;
  cardLast4?: string;
  bankName?: string;
  kycStatus?: "verified" | "pending" | "rejected";
  onboardingComplete?: boolean;
}

export interface Stokvel {
  id: string;
  name: string;
  description: string;
  goal: string;
  customGoal?: string;
  duration: number;
  monthlyContribution: number;
  maxMembers: number;
  currentMembers: number;
  riskAppetite: "conservative" | "moderate" | "aggressive";
  privacy: "public" | "invite-only";
  createdAt: string;
  members: Member[];
  milestones: Milestone[];
  payments: Payment[];
  activities: Activity[];
}

export interface Member {
  id: string;
  name: string;
  role: "admin" | "member" | "pending";
  avatar?: string;
  contributionStatus: "paid" | "pending";
}

export interface Milestone {
  title: string;
  date: string;
  completed: boolean;
}

export interface Payment {
  month: string;
  amount: number;
  memberCount: number;
}

export interface Activity {
  id: string;
  type: "contribution" | "member_joined" | "etf_update" | "notification" | "milestone" | "settings";
  text: string;
  subtext?: string;
  timestamp: string;
}

export interface DashboardActivity extends Activity {
  stokvelName?: string;
}

export type RiskLevel = "conservative" | "moderate" | "aggressive";

export interface ETFAllocation {
  label: string;
  value: number;
  color: string;
}

export const RISK_ALLOCATIONS: Record<RiskLevel, ETFAllocation[]> = {
  conservative: [
    { label: "Cash / Bonds", value: 70, color: "#0B8C6B" },
    { label: "Balanced ETFs", value: 25, color: "#E9C46A" },
    { label: "Equity ETFs", value: 5, color: "#E88D3A" },
  ],
  moderate: [
    { label: "Cash / Bonds", value: 30, color: "#0B8C6B" },
    { label: "Balanced ETFs", value: 50, color: "#E9C46A" },
    { label: "Equity ETFs", value: 20, color: "#E88D3A" },
  ],
  aggressive: [
    { label: "Cash / Bonds", value: 10, color: "#0B8C6B" },
    { label: "Balanced ETFs", value: 30, color: "#E9C46A" },
    { label: "Equity ETFs", value: 60, color: "#E88D3A" },
  ],
};

export const GOAL_OPTIONS = [
  { value: "home", label: "Buy a home", icon: "Home" },
  { value: "business", label: "Start a business", icon: "Rocket" },
  { value: "education", label: "Education", icon: "GraduationCap" },
  { value: "emergency", label: "Emergency fund", icon: "Shield" },
  { value: "travel", label: "Travel", icon: "Plane" },
  { value: "custom", label: "Custom", icon: "Pencil" },
];

export const DURATION_OPTIONS = [6, 12, 24, 36, 60];

export const EMPLOYMENT_OPTIONS = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed",
  "Contractor / Freelance",
  "Student",
  "Unemployed",
  "Retired",
];

export const INCOME_OPTIONS = [
  "Under R 5 000",
  "R 5 000 – R 10 000",
  "R 10 000 – R 20 000",
  "R 20 000 – R 40 000",
  "Over R 40 000",
  "Prefer not to say",
];

export const BANK_OPTIONS = ["FNB", "ABSA", "Standard Bank", "Capitec", "Nedbank", "Investec", "Other"];
