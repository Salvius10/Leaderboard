"use client";

import { useState } from "react";
import { Team } from "@/lib/data";
import StatusTimeline from "./StatusTimeline";

type Props = { team: Team; rank: number };

const GRADIENTS = [
  ["#1a00d9","#5e9eff"],
  ["#5e9eff","#1a00d9"],
  ["#1a00d9","#fe6e06"],
  ["#3a2fe8","#5e9eff"],
  ["#fe6e06","#1a00d9"],
];

function twoLetters(name: string) {
  const withoutPrefix = name.replace(/^Team\s+/i, "");
  const parts = withoutPrefix.replace(/([A-Z])/g, " $1").trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return withoutPrefix.slice(0, 2).toUpperCase();
}

function memberTwoLetters(name: string) {
  const p = name.trim().split(/\s+/);
  return (p[0]?.[0] ?? "?").toUpperCase() + (p[1]?.[0] ?? "").toUpperCase();
}

function rankStyle(rank: number) {
  if (rank === 1) return { bg: "#fe6e06", text: "#fff", glow: true };
  if (rank === 2) return { bg: "#1a00d9", text: "#fff", glow: false };
  if (rank === 3) return { bg: "#5e9eff", text: "#fff", glow: false };
  return { bg: "#dbeaff", text: "#1a00d9", glow: false };
}

export default function TeamCard({ team, rank }: Props) {
  const [expanded, setExpanded] = useState(false);
  const g = GRADIENTS[rank % GRADIENTS.length];
  const rs = rankStyle(rank);
  const captain = team.members.find((m) => m.captain);

  return (
    <div
      onClick={() => setExpanded((v) => !v)}
      className="relative bg-white rounded-2xl mb-3 overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        border: expanded ? "1.5px solid #5e9eff" : "1.5px solid #e0e8ff",
        boxShadow: expanded
          ? "0 8px 40px rgba(26,0,217,0.16), 0 2px 8px rgba(26,0,217,0.08)"
          : "0 1px 4px rgba(26,0,217,0.05)",
        transform: expanded ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Gradient left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: `linear-gradient(180deg, ${g[0]}, ${g[1]})` }}
      />

      {/* ── Collapsed row ── */}
      <div className="pl-5 pr-5 py-4 grid grid-cols-[auto_1fr_auto] gap-5 items-center">

        {/* Left: rank + avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
            style={{
              background: rs.bg,
              color: rs.text,
              ...(rs.glow ? { animation: "pulseGlow 2s ease-in-out infinite" } : {}),
            }}
          >
            {rank}
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}
          >
            {twoLetters(team.team_name)}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-widest" style={{ color: "#5e9eff" }}>{team.gen_id}</p>
            <p className="text-sm font-bold text-gray-900 leading-snug">{team.team_name}</p>
            <p className="text-xs text-gray-400 truncate max-w-[120px]">{captain?.name}</p>
          </div>
        </div>

        {/* Middle: use case */}
        <div className="min-w-0 border-l border-[#eef2ff] pl-5">
          <p className="text-sm font-bold text-gray-900 truncate">{team.approved_usecase}</p>
          <p className="text-xs text-gray-400 italic mt-0.5 truncate">{team.usecase_desc}</p>
          <div className="flex items-center gap-2 mt-2">
            {team.members.slice(0, 4).map((m, i) => (
              <div
                key={i}
                title={m.name}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white ring-1 ring-white"
                style={{ background: `linear-gradient(135deg, ${GRADIENTS[i % GRADIENTS.length][0]}, ${GRADIENTS[i % GRADIENTS.length][1]})` }}
              >
                {memberTwoLetters(m.name)}
              </div>
            ))}
            {team.members.length > 4 && (
              <span className="text-[9px] text-gray-400 font-semibold">+{team.members.length - 4}</span>
            )}
            <span className="text-[9px] text-gray-300 ml-1">· {team.mentor}</span>
          </div>
        </div>

        {/* Right: score badges + chevron */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <PendingBadge label="SHORTLISTING" />
          <PendingBadge label="FINALS" />
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center mt-1 transition-all duration-300"
            style={{
              background: expanded ? "#1a00d9" : "#dbeaff",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg viewBox="0 0 10 6" className="w-2.5 h-2.5" fill="none">
              <path d="M1 1l4 4 4-4" stroke={expanded ? "#fff" : "#1a00d9"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Expanded panel ── */}
      {expanded && (
        <div
          className="animate-fade-slide-in"
          style={{ borderTop: "1.5px solid #eef2ff", background: "linear-gradient(160deg,#f5f7ff 0%,#ffffff 50%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pl-5 pr-5 pt-5 pb-2 grid grid-cols-[1fr_1.6fr_1fr] gap-6">

            {/* Members */}
            <div>
              <p className="section-label mb-3">Team Members</p>
              <div className="space-y-2">
                {team.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-white shrink-0"
                      style={{
                        background: m.captain
                          ? "#fe6e06"
                          : `linear-gradient(135deg,${GRADIENTS[i % GRADIENTS.length][0]},${GRADIENTS[i % GRADIENTS.length][1]})`,
                      }}
                    >
                      {memberTwoLetters(m.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{m.name}</p>
                      {m.captain && <span className="badge-captain">Captain</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 flex items-center gap-2.5 p-3 rounded-xl"
                style={{ background: "#dbeaff" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: "#1a00d9", color: "#fff" }}
                >
                  M
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#5e9eff" }}>Mentor</p>
                  <p className="text-sm font-bold" style={{ color: "#1a00d9" }}>{team.mentor}</p>
                </div>
              </div>
            </div>

            {/* Use case */}
            <div>
              <p className="section-label mb-3">Approved Use Case</p>
              <div
                className="rounded-2xl p-5 h-full relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,#1a00d9 0%,#3a2fe8 60%,#5e9eff 100%)" }}
              >
                {/* decorative circle */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: "#fff" }} />
                <p className="text-base font-black text-white leading-snug">{team.approved_usecase}</p>
                <div className="mt-3 h-px w-12" style={{ background: "#fe6e06" }} />
                <p className="text-sm text-white/70 mt-3 leading-relaxed">{team.usecase_desc}</p>
              </div>
            </div>

            {/* Scores */}
            <div>
              <p className="section-label mb-3">Scores</p>
              <div className="space-y-3">
                <ScoreBlock label="SHORTLISTING" />
                <ScoreBlock label="FINALS" />
              </div>
            </div>
          </div>

          <div className="pl-5 pr-5 pb-5">
            <StatusTimeline currentStatus={team.status} />
          </div>
        </div>
      )}
    </div>
  );
}

function PendingBadge({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: "#dbeaff" }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#5e9eff" }} />
      <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: "#1a00d9" }}>{label}</span>
    </div>
  );
}

function ScoreBlock({ label }: { label: string }) {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-3 pt-3 pb-3" style={{ background: "#f5f7ff", border: "1.5px solid #dbeaff" }}>
        <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#1a00d9", opacity: 0.5 }}>{label}</p>
        <div className="shimmer-bg rounded-lg h-8 mb-2" />
        <div className="shimmer-bg rounded-md h-3 w-3/4" />
      </div>
    </div>
  );
}
