"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, AlertCircle, Eye, EyeOff, MapPin } from "lucide-react";

const inputClass =
  "w-full bg-white border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#2A1F18] placeholder:text-[#9A8878] focus:outline-none focus:border-[#C46B43]/60 focus:ring-2 focus:ring-[#C46B43]/20 transition-all duration-200";

const labelClass =
  "block text-xs font-semibold text-[#7A6355] uppercase tracking-widest mb-2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — dark cocoa */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#2A211C] flex-col justify-between p-12 relative overflow-hidden">
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo */}
        <div>
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center shadow-lg">
                <MapPin size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span
                  className="text-2xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ATLAS
                </span>
                <p className="text-[10px] text-[#9A8878] font-medium tracking-widest uppercase -mt-0.5">
                  by Osman Consulting
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Center content */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C46B43]/15 border border-[#C46B43]/25 text-[#D4845E] text-xs font-semibold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C46B43] animate-pulse" />
              Field Operations Platform
            </div>
            <h2
              className="text-4xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Connecting aid
              <br />
              to those who
              <br />
              <span className="text-[#C46B43]">need it most.</span>
            </h2>
            <p className="text-[#9A8878] text-base leading-relaxed max-w-sm">
              ATLAS brings together MEAL teams, donor reporting, and field
              operations in one trusted platform built for humanitarian work.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "70K+", label: "Vouchers managed" },
              { value: "18", label: "Languages" },
              { value: "10+", label: "Active modules" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-[#1F1814]/60 border border-[#3E2E24]/60 px-3 py-3"
              >
                <div
                  className="text-2xl font-bold text-[#C46B43] mb-0.5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[#7A6355]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="border-t border-[#3E2E24] pt-6">
          <p className="text-[#7A6355] text-sm italic leading-relaxed">
            &ldquo;Built for the field. Trusted by donors.&rdquo;
          </p>
        </div>
      </div>

      {/* Right panel — cream */}
      <div className="flex-1 bg-[#FAF6EE] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center">
                <MapPin size={15} className="text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-2xl font-bold text-[#2A1F18]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ATLAS
              </span>
            </Link>
            <p className="text-[#9A8878] text-xs font-medium tracking-widest uppercase mt-1">
              by Osman Consulting
            </p>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-[#2A1F18] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Welcome back
            </h1>
            <p className="text-[#7A6355] text-sm">
              Sign in to your ATLAS account to continue
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@organization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass.replace("mb-2", "")}>
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A8878] hover:text-[#4A3728] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C46B43] hover:bg-[#A8502A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#C46B43]/20 hover:shadow-[#C46B43]/35 hover:-translate-y-0.5 active:translate-y-0 mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-[#9A8878] text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#C46B43] hover:text-[#A8502A] font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
