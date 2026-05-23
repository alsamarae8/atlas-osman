"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  BarChart3,
  Ticket,
  FileText,
  Users,
  BookOpen,
  Receipt,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Work Tracker",
    description:
      "Daily field activity logging with structured data entry, team assignments, and real-time progress visibility for field coordinators.",
    tag: "Field Ops",
  },
  {
    icon: BarChart3,
    title: "ATLAS Dashboards",
    description:
      "Live donor dashboards with automated Google Sheets sync. Present real-time MEAL data to donors without manual report preparation.",
    tag: "Reporting",
  },
  {
    icon: Ticket,
    title: "Voucher Management",
    description:
      "QR-enabled voucher generation at 70,000 per batch. Supports 18 languages for multilingual beneficiary populations across complex operations.",
    tag: "Distribution",
  },
  {
    icon: FileText,
    title: "Contract Automation",
    description:
      "Bulk PDF contract generation directly from Excel data. Eliminate manual document preparation and reduce compliance risk at scale.",
    tag: "Legal & Admin",
  },
  {
    icon: Users,
    title: "Beneficiary Tools",
    description:
      "AI-powered OCR for rapid data capture combined with fuzzy-match duplicate detection at 82% accuracy across large beneficiary registries.",
    tag: "Data Quality",
  },
  {
    icon: BookOpen,
    title: "MEAL Reports",
    description:
      "Drag-and-drop report builder with 13 AI-generated sections. Produce donor-ready MEAL reports in a fraction of the traditional time.",
    tag: "M&E",
  },
  {
    icon: Receipt,
    title: "Invoice Generator",
    description:
      "Automated invoicing with full TPM and PDM cost breakdown. Reconcile third-party monitoring expenses with a single structured workflow.",
    tag: "Finance",
  },
  {
    icon: GitBranch,
    title: "Action Plans",
    description:
      "Create and share collaborative action tracker links with field teams and partners. Keep accountability visible without endless email chains.",
    tag: "Collaboration",
  },
];

const tagColors: Record<string, string> = {
  "Field Ops": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Reporting: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Distribution: "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20",
  "Legal & Admin": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Data Quality": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "M&E": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Finance: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Collaboration: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  tag,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), (index % 4) * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-[#1e3a5f]/60 bg-[#0a1628]/80 p-6 transition-all duration-500 hover:border-[#f97316]/30 hover:bg-[#0d1f36] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#f97316]/5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f97316]/0 to-[#f97316]/0 group-hover:from-[#f97316]/[0.03] group-hover:to-transparent transition-all duration-500" />

      <div className="relative">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mb-4 group-hover:bg-[#f97316]/15 transition-colors">
          <Icon size={20} className="text-[#f97316]" strokeWidth={1.8} />
        </div>

        {/* Tag */}
        <span
          className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border mb-3 ${
            tagColors[tag] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20"
          }`}
        >
          {tag}
        </span>

        {/* Title */}
        <h3
          className="text-lg font-semibold text-white mb-2"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-xs font-semibold tracking-widest uppercase mb-5">
            Platform Features
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Everything your team needs,{" "}
            <span className="text-[#f97316]">in one platform</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From daily field activities to donor reporting — ATLAS consolidates
            your entire MEAL workflow into a single, cohesive system.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
