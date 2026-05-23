"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  MapPin,
} from "lucide-react";

const inputClass =
  "w-full bg-white border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#2A1F18] placeholder:text-[#9A8878] focus:outline-none focus:border-[#C46B43]/60 focus:ring-2 focus:ring-[#C46B43]/20 transition-all duration-200";

const labelClass =
  "block text-xs font-semibold text-[#7A6355] uppercase tracking-widest mb-2";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          organization: organization.trim(),
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => router.push("/dashboard"), 3000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#3B6B4A]/10 border border-[#3B6B4A]/25 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={30} className="text-[#3B6B4A]" />
          </div>
          <h2
            className="text-2xl font-bold text-[#2A1F18] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Account created!
          </h2>
          <p className="text-[#7A6355] text-sm">
            Check your email to confirm your account, or you&apos;ll be
            redirected to the dashboard shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — dark cocoa */}
      <div className="hidden lg:flex lg:w-[44%] bg-[#2A211C] flex-col justify-between p-12 relative overflow-hidden">
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
        <div className="space-y-6">
          <div>
            <h2
              className="text-3xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Join MEAL teams
              <br />
              <span className="text-[#C46B43]">making an impact.</span>
            </h2>
            <p className="text-[#9A8878] text-sm leading-relaxed max-w-xs">
              Get access to the full ATLAS platform — vouchers, dashboards,
              beneficiary tools, and more — in minutes.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Free to get started",
              "No credit card required",
              "Personalized onboarding",
              "Dedicated support team",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C46B43]/15 border border-[#C46B43]/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={11} className="text-[#C46B43]" strokeWidth={2.5} />
                </div>
                <span className="text-sm text-[#9A8878]">{item}</span>
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
        <div className="w-full max-w-lg">
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
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-[#2A1F18] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Create your account
            </h1>
            <p className="text-[#7A6355] text-sm">
              Get access to the full ATLAS operations platform
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="NGO / Agency"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Work Email</label>
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
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
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
                    Creating account…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-[#9A8878] text-sm mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#C46B43] hover:text-[#A8502A] font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
