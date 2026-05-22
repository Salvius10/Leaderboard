"use client";

import { useEffect, useMemo, useState } from "react";
import { STATUS_ORDER, Team } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import TeamCard from "@/components/TeamCard";
import { downloadExcel } from "@/lib/downloadExcel";

export default function LeaderboardPage() {
  const [teams, setTeams]         = useState<Team[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [mentor, setMentor]       = useState("");
  const [status, setStatus]       = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    supabase
      .from("teams")
      .select("*")
      .order("gen_id")
      .then(({ data, error }) => {
        if (!error && data) setTeams(data as Team[]);
        setLoading(false);
      });
  }, []);

  // Auto-scroll (kiosk / TV mode)
  useEffect(() => {
    if (loading) return;
    if (!window.location.search.includes("kiosk")) return;

    const html = document.documentElement;
    const body = document.body;

    // Imperatively force scrollability — TV WebViews (Tizen, WebOS, Android TV)
    // often ignore CSS overflow at runtime and must be set via JS
    html.style.overflowY = "scroll";

    // Detect which element actually accepts scrollTop changes.
    // html and body differ across TV engines — probe both to find the real container.
    let scrollEl: HTMLElement = html;
    const prevHtml = html.scrollTop;
    html.scrollTop = prevHtml + 1;
    if (html.scrollTop === prevHtml + 1) {
      html.scrollTop = prevHtml; // html responds — use it
    } else {
      const prevBody = body.scrollTop;
      body.scrollTop = prevBody + 1;
      if (body.scrollTop === prevBody + 1) {
        body.scrollTop = prevBody; // body responds — use it
        scrollEl = body;
      }
      // else: page not yet scrollable (content too short); default stays html
    }

    let direction  = 1;
    let pauseUntil = Date.now() + 1500; // initial settle delay
    const PAUSE_MS = 3000;
    const SPEED    = 0.5; // px per tick — higher than 1 to be visible on large TV screens
    const TICK_MS  = 16;  // ~60 fps

    const id = setInterval(() => {
      if (Date.now() < pauseUntil) return;

      const y   = scrollEl.scrollTop;
      const max = Math.max(body.scrollHeight, html.scrollHeight) - window.innerHeight;

      if (max <= 0) return; // content fits screen — nothing to do

      if (direction === 1 && y >= max - 2) {
        direction  = -1;
        pauseUntil = Date.now() + PAUSE_MS;
      } else if (direction === -1 && y <= 2) {
        direction  = 1;
        pauseUntil = Date.now() + PAUSE_MS;
      } else {
        scrollEl.scrollTop += direction * SPEED;
      }
    }, TICK_MS);

    return () => {
      clearInterval(id);
      html.style.overflowY = "";
    };
  }, [loading]);

  const mentors = useMemo(
    () => Array.from(new Set(teams.map((t) => t.mentor.trim()))).sort(),
    [teams]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return teams.filter((t) => {
      const matchSearch =
        !q ||
        t.team_name.toLowerCase().includes(q) ||
        t.gen_id.toLowerCase().includes(q) ||
        t.members.some((m) => m.name.toLowerCase().includes(q)) ||
        t.approved_usecase.toLowerCase().includes(q) ||
        t.mentor.toLowerCase().includes(q);
      return matchSearch && (!mentor || t.mentor.trim() === mentor) && (!status || t.status.trim() === status);
    });
  }, [teams, search, mentor, status]);

  const hasFilters = search || mentor || status;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 rounded-2xl shimmer-bg" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* ── Filter bar ── */}
      <div
        className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-2xl bg-white"
        style={{ border: "1.5px solid #dbeaff", boxShadow: "0 4px 24px rgba(26,0,217,0.06)" }}
      >
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
            {mentors.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#5e9eff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="relative">
          <select className="filter-select pr-8" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All status</option>
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
            {filtered.length} / {teams.length}
          </span>
          <span className="text-xs text-gray-400 font-medium">teams</span>

          {/* Excel download button — re-enable when needed */}
          {false && (
          <button
            onClick={async () => {
              setExporting(true);
              try { await downloadExcel(teams); }
              finally { setExporting(false); }
            }}
            disabled={exporting || teams.length === 0}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#1a00d9", color: "#fff", boxShadow: "0 4px 16px rgba(26,0,217,0.25)" }}
          >
            {exporting ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12" />
              </svg>
            )}
            {exporting ? "Exporting…" : "Excel Report"}
          </button>
          )}
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
