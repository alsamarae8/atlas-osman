"use client";

import { Mail, Globe, ArrowUpRight, MapPin } from "lucide-react";

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
    <footer className="bg-[#1F1814] border-t border-[#2E201A]">
      {/* Contact CTA */}
      <div className="border-b border-[#2E201A]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to transform your{" "}
              <span className="text-[#C46B43]">operations?</span>
            </h2>
            <p className="text-[#7A6355] text-lg max-w-xl">
              Join MEAL teams that have modernized their field-to-donor
              reporting pipeline with ATLAS.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C46B43] hover:bg-[#A8502A] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#C46B43]/20 hover:shadow-[#C46B43]/35 hover:-translate-y-0.5"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3E2E24] hover:border-[#C46B43]/40 text-[#9A8878] hover:text-white font-semibold text-sm transition-all duration-200"
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
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center">
                <MapPin size={13} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span
                  className="text-xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ATLAS
                </span>
                <p className="text-[9px] text-[#4A3728] font-medium tracking-widest uppercase -mt-0.5">
                  by Osman Consulting
                </p>
              </div>
            </div>
            <p className="text-[#7A6355] text-sm leading-relaxed mb-5">
              Built for MEAL teams. Trusted for donor reporting.
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#4A3728]">
              <a
                href="mailto:info@osmanconsulting.com"
                className="inline-flex items-center gap-2 hover:text-[#C46B43] transition-colors"
              >
                <Mail size={13} />
                info@osmanconsulting.com
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 hover:text-[#C46B43] transition-colors"
              >
                <Globe size={13} />
                osmanconsulting.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[#E8DDD0] font-semibold text-sm mb-4 tracking-wide">
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
                      className="text-[#4A3728] hover:text-[#C46B43] text-sm transition-colors duration-200"
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
        <div className="border-t border-[#2E201A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#4A3728]">
          <p>© {currentYear} Osman Consulting. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C46B43]/60" />
            Built for MEAL teams. Trusted for donor reporting.
          </p>
        </div>
      </div>
    </footer>
  );
}
