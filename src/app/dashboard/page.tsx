import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import SignOutButton from "./SignOutButton";
import {
  ClipboardList,
  Ticket,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  LayoutDashboard,
  ChevronRight,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Work Tracker", href: "/dashboard/work-tracker", icon: ClipboardList },
  { label: "Vouchers", href: "/dashboard/vouchers", icon: Ticket },
  { label: "Reports", href: "/dashboard/reports", icon: BookOpen },
  { label: "Contracts", href: "/dashboard/contracts", icon: FileText },
  { label: "Beneficiary Tools", href: "/dashboard/beneficiaries", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const kpis = [
  {
    label: "Active Vouchers",
    value: "70,240",
    change: "+12%",
    positive: true,
    icon: Ticket,
    color: "terracotta",
  },
  {
    label: "Beneficiaries",
    value: "14,832",
    change: "+8%",
    positive: true,
    icon: Users,
    color: "forest",
  },
  {
    label: "Open Reports",
    value: "23",
    change: "-5",
    positive: true,
    icon: BookOpen,
    color: "sky",
  },
  {
    label: "Pending Tasks",
    value: "7",
    change: "+3",
    positive: false,
    icon: Activity,
    color: "ochre",
  },
];

const projects = [
  {
    name: "Q2 Donor Report — USAID",
    status: "In Progress",
    progress: 72,
    due: "Jun 15, 2026",
    lead: "Finance Team",
  },
  {
    name: "Voucher Distribution — Cycle 4",
    status: "On Track",
    progress: 55,
    due: "Jun 30, 2026",
    lead: "Field Ops",
  },
  {
    name: "Beneficiary Verification — North",
    status: "Review",
    progress: 90,
    due: "May 28, 2026",
    lead: "MEAL Team",
  },
  {
    name: "Staff Contract Renewals",
    status: "Pending",
    progress: 20,
    due: "Jul 1, 2026",
    lead: "HR",
  },
  {
    name: "Partner Capacity Assessment",
    status: "In Progress",
    progress: 40,
    due: "Jul 15, 2026",
    lead: "Partnerships",
  },
];

const focusItems = [
  { text: "Review Q2 USAID report draft", done: true },
  { text: "Approve 3 pending voucher batches", done: false },
  { text: "Confirm beneficiary deduplication", done: false },
  { text: "Submit M&E indicator update", done: false },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-[#4A7FA5]/10 text-[#4A7FA5] border-[#4A7FA5]/25",
  "On Track": "bg-[#3B6B4A]/10 text-[#3B6B4A] border-[#3B6B4A]/25",
  Review: "bg-[#D4A853]/10 text-[#D4A853] border-[#D4A853]/25",
  Pending: "bg-[#9A8878]/10 text-[#9A8878] border-[#9A8878]/25",
};

const kpiColors: Record<string, { bg: string; icon: string; bar: string }> = {
  terracotta: {
    bg: "bg-[#C46B43]/10 border-[#C46B43]/20",
    icon: "text-[#C46B43]",
    bar: "bg-[#C46B43]",
  },
  forest: {
    bg: "bg-[#3B6B4A]/10 border-[#3B6B4A]/20",
    icon: "text-[#3B6B4A]",
    bar: "bg-[#3B6B4A]",
  },
  sky: {
    bg: "bg-[#4A7FA5]/10 border-[#4A7FA5]/20",
    icon: "text-[#4A7FA5]",
    bar: "bg-[#4A7FA5]",
  },
  ochre: {
    bg: "bg-[#D4A853]/10 border-[#D4A853]/20",
    icon: "text-[#D4A853]",
    bar: "bg-[#D4A853]",
  },
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-[#E8DDD0] rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full transition-all duration-700 ${
          value >= 75
            ? "bg-[#3B6B4A]"
            : value >= 40
            ? "bg-[#4A7FA5]"
            : "bg-[#D4A853]"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "User";
  const firstName = displayName.split(" ")[0];
  const organization = user.user_metadata?.organization as string | undefined;

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#1F1814] fixed h-full z-10">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#2E201A]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center shadow-md">
              <MapPin size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ATLAS
              </span>
              <p className="text-[9px] text-[#7A6355] font-medium tracking-widest uppercase -mt-0.5">
                Osman Consulting
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/dashboard";
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-[#C46B43]/15 text-[#C46B43] border border-[#C46B43]/20"
                    : "text-[#7A6355] hover:text-[#E8DDD0] hover:bg-[#2E201A]"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2 : 1.75}
                  className={
                    isActive
                      ? "text-[#C46B43]"
                      : "text-[#4A3728] group-hover:text-[#9A8878]"
                  }
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-[#2E201A]">
          <div className="px-3 py-2 mb-1 rounded-xl">
            <p className="text-sm font-medium text-[#E8DDD0] truncate">
              {displayName}
            </p>
            <p className="text-xs text-[#4A3728] truncate">{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60 p-6 md:p-8">
        {/* Greeting card */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-[#2A211C] to-[#1F1814] px-7 py-6 flex items-start justify-between gap-6">
          <div>
            <p className="text-[#9A8878] text-sm mb-1">{greeting},</p>
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {firstName}
            </h1>
            {organization && (
              <p className="text-[#7A6355] text-sm">{organization}</p>
            )}
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-xs text-[#4A3728] font-mono">
              {now.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#3B6B4A] animate-pulse" />
              <span className="text-xs text-[#4A3728]">Platform Active</span>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const colors = kpiColors[kpi.color];
            return (
              <div
                key={kpi.label}
                className="rounded-2xl bg-white border border-[#E8DDD0] px-5 py-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colors.bg}`}
                  >
                    <Icon size={16} className={colors.icon} strokeWidth={1.8} />
                  </div>
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                      kpi.positive
                        ? "text-[#3B6B4A] bg-[#3B6B4A]/10"
                        : "text-[#C46B43] bg-[#C46B43]/10"
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
                <div
                  className="text-2xl font-bold text-[#2A1F18] mb-0.5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {kpi.value}
                </div>
                <div className="text-xs text-[#9A8878]">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Project progress table */}
          <div className="lg:col-span-2 rounded-2xl bg-white border border-[#E8DDD0] shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#F2EBD9] flex items-center justify-between">
              <h2
                className="text-base font-semibold text-[#2A1F18]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Active Projects
              </h2>
              <span className="text-xs text-[#9A8878] bg-[#F2EBD9] px-2 py-1 rounded-lg">
                {projects.length} total
              </span>
            </div>
            <div className="divide-y divide-[#F2EBD9]">
              {projects.map((project) => (
                <div key={project.name} className="px-6 py-4 group hover:bg-[#FAF6EE] transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2A1F18] truncate group-hover:text-[#C46B43] transition-colors">
                        {project.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-[#9A8878]">
                          {project.lead}
                        </span>
                        <span className="text-[#E8DDD0]">·</span>
                        <span className="flex items-center gap-1 text-xs text-[#9A8878]">
                          <Clock size={10} />
                          {project.due}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
                        statusColors[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar value={project.progress} color="" />
                    <span className="text-xs text-[#9A8878] w-8 text-right flex-shrink-0">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's focus */}
          <div className="rounded-2xl bg-white border border-[#E8DDD0] shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#F2EBD9]">
              <h2
                className="text-base font-semibold text-[#2A1F18]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Today&apos;s Focus
              </h2>
              <p className="text-xs text-[#9A8878] mt-0.5">
                {focusItems.filter((f) => f.done).length} of {focusItems.length}{" "}
                completed
              </p>
            </div>
            <div className="px-6 py-4 space-y-3">
              {focusItems.map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      item.done
                        ? "bg-[#3B6B4A] border-[#3B6B4A]"
                        : "border-[#D4C8B8] group-hover:border-[#C46B43]"
                    }`}
                  >
                    {item.done && (
                      <CheckCircle2 size={10} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span
                    className={`text-sm leading-snug transition-colors ${
                      item.done
                        ? "line-through text-[#9A8878]"
                        : "text-[#4A3728] group-hover:text-[#2A1F18]"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Module quick links */}
            <div className="px-6 py-5 border-t border-[#F2EBD9]">
              <p className="text-xs font-semibold text-[#9A8878] uppercase tracking-widest mb-3">
                Quick Access
              </p>
              <div className="space-y-1.5">
                {navItems.slice(1, 5).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#FAF6EE] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={13}
                          className="text-[#9A8878] group-hover:text-[#C46B43] transition-colors"
                          strokeWidth={1.75}
                        />
                        <span className="text-sm text-[#7A6355] group-hover:text-[#2A1F18] transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight
                        size={12}
                        className="text-[#D4C8B8] group-hover:text-[#C46B43] transition-colors"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="rounded-2xl bg-white border border-[#E8DDD0] shadow-sm px-6 py-5">
          <h3
            className="text-sm font-semibold text-[#2A1F18] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-xs text-[#9A8878] uppercase tracking-widest font-semibold">
                Email
              </span>
              <p className="text-[#4A3728] mt-1">{user.email}</p>
            </div>
            {organization && (
              <div>
                <span className="text-xs text-[#9A8878] uppercase tracking-widest font-semibold">
                  Organization
                </span>
                <p className="text-[#4A3728] mt-1">{organization}</p>
              </div>
            )}
            <div>
              <span className="text-xs text-[#9A8878] uppercase tracking-widest font-semibold">
                Member since
              </span>
              <p className="text-[#4A3728] mt-1">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
