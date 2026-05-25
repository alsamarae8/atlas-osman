import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import SignOutButton from "./SignOutButton";
import MobileNav from "./MobileNav";
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
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const navItems = [
  { label: "Overview",          href: "/dashboard",                  icon: LayoutDashboard },
  { label: "Work Tracker",      href: "/dashboard/work-tracker",     icon: ClipboardList },
  { label: "Vouchers",          href: "/dashboard/vouchers",         icon: Ticket },
  { label: "Reports",           href: "/dashboard/reports",          icon: BookOpen },
  { label: "Contracts",         href: "/dashboard/contracts",        icon: FileText },
  { label: "Beneficiary Tools", href: "/dashboard/beneficiaries",    icon: Users },
  { label: "Analytics",         href: "/dashboard/analytics",        icon: BarChart3 },
];

const kpis = [
  { label: "Active Vouchers", value: "70,240", change: "+12%", positive: true,  icon: Ticket,   colorKey: "terracotta" },
  { label: "Beneficiaries",   value: "14,832", change: "+8%",  positive: true,  icon: Users,    colorKey: "forest"     },
  { label: "Open Reports",    value: "23",     change: "-5",   positive: true,  icon: BookOpen, colorKey: "sky"        },
  { label: "Pending Tasks",   value: "7",      change: "+3",   positive: false, icon: Activity, colorKey: "ochre"      },
];

const kpiColors: Record<string, { ring: string; icon: string }> = {
  terracotta: { ring: "bg-[#C46B43]/10 border-[#C46B43]/20", icon: "text-[#C46B43]" },
  forest:     { ring: "bg-[#3B6B4A]/10 border-[#3B6B4A]/20", icon: "text-[#3B6B4A]" },
  sky:        { ring: "bg-[#4A7FA5]/10 border-[#4A7FA5]/20", icon: "text-[#4A7FA5]" },
  ochre:      { ring: "bg-[#D4A853]/10 border-[#D4A853]/20", icon: "text-[#D4A853]" },
};

const projects = [
  { name: "Q2 Donor Report — USAID",          status: "In Progress", progress: 72, due: "Jun 15, 2026", lead: "Finance Team"  },
  { name: "Voucher Distribution — Cycle 4",    status: "On Track",    progress: 55, due: "Jun 30, 2026", lead: "Field Ops"     },
  { name: "Beneficiary Verification — North",  status: "Review",      progress: 90, due: "May 28, 2026", lead: "MEAL Team"     },
  { name: "Staff Contract Renewals",            status: "Pending",     progress: 20, due: "Jul 1, 2026",  lead: "HR"           },
  { name: "Partner Capacity Assessment",        status: "In Progress", progress: 40, due: "Jul 15, 2026", lead: "Partnerships" },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-[#4A7FA5]/10 text-[#4A7FA5] border-[#4A7FA5]/25",
  "On Track":    "bg-[#3B6B4A]/10 text-[#3B6B4A] border-[#3B6B4A]/25",
  Review:        "bg-[#D4A853]/10 text-[#D4A853] border-[#D4A853]/25",
  Pending:       "bg-[#9A8878]/10 text-[#9A8878] border-[#9A8878]/25",
};

const focusItems = [
  { text: "Review Q2 USAID report draft",      done: true  },
  { text: "Approve 3 pending voucher batches", done: false },
  { text: "Confirm beneficiary deduplication", done: false },
  { text: "Submit M&E indicator update",       done: false },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */

function ProgressBar({ value }: { value: number }) {
  const color =
    value >= 75 ? "bg-[#3B6B4A]" : value >= 40 ? "bg-[#4A7FA5]" : "bg-[#D4A853]";
  return (
    <div className="w-full bg-[#E8DDD0] rounded-full h-1.5 overflow-hidden">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "User";
  const firstName  = displayName.split(" ")[0];
  const org        = user.user_metadata?.organization as string | undefined;
  const now        = new Date();
  const hour       = now.getHours();
  const greeting   = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    /*
     * Shell: `flex min-h-screen` on root.
     * Sidebar is a normal flex child (w-64 flex-shrink-0) — NOT fixed.
     * This avoids the ml-64 / fixed synchronisation bug that caused overflow.
     * On desktop the sidebar sticks via `sticky top-0 h-screen`.
     * On mobile the sidebar is hidden; MobileNav renders a fixed top-bar + drawer.
     */
    <div className="flex min-h-screen bg-[#FAF6EE]">

      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-[#1F1814] sticky top-0 h-screen overflow-hidden">

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-5 border-b border-[#2E201A]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center shadow-md flex-shrink-0">
              <MapPin size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-white tracking-tight leading-none"
                 style={{ fontFamily: "var(--font-playfair)" }}>
                ATLAS
              </p>
              <p className="text-[9px] text-[#7A6355] font-medium tracking-widest uppercase mt-0.5">
                Osman Consulting
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = href === "/dashboard";
            return (
              <Link key={label} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group ${
                  active
                    ? "bg-[#C46B43]/15 text-[#C46B43] border border-[#C46B43]/20"
                    : "text-[#7A6355] hover:text-[#E8DDD0] hover:bg-[#2E201A]"
                }`}>
                <Icon size={15} strokeWidth={active ? 2 : 1.75}
                  className={active ? "text-[#C46B43]" : "text-[#4A3728] group-hover:text-[#9A8878]"} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-[#2E201A]">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm font-medium text-[#E8DDD0] truncate">{displayName}</p>
            <p className="text-xs text-[#4A3728] truncate">{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* ── Right column: mobile top-bar + scrollable content ───────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Mobile nav (renders fixed top-bar + drawer, hidden on md+) */}
        <MobileNav displayName={displayName} userEmail={user.email} />

        {/* Page content — pt-14 clears mobile top-bar, removed on md+ */}
        <main className="flex-1 overflow-x-hidden pt-14 md:pt-0">
          <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* Greeting banner */}
            <div className="rounded-2xl bg-gradient-to-br from-[#2A211C] to-[#1F1814] px-6 py-6
                            flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[#9A8878] text-sm mb-0.5">{greeting},</p>
                <h1 className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                  {firstName}
                </h1>
                {org && <p className="text-[#7A6355] text-sm mt-0.5 truncate">{org}</p>}
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-[#4A3728] font-mono whitespace-nowrap">
                  {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#3B6B4A] animate-pulse" />
                  <span className="text-xs text-[#4A3728]">Platform Active</span>
                </div>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {kpis.map(({ label, value, change, positive, icon: Icon, colorKey }) => {
                const c = kpiColors[colorKey];
                return (
                  <div key={label} className="rounded-2xl bg-white border border-[#E8DDD0] p-5 shadow-sm flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${c.ring}`}>
                        <Icon size={18} className={c.icon} strokeWidth={1.8} />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        positive ? "text-[#3B6B4A] bg-[#3B6B4A]/10" : "text-[#C46B43] bg-[#C46B43]/10"
                      }`}>
                        {change}
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2A1F18]"
                         style={{ fontFamily: "var(--font-playfair)" }}>
                        {value}
                      </p>
                      <p className="text-xs text-[#9A8878] mt-0.5">{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Projects table + Focus sidebar */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* Active Projects — 2 cols on xl */}
              <div className="xl:col-span-2 rounded-2xl bg-white border border-[#E8DDD0] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F2EBD9] flex items-center justify-between">
                  <h2 className="text-base font-semibold text-[#2A1F18]"
                      style={{ fontFamily: "var(--font-playfair)" }}>
                    Active Projects
                  </h2>
                  <span className="text-xs text-[#9A8878] bg-[#F2EBD9] px-2 py-1 rounded-lg">
                    {projects.length} total
                  </span>
                </div>

                <div className="divide-y divide-[#F2EBD9]">
                  {projects.map((p) => (
                    <div key={p.name} className="px-6 py-4 hover:bg-[#FAF6EE] transition-colors group">
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#2A1F18] truncate
                                        group-hover:text-[#C46B43] transition-colors">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#9A8878]">{p.lead}</span>
                            <span className="text-[#E8DDD0]">·</span>
                            <span className="flex items-center gap-1 text-xs text-[#9A8878]">
                              <Clock size={10} />
                              {p.due}
                            </span>
                          </div>
                        </div>
                        <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5
                                          rounded-full border whitespace-nowrap ${statusColors[p.status]}`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <ProgressBar value={p.progress} />
                        </div>
                        <span className="flex-shrink-0 text-xs text-[#9A8878] w-7 text-right">
                          {p.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Focus — 1 col */}
              <div className="rounded-2xl bg-white border border-[#E8DDD0] shadow-sm overflow-hidden flex flex-col">
                <div className="flex-shrink-0 px-6 py-4 border-b border-[#F2EBD9]">
                  <h2 className="text-base font-semibold text-[#2A1F18]"
                      style={{ fontFamily: "var(--font-playfair)" }}>
                    Today&apos;s Focus
                  </h2>
                  <p className="text-xs text-[#9A8878] mt-0.5">
                    {focusItems.filter((f) => f.done).length} of {focusItems.length} completed
                  </p>
                </div>

                <div className="px-6 py-4 space-y-3">
                  {focusItems.map((item) => (
                    <div key={item.text} className="flex items-start gap-3 group cursor-default">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0
                                       flex items-center justify-center transition-colors ${
                        item.done
                          ? "bg-[#3B6B4A] border-[#3B6B4A]"
                          : "border-[#D4C8B8] group-hover:border-[#C46B43]"
                      }`}>
                        {item.done && (
                          <CheckCircle2 size={10} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span className={`text-sm leading-snug transition-colors ${
                        item.done
                          ? "line-through text-[#9A8878]"
                          : "text-[#4A3728] group-hover:text-[#2A1F18]"
                      }`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-[#F2EBD9] mt-auto">
                  <p className="text-xs font-semibold text-[#9A8878] uppercase tracking-widest mb-3">
                    Quick Access
                  </p>
                  <div className="space-y-1">
                    {navItems.slice(1, 5).map(({ label, href, icon: Icon }) => (
                      <Link key={label} href={href}
                        className="flex items-center justify-between py-2 px-3 rounded-xl
                                   hover:bg-[#FAF6EE] transition-colors group">
                        <div className="flex items-center gap-2.5">
                          <Icon size={13} strokeWidth={1.75}
                            className="text-[#9A8878] group-hover:text-[#C46B43] transition-colors" />
                          <span className="text-sm text-[#7A6355] group-hover:text-[#2A1F18] transition-colors">
                            {label}
                          </span>
                        </div>
                        <ChevronRight size={12}
                          className="text-[#D4C8B8] group-hover:text-[#C46B43] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Account details */}
            <div className="rounded-2xl bg-white border border-[#E8DDD0] shadow-sm px-6 py-5">
              <h3 className="text-sm font-semibold text-[#2A1F18] mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-[#9A8878] uppercase tracking-widest font-semibold">Email</p>
                  <p className="text-[#4A3728] mt-1 break-all">{user.email}</p>
                </div>
                {org && (
                  <div>
                    <p className="text-xs text-[#9A8878] uppercase tracking-widest font-semibold">Organization</p>
                    <p className="text-[#4A3728] mt-1">{org}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-[#9A8878] uppercase tracking-widest font-semibold">Member since</p>
                  <p className="text-[#4A3728] mt-1">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
