"use client";

import { useState } from "react";
import { Team } from "@/lib/data";
import StatusTimeline from "./StatusTimeline";

type Props = { team: Team; rank: number };

export default function TeamCard({ team, rank }: Props) {
  const [timelineOpen, setTimelineOpen] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl mb-4 overflow-hidden"
      style={{ border: "1.5px solid #e4ecff", boxShadow: "0 2px 12px rgba(26,0,217,0.06)" }}
    >
      {/* ── Main row ── */}
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr_12rem] divide-y md:divide-y-0 md:divide-x divide-[#eef2ff]">

        {/* Col 1 — Team */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black tracking-widest" style={{ color: "#5e9eff" }}>
              {team.gen_id}
            </span>
          </div>
          <p className="text-lg font-black text-gray-900 leading-tight mb-4">{team.team_name}</p>

          <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#1a00d9", opacity: 0.4 }}>
            Team
          </p>
          <div className="space-y-1.5 mb-5">
            {team.members.map((m, i) => (
              <div key={i} className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm leading-tight ${m.captain ? "font-bold text-gray-900" : "font-normal text-gray-500"}`}>
                  {m.name}
                </span>
                {m.captain && (
                  <span
                    className="text-[8px] font-black px-1.5 py-0.5 rounded"
                    style={{ background: "#fff0e6", color: "#fe6e06" }}
                  >
                    Captain
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#1a00d9", opacity: 0.4 }}>
              Mentor
            </span>
            <span className="text-sm font-semibold text-gray-700">{team.mentor}</span>
          </div>
        </div>

        {/* Col 2 — Use Case */}
        <div className="p-6">
          <p className="text-[9px] font-black uppercase tracking-widest mb-3" style={{ color: "#1a00d9", opacity: 0.4 }}>
            Use Case
          </p>
          <p className="text-base font-black text-gray-900 leading-snug mb-3">{team.approved_usecase}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{team.usecase_desc}</p>
        </div>

        {/* Col 3 — Scores */}
        <div className="p-6">
          <p className="text-[9px] font-black uppercase tracking-widest mb-3" style={{ color: "#1a00d9", opacity: 0.4 }}>
            Scores
          </p>
          <div className="mb-4">
            <ScoreBox score={team.score} />
          </div>
        </div>
      </div>

      {/* ── Timeline toggle button ── */}
      <div className="px-6 pb-5 pt-1" style={{ borderTop: "1.5px solid #eef2ff", background: "#fff" }}>
        <button
          onClick={() => setTimelineOpen((v) => !v)}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all mt-4"
          style={{
            background: timelineOpen ? "#1a00d9" : "#dbeaff",
            color: timelineOpen ? "#fff" : "#1a00d9",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {timelineOpen ? "Hide Status" : "View Status"}
          <svg
            viewBox="0 0 10 6"
            className="w-2.5 h-2.5 transition-transform duration-300"
            style={{ transform: timelineOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            fill="none"
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Timeline (collapsible) ── */}
      {timelineOpen && (
        <div className="animate-fade-slide-in">
          <StatusTimeline currentStatus={team.status} />
        </div>
      )}
    </div>
  );
}


function ScoreBox({ score }: { score: number | null }) {
  const hasScore = score !== null && score !== undefined;
  return (
    <div className="rounded-xl p-4" style={{ background: "#f5f7ff", border: "1.5px solid #e4ecff" }}>
      <p className="text-[8px] font-black uppercase tracking-widest mb-2" style={{ color: "#1a00d9", opacity: 0.5 }}>
        Score
      </p>
      <p className="text-3xl font-black leading-none" style={{ color: hasScore ? "#1a00d9" : "#9ca3af" }}>
        {hasScore ? score : "—"}
        <span className="text-base font-semibold text-gray-400 ml-1">/100</span>
      </p>
    </div>
  );
}
