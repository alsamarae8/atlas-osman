"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "Modules", description: "Integrated operations tools" },
  { value: "70K", label: "Vouchers/Batch", description: "High-volume distribution" },
  { value: "18", label: "Languages", description: "Multilingual support" },
  { value: "82%", label: "Fuzzy Match", description: "AI duplicate accuracy" },
  { value: "13", label: "AI Report Sections", description: "Auto-generated reporting" },
];

function StatCard({
  value,
  label,
  description,
  delay,
}: {
  value: string;
  label: string;
  description: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center px-6 py-6 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className="text-4xl md:text-5xl font-bold text-[#f97316] mb-1 tabular-nums"
        style={{ fontFamily: "var(--font-sora)" }}
      >
        {value}
      </div>
      <div className="text-white font-semibold text-sm md:text-base mb-0.5">
        {label}
      </div>
      <div className="text-slate-500 text-xs md:text-sm">{description}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative py-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050d1a 0%, #0a1628 50%, #050d1a 100%)",
      }}
    >
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-[#1e3a5f]/50">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 100} />
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />
    </section>
  );
}
