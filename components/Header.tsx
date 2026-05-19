"use client";

import { useState } from "react";
import { TEAMS } from "@/lib/data";

const MENTOR_COUNT = new Set(TEAMS.map((t) => t.mentor)).size;

export default function Header() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header>
      {/* ── White top nav ── */}
      <div className="bg-white border-b border-[#dbeaff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            {logoFailed ? (
              <span className="text-xl font-black text-[#1a00d9] flex-shrink-0">GANIT</span>
            ) : (
              <img
                src="https://www.ganitinc.com/images/ganit-blue-logo.svg"
                alt="GANIT"
                className="h-8 w-auto flex-shrink-0"
                onError={() => setLogoFailed(true)}
              />
            )}
            <div className="h-5 w-px bg-gray-200 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-500 tracking-wide truncate">GenAI Ideathon Leaderboard</span>
          </div>
          <span
            className="flex-shrink-0 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase"
            style={{ background: "#dbeaff", color: "#1a00d9" }}
          >
            Public View
          </span>
        </div>
      </div>

      {/* ── Gradient hero ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a00d9 0%, #2d1ae8 45%, #5e9eff 100%)" }}>

        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10" style={{ background: "#ffffff" }} />
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-10" style={{ background: "#5e9eff" }} />
        <div className="absolute top-6 right-1/3 w-20 h-20 rounded-full opacity-10" style={{ background: "#fe6e06" }} />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: "rgba(254,110,6,0.2)", color: "#fe6e06", border: "1px solid rgba(254,110,6,0.3)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#fe6e06] animate-pulse" />
                Live
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                2026 GenAI Ideathon
              </h1>
              <p className="text-white/60 mt-2 text-sm sm:text-base max-w-md">
                 One stage. Track every milestone — open to everyone.
              </p>
            </div>

            {/* Stats cards */}
            <div className="flex flex-wrap gap-3 shrink-0">
              <StatCard value={TEAMS.length} label="Teams" icon="🏆" />
              <StatCard value={MENTOR_COUNT} label="Mentors" icon="🎓" />
              <StatCard value={6} label="Milestones" icon="📍" />
              <StatCard value="12 Jun" label="Finals" icon="🚀" accent />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ value, label, icon, accent }: { value: string | number; label: string; icon: string; accent?: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl"
      style={
        accent
          ? { background: "#fe6e06", boxShadow: "0 8px 24px rgba(254,110,6,0.4)" }
          : { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }
      }
    >
      <span className="text-xl mb-0.5">{icon}</span>
      <span className="text-2xl font-black text-white leading-none">{value}</span>
      <span className="text-[10px] font-semibold mt-0.5" style={{ color: accent ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)" }}>{label}</span>
    </div>
  );
}
