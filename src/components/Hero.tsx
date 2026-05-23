"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let animId: number;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / 60) + 1;
      const rows = Math.ceil(canvas.height / 60) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 60;
          const y = r * 60;
          const dist = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) +
              Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(dist / 80 - frame / 60) * 0.5 + 0.5;
          const alpha = wave * 0.15 + 0.03;
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < 6; i++) {
        const t = (frame / 200 + i * 0.16) % 1;
        const x = canvas.width * (0.1 + i * 0.16);
        const y = canvas.height * (0.2 + Math.sin(t * Math.PI * 2) * 0.3);
        const r = 1.5 + Math.sin(frame / 30 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${0.4 + Math.sin(frame / 40 + i) * 0.3})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050d1a]">
      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.08) 0%, rgba(5,13,26,0) 70%)",
        }}
      />

      {/* Top-left accent orb */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Bottom-right accent orb */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 text-[#f97316] text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
          NGO Operations Platform
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Built for the{" "}
          <span className="relative inline-block">
            <span className="text-[#f97316]">Field.</span>
          </span>
          <br />
          Trusted by{" "}
          <span className="relative">
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(249,115,22,0.6)",
              }}
            >
              Donors.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          <span className="text-slate-200 font-medium">
            ATLAS by Osman Consulting
          </span>{" "}
          — The complete NGO operations platform for MEAL teams. From voucher
          distribution to donor reporting, built for impact at scale.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#f97316] hover:bg-[#ea6c08] text-white font-semibold text-base transition-all duration-200 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0"
          >
            Explore Features
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-[#1e3a5f] hover:border-[#f97316]/50 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-sm"
          >
            <span className="w-7 h-7 rounded-full bg-[#f97316]/15 flex items-center justify-center group-hover:bg-[#f97316]/25 transition-colors">
              <Play size={12} fill="currentColor" className="text-[#f97316] ml-0.5" />
            </span>
            Request Demo
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#050d1a] bg-gradient-to-br from-[#1e3a5f] to-[#0a1628]"
                />
              ))}
            </div>
            <span>Trusted by MEAL teams</span>
          </div>
          <span className="hidden sm:block text-[#1e3a5f]">·</span>
          <span>10+ integrated modules</span>
          <span className="hidden sm:block text-[#1e3a5f]">·</span>
          <span>70,000 vouchers/batch</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#f97316]/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
