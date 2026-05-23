"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormState = {
  full_name: string;
  organization: string;
  email: string;
  country: string;
  message: string;
};

const EMPTY: FormState = {
  full_name: "",
  organization: "",
  email: "",
  country: "",
  message: "",
};

const inputClass =
  "w-full bg-white border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#2A1F18] placeholder:text-[#9A8878] focus:outline-none focus:border-[#C46B43]/60 focus:ring-2 focus:ring-[#C46B43]/20 transition-all duration-200";

const labelClass =
  "block text-xs font-semibold text-[#7A6355] uppercase tracking-widest mb-2";

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("demo_requests").insert([
      {
        full_name: form.full_name.trim(),
        organization: form.organization.trim(),
        email: form.email.trim().toLowerCase(),
        country: form.country.trim(),
        message: form.message.trim(),
      },
    ]);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
      setForm(EMPTY);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden bg-[#FAF6EE]"
    >
      {/* Subtle warm gradient at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #E8DDD0, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C46B43]/10 border border-[#C46B43]/20 text-[#C46B43] text-xs font-semibold tracking-widest uppercase mb-5">
            Request a Demo
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2A1F18] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            See ATLAS in <span className="text-[#C46B43]">action</span>
          </h2>
          <p className="text-[#7A6355] text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your organization and we&apos;ll set up a personalized demo
            tailored to your MEAL workflow.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E8DDD0] bg-white shadow-sm p-8 md:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#3B6B4A]/10 border border-[#3B6B4A]/25 flex items-center justify-center">
                <CheckCircle size={30} className="text-[#3B6B4A]" />
              </div>
              <h3
                className="text-2xl font-bold text-[#2A1F18]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Request received!
              </h3>
              <p className="text-[#7A6355] max-w-sm">
                Thank you for reaching out. Our team will contact you within 24
                hours to schedule your personalized ATLAS demo.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#E8DDD0] hover:border-[#C46B43]/40 text-[#7A6355] hover:text-[#2A1F18] text-sm font-medium transition-all duration-200"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={form.full_name}
                    onChange={set("full_name")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="NGO / Agency name"
                    value={form.organization}
                    onChange={set("organization")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@organization.org"
                    value={form.email}
                    onChange={set("email")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Country of Operation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Syria, Sudan, Ukraine"
                    value={form.country}
                    onChange={set("country")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={labelClass}>Tell us about your needs</label>
                <textarea
                  rows={4}
                  placeholder="Describe your current MEAL challenges, team size, or any specific modules you're interested in..."
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {errorMsg || "Something went wrong. Please try again."}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C46B43] hover:bg-[#A8502A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#C46B43]/20 hover:shadow-[#C46B43]/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Request Demo
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
