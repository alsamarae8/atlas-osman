"use client";

import { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E8DDD0] shadow-sm shadow-[#2A1F18]/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C46B43] to-[#A8502A] flex items-center justify-center shadow-sm">
            <MapPin size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[#2A1F18]" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ATLAS
            </span>
            <p
              className={`text-[9px] font-medium tracking-widest uppercase -mt-0.5 transition-colors duration-300 ${
                scrolled ? "text-[#9A8878]" : "text-white/50"
              }`}
            >
              by Osman Consulting
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer hover:text-[#C46B43] ${
                  scrolled ? "text-[#7A6355]" : "text-white/70"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNav("#contact")}
            className="px-5 py-2 rounded-full text-sm font-semibold bg-[#C46B43] hover:bg-[#A8502A] text-white transition-all duration-200 shadow-md shadow-[#C46B43]/25 hover:shadow-[#C46B43]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Request Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors p-1 ${
            scrolled
              ? "text-[#7A6355] hover:text-[#C46B43]"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#FAF6EE]/98 backdrop-blur-md border-b border-[#E8DDD0]`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-base font-medium text-[#4A3728] hover:text-[#C46B43] transition-colors w-full text-left py-1"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => handleNav("#contact")}
              className="w-full px-5 py-2.5 rounded-full text-sm font-semibold bg-[#C46B43] hover:bg-[#A8502A] text-white transition-colors"
            >
              Request Demo
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
