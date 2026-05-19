"use client";

import { useEffect, useMemo, useState } from "react";
import { TEAMS, STATUS_ORDER } from "@/lib/data";
import TeamCard from "@/components/TeamCard";

const MENTORS = Array.from(new Set(TEAMS.map((t) => t.mentor))).sort();

export default function LeaderboardPage() {
  const [search, setSearch]   = useState("");
  const [mentor, setMentor]   = useState("");
  const [status, setStatus]   = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return TEAMS.filter((t) => {
      const matchSearch =
        !q ||
        t.team_name.toLowerCase().includes(q) ||
        t.gen_id.toLowerCase().includes(q) ||
        t.members.some((m) => m.name.toLowerCase().includes(q)) ||
        t.approved_usecase.toLowerCase().includes(q) ||
        t.mentor.toLowerCase().includes(q);
      return matchSearch && (!mentor || t.mentor === mentor) && (!status || t.status === status);
    });
  }, [search, mentor, status]);

  const hasFilters = search || mentor || status;

  useEffect(() => {

    let direction = 1;
    let pauseCount = 0;
    const PAUSE = 150;
    const SPEED = 1;

    const id = setInterval(() => {
      if (pauseCount > 0) { pauseCount--; return; }
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (direction === 1 && el.scrollTop >= max) { direction = -1; pauseCount = PAUSE; }
      else if (direction === -1 && el.scrollTop <= 0) { direction = 1; pauseCount = PAUSE; }
      el.scrollTop += direction * SPEED;
    }, 16);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* ── Filter bar ── */}
      <div
        className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-2xl bg-white"
        style={{ border: "1.5px solid #dbeaff", boxShadow: "0 4px 24px rgba(26,0,217,0.06)" }}
      >
        {/* Search */}
        <div className="relative flex-1 min-w-56">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#5e9eff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            className="search-input pl-10 w-full"
            placeholder="Search teams, members, use cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <select className="filter-select pr-8" value={mentor} onChange={(e) => setMentor(e.target.value)}>
            <option value="">All mentors</option>
            {MENTORS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#5e9eff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="relative">
          <select className="filter-select pr-8" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_ORDER.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#5e9eff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setMentor(""); setStatus(""); }}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
            style={{ color: "#fe6e06", background: "rgba(254,110,6,0.08)", border: "1px solid rgba(254,110,6,0.2)" }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <span
            className="text-xs font-black px-3 py-1.5 rounded-full"
            style={{ background: hasFilters ? "#1a00d9" : "#dbeaff", color: hasFilters ? "#fff" : "#1a00d9" }}
          >
            {filtered.length} / {TEAMS.length}
          </span>
          <span className="text-xs text-gray-400 font-medium">teams</span>
        </div>
      </div>

      {/* ── Table header — hidden on mobile ── */}
      <div
        className="hidden md:grid grid-cols-[16rem_1fr_12rem] gap-0 pl-6 pr-5 py-3 mb-3 rounded-xl"
        style={{ background: "linear-gradient(90deg,#1a00d9 0%,#3a2fe8 50%,#5e9eff 100%)" }}
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Team</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 pl-6">Use Case</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 pl-6">Scores</p>
      </div>

      {/* ── Cards ── */}
      {filtered.length > 0 ? (
        filtered.map((team, i) => <TeamCard key={team.gen_id} team={team} rank={i + 1} />)
      ) : (
        <div
          className="text-center py-24 rounded-2xl bg-white"
          style={{ border: "1.5px solid #dbeaff" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg,#1a00d9,#5e9eff)" }}
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <p className="text-base font-black" style={{ color: "#1a00d9" }}>No teams found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
          <button
            onClick={() => { setSearch(""); setMentor(""); setStatus(""); }}
            className="mt-5 text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            style={{ background: "#fe6e06", color: "#fff", boxShadow: "0 4px 16px rgba(254,110,6,0.35)" }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
