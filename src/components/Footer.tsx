"use client";

import { Mail, Globe, ArrowUpRight } from "lucide-react";

const links = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "Modules", href: "#modules" },
    { label: "Stats", href: "#stats" },
    { label: "Request Demo", href: "#contact" },
  ],
  Modules: [
    { label: "ATLAS Dashboards", href: "#modules" },
    { label: "Voucher Management", href: "#modules" },
    { label: "Beneficiary Tools", href: "#modules" },
    { label: "MEAL Reports", href: "#features" },
  ],
  Solutions: [
    { label: "Cash & Voucher Assistance", href: "#features" },
    { label: "Donor Reporting", href: "#features" },
    { label: "Field Activity Tracking", href: "#features" },
    { label: "Contract Automation", href: "#features" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#030a15] border-t border-[#1e3a5f]/40">
      {/* Contact CTA */}
      <div className="border-b border-[#1e3a5f]/40">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Ready to transform your{" "}
              <span className="text-[#f97316]">operations?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Join MEAL teams that have modernized their field-to-donor
              reporting pipeline with ATLAS.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="mailto:info@osmanconsulting.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f97316] hover:bg-[#ea6c08] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5"
            >
              <Mail size={16} />
              Get in Touch
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1e3a5f] hover:border-[#f97316]/40 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              Explore Platform
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                <span className="text-white">ATL</span>
                <span className="text-[#f97316]">AS</span>
              </span>
              <p className="text-xs text-slate-500 font-medium tracking-widest uppercase mt-0.5">
                by Osman Consulting
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Built for MEAL teams. Trusted for donor reporting.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <a
                href="mailto:info@osmanconsulting.com"
                className="inline-flex items-center gap-2 hover:text-[#f97316] transition-colors"
              >
                <Mail size={13} />
                info@osmanconsulting.com
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 hover:text-[#f97316] transition-colors"
              >
                <Globe size={13} />
                osmanconsulting.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.querySelector(item.href);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-slate-500 hover:text-[#f97316] text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e3a5f]/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
          <p>© {currentYear} Osman Consulting. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]/60" />
            Built for MEAL teams. Trusted for donor reporting.
          </p>
        </div>
      </div>
    </footer>
  );
}
