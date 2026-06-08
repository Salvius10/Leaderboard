"use client";

import { useEffect, useState } from "react";
import { Team } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import TeamCard from "@/components/TeamCard";

export default function KioskPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("teams")
      .select("*")
      .order("score", { ascending: false, nullsFirst: false })
      .then(({ data, error }) => {
        if (!error && data) setTeams(data as Team[]);
        setLoading(false);
      });
  }, []);

  // Auto-scroll for TV/kiosk display
  useEffect(() => {
    if (loading) return;

    const html = document.documentElement;
    const body = document.body;

    html.style.overflowY = "scroll";

    let scrollEl: HTMLElement = html;
    const prevHtml = html.scrollTop;
    html.scrollTop = prevHtml + 1;
    if (html.scrollTop === prevHtml + 1) {
      html.scrollTop = prevHtml;
    } else {
      const prevBody = body.scrollTop;
      body.scrollTop = prevBody + 1;
      if (body.scrollTop === prevBody + 1) {
        body.scrollTop = prevBody;
        scrollEl = body;
      }
    }

    let direction = 1;
    let pauseUntil = Date.now() + 1500;
    const PAUSE_MS = 3000;
    const SPEED = 0.5;
    const TICK_MS = 16;

    const id = setInterval(() => {
      if (Date.now() < pauseUntil) return;

      const y = scrollEl.scrollTop;
      const max = Math.max(body.scrollHeight, html.scrollHeight) - window.innerHeight;

      if (max <= 0) return;

      if (direction === 1 && y >= max - 2) {
        direction = -1;
        pauseUntil = Date.now() + PAUSE_MS;
      } else if (direction === -1 && y <= 2) {
        direction = 1;
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
      {/* Table header */}
      <div
        className="hidden md:grid grid-cols-[16rem_1fr_12rem] gap-0 pl-6 pr-5 py-3 mb-3 rounded-xl"
        style={{ background: "linear-gradient(90deg,#1a00d9 0%,#3a2fe8 50%,#5e9eff 100%)" }}
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Team</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 pl-6">Use Case</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 pl-6">Scores</p>
      </div>

      {teams.map((team, i) => (
        <TeamCard key={team.gen_id} team={team} rank={i + 1} />
      ))}
    </div>
  );
}
