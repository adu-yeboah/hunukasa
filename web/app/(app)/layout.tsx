"use client";

import { useEffect, useState } from "react";

import { MascotStar } from "@/components/MascotStar";
import { C } from "@/lib/constant";
import { useProgress } from "@/lib/progress";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* App shell — compact top bar + bottom tab nav for the main pages. */

const TABS = [
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/profile", label: "Profile" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { xp } = useProgress();
  const [name, setName] = useState("Friend");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hunukasa-profile");
      if (raw) {
        const saved = JSON.parse(raw) as { name?: string };
        if (saved.name) setName(saved.name);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col" style={{ background: C.cream }}>
      {/* top bar */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 border-b-2 px-4 py-2.5"
        style={{ background: C.indigo, borderColor: C.charcoal }}
      >
        <MascotStar mood="idle" size={34} animated={false} />
        <span className="text-lg font-black tracking-wide text-cream">Hunukasa</span>
        <span
          className="ml-auto rounded-full border px-3 py-1 text-xs font-black"
          style={{ borderColor: C.gold, color: C.gold }}
        >
          ⚡ {xp} XP
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-black"
          style={{ background: C.gold, borderColor: C.cream, color: C.charcoal }}
          title={name}
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      </header>

      <main className="relative flex-1">{children}</main>

      {/* bottom tabs */}
      <nav
        className="sticky bottom-0 z-40 flex border-t-2"
        style={{ background: C.indigo, borderColor: C.charcoal }}
      >
        {TABS.map((t) => {
          const active = pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="flex-1 py-3 text-center text-xs font-black uppercase tracking-widest transition-colors"
              style={{ color: active ? C.gold : `${C.cream}88` }}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
