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
  "w-full bg-[#0a1628] border border-[#1e3a5f] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#f97316]/60 focus:ring-1 focus:ring-[#f97316]/30 transition-all duration-200";

const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2";

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
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050d1a 0%, #070f1e 60%, #050d1a 100%)",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent mb-24 -mt-24" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-xs font-semibold tracking-widest uppercase mb-5">
            Request a Demo
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            See ATLAS in <span className="text-[#f97316]">action</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your organization and we'll set up a personalized demo
            tailored to your MEAL workflow.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#1e3a5f]/60 bg-[#0a1628]/60 backdrop-blur-sm p-8 md:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle size={30} className="text-emerald-400" />
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Request received!
              </h3>
              <p className="text-slate-400 max-w-sm">
                Thank you for reaching out. Our team will contact you within 24
                hours to schedule your personalized ATLAS demo.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#1e3a5f] hover:border-[#f97316]/40 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Full Name */}
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

                {/* Organization */}
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

                {/* Email */}
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

                {/* Country */}
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

              {/* Message */}
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

              {/* Error */}
              {status === "error" && (
                <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {errorMsg || "Something went wrong. Please try again."}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#f97316] hover:bg-[#ea6c08] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0"
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
