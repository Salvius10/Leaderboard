"use client";

import { MILESTONE_DATES, STATUS_ORDER } from "@/lib/data";

type Props = { currentStatus: string };

export default function StatusTimeline({ currentStatus }: Props) {
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div style={{ background: "#f8f9fe" }} className="px-6 py-5">

      <div className="relative">
        {/* Base track */}
        <div className="absolute top-3.5 left-0 right-0 h-0.5 rounded-full" style={{ background: "#dbeaff" }} />

        {/* Progress fill */}
        {currentIdx > 0 && (
          <div
            className="absolute top-3.5 left-0 h-0.5 rounded-full"
            style={{
              background: "linear-gradient(90deg,#1a00d9,#5e9eff)",
              width: `${(currentIdx / (MILESTONE_DATES.length - 1)) * 100}%`,
            }}
          />
        )}

        <div className="relative flex justify-between">
          {MILESTONE_DATES.map((m, i) => {
            // Registration (i=0) is always done — all teams have registered.
            // Use Case Submission (i=1) is orange/pending if team is still at Registration,
            // blue tick if team has submitted (status = Use Case Submission or beyond).
            let done: boolean;
            let active: boolean;
            if (i === 0) {
              done = true;
              active = false;
            } else if (i === 1) {
              done = currentIdx >= 1;
              active = currentIdx === 0;
            } else {
              done = i < currentIdx;
              active = i === currentIdx;
            }

            return (
              <div key={m.label} className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
                {/* Node */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                  style={
                    done
                      ? { background: "#1a00d9", border: "2px solid #1a00d9" }
                      : active
                      ? { background: "#fff", border: "2.5px solid #fe6e06", boxShadow: "0 0 0 4px rgba(254,110,6,0.12)" }
                      : { background: "#fff", border: "2px solid #dbeaff" }
                  }
                >
                  {done ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : active ? (
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#fe6e06" }} />
                  ) : (
                    <span className="w-2 h-2 rounded-full" style={{ background: "#dbeaff" }} />
                  )}
                </div>

                {/* Label + date */}
                <div className="text-center px-1">
                  <p
                    className="text-[9px] font-bold leading-tight"
                    style={{ color: done ? "#1a00d9" : active ? "#fe6e06" : "#9ca3af" }}
                  >
                    {m.label}
                  </p>
                  <p className="text-[8px] mt-1 font-medium" style={{ color: "#9ca3af" }}>
                    Scheduled end date
                  </p>
                  <p
                    className="text-[9px] font-black mt-0.5"
                    style={{ color: done ? "#1a00d9" : active ? "#fe6e06" : "#d1d5db" }}
                  >
                    {m.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
