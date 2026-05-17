"use client";

import { useState } from "react";

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer style={{ background: "#1a00d9" }} className="mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {logoFailed ? (
            <span className="text-lg font-black text-white">GANIT</span>
          ) : (
            <img
              src="https://www.ganitinc.com/assets/img/ganit-white-logo.svg"
              alt="GANIT"
              className="h-6 w-auto"
              onError={() => setLogoFailed(true)}
            />
          )}
          <div className="h-4 w-px bg-white/30" />
          <span className="text-white/60 text-xs">Hackathon Leaderboard 2026</span>
        </div>
        <p className="text-white/50 text-xs">
          &copy; 2026 GANIT Business Solutions Private Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
