"use client";

import { useEffect, useRef, useState } from "react";
import { Check, BarChart3, Ticket, Users } from "lucide-react";

const modules = [
  {
    icon: BarChart3,
    title: "ATLAS Dashboards",
    subtitle: "Live donor visibility, zero manual effort",
    description:
      "ATLAS Dashboards bridges your field data and donor expectations by providing real-time, branded reporting surfaces that update automatically. No more end-of-month scrambles.",
    features: [
      "Live Google Sheets bidirectional sync",
      "Custom donor-branded dashboard views",
      "Multi-project aggregation and filtering",
      "Automated scheduled report delivery",
      "Role-based access for external stakeholders",
      "PDF export with ATLAS branding and watermarks",
      "Offline-compatible data collection sync",
    ],
    accent: "#f97316",
    badge: "Reporting",
  },
  {
    icon: Ticket,
    title: "Voucher Management",
    subtitle: "70,000 vouchers per batch. 18 languages.",
    description:
      "Industrial-scale voucher distribution with QR verification, multi-language support, and complete audit trails. Designed for cash and voucher assistance at humanitarian scale.",
    features: [
      "Batch generation up to 70,000 vouchers",
      "QR code encoding with anti-duplication logic",
      "18-language beneficiary-facing content",
      "Real-time redemption tracking dashboard",
      "Vendor reconciliation and reporting",
      "Offline redemption with sync-on-connect",
      "Beneficiary consent and signature capture",
    ],
    accent: "#f97316",
    badge: "Distribution",
  },
  {
    icon: Users,
    title: "Beneficiary Tools",
    subtitle: "AI-powered accuracy at the registration desk",
    description:
      "Minimize duplicate registrations and accelerate data entry with AI OCR and fuzzy-match deduplication. Built for environments with partial data and phonetic name variations.",
    features: [
      "AI OCR for identity document scanning",
      "82% accuracy fuzzy-match deduplication",
      "Phonetic name matching across transliterations",
      "Bulk registry import and normalization",
      "Vulnerability scoring and prioritization",
      "Biometric-ready integration framework",
      "GDPR-aligned data retention controls",
    ],
    accent: "#f97316",
    badge: "Data Quality",
  },
];

function ModuleCard({
  module,
  index,
  reversed,
}: {
  module: (typeof modules)[0];
  index: number;
  reversed: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = module.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-start gap-12 lg:gap-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Visual panel */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-2xl border border-[#1e3a5f]/60 bg-gradient-to-br from-[#0a1628] to-[#050d1a] p-8 overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${module.accent}15 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />

          {/* Module number */}
          <div className="text-8xl font-bold text-[#f97316]/5 absolute bottom-4 right-6 select-none pointer-events-none" style={{ fontFamily: "var(--font-sora)" }}>
            0{index + 1}
          </div>

          {/* Icon */}
          <div className="relative w-14 h-14 rounded-2xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mb-6">
            <Icon size={26} className="text-[#f97316]" strokeWidth={1.6} />
          </div>

          {/* Badge */}
          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20 mb-4">
            {module.badge}
          </span>

          {/* Title */}
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-2 relative"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {module.title}
          </h3>
          <p className="text-[#f97316] font-medium text-sm mb-4">
            {module.subtitle}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed relative">
            {module.description}
          </p>
        </div>
      </div>

      {/* Feature list panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">
            What&apos;s included
          </p>
          <div className="h-px w-12 bg-[#f97316]/40" />
        </div>

        <ul className="space-y-3.5">
          {module.features.map((feat, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${200 + i * 60}ms` }}
            >
              <div className="mt-0.5 w-5 h-5 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-[#f97316]" strokeWidth={3} />
              </div>
              <span className="text-slate-300 text-sm leading-relaxed">
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Modules() {
  return (
    <section id="modules" className="py-24 md:py-32 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-xs font-semibold tracking-widest uppercase mb-5">
            Core Modules
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Deep-dive into what{" "}
            <span className="text-[#f97316]">ATLAS delivers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Our three flagship modules power the most demanding aspects of NGO
            operations — with precision built for field realities.
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-24">
          {modules.map((module, i) => (
            <ModuleCard
              key={module.title}
              module={module}
              index={i}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
