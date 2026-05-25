"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Menu,
  X,
  MapPin,
  LayoutDashboard,
  ClipboardList,
  Ticket,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  LogOut,
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

interface Props {
  displayName: string;
  userEmail: string | undefined;
}

export default function MobileNav({ displayName, userEmail }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#1F1814] border-b border-[#2E201A] flex items-center justify-between px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center">
            <MapPin size={12} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-base font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ATLAS
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-[#7A6355] hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1F1814] flex flex-col transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2E201A]">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center">
              <MapPin size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ATLAS
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-[#7A6355] hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
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
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#C46B43]/15 text-[#C46B43] border border-[#C46B43]/20"
                    : "text-[#7A6355] hover:text-[#E8DDD0] hover:bg-[#2E201A]"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2 : 1.75}
                  className={isActive ? "text-[#C46B43]" : "text-[#4A3728]"}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-[#2E201A]">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm font-medium text-[#E8DDD0] truncate">{displayName}</p>
            <p className="text-xs text-[#4A3728] truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-[#4A3728] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
