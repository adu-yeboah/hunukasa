"use client";

import { MascotStar } from "@/components/MascotStar";
import { GhanaFlag } from "@/components/ui/GhanaFlag";
import { GoogleG } from "@/components/ui/GoogleG";
import { KentePattern } from "@/components/ui/KentePattern";
import { C } from "@/lib/constant";

/* Sign-in card, centered. Learning needs no account: "Start learning"
   leads; Google stays visible but "Soon" until optional sync arrives. */

export default function SignInPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: C.indigo }}
    >
      <KentePattern color={C.gold} id="kente-signin" />

      <main
        className="cloth-texture relative z-10 w-full max-w-md rounded-[2rem] border-2 border-charcoal bg-cream px-6 py-7"
        style={{ boxShadow: `0 6px 0 ${C.charcoal}` }}
      >
        {/* compact brand mark */}
        <div className="flex flex-col items-center">
          <MascotStar mood="wave" size={72} />
          <h1 className="mt-1 text-2xl font-black tracking-wide text-charcoal">Hunukasa</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            Understand Language
          </p>
        </div>

        <p className="mb-3 mt-6 text-center text-xs font-black uppercase tracking-widest text-charcoal/60">
          Choose your course
        </p>

        <button
          aria-pressed={true}
          className="relative flex w-full items-center gap-4 rounded-2xl border-2 border-charcoal bg-white px-5 py-4 text-left transition-transform hover:-translate-y-0.5"
        >
          <GhanaFlag width={34} height={23} />
          <span className="flex-1">
            <span className="block text-lg font-black text-charcoal">Asante Twi</span>
            <span className="block text-xs font-bold text-charcoal/60">
              30 units · 150 lessons · tone first
            </span>
          </span>
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-charcoal text-sm font-black"
            style={{ background: C.gold, color: C.charcoal }}
          >
            ✓
          </span>
        </button>
        <p className="mt-2.5 text-center text-[11px] font-semibold text-charcoal/50">
          More languages coming with the community
        </p>

        <a
          href="/profile-setup"
          className="key-3d mt-7 block w-full rounded-2xl bg-terracotta px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-cream"
        >
          Start learning
        </a>
        <p className="mt-2.5 text-center text-[11px] font-semibold text-charcoal/50">
          No account needed · your progress stays on this device
        </p>

        <div className="mt-6">
          <button
            disabled
            aria-disabled={true}
            title="Optional progress sync arrives in a later release"
            className="relative flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-2xl border-2 border-charcoal bg-white px-6 py-3.5 opacity-70"
          >
            <GoogleG />
            <span className="text-sm font-extrabold text-charcoal">Continue with Google</span>
            <span
              className="absolute -right-2 -top-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest"
              style={{ background: C.indigo, color: "#fff" }}
            >
              Soon
            </span>
          </button>
        </div>

        <p className="mt-7 text-center text-[11px] font-semibold leading-relaxed text-charcoal/50">
          Curriculum adapted from the FSI Twi Basic Course (public domain), with
          Peace Corps materials. Every unit cites its source.
        </p>
        <p className="mt-3 text-center text-[10px] font-semibold text-charcoal/40">
          By continuing you agree to our{" "}
          <a href="/legal" className="underline underline-offset-2">
            Terms &amp; Privacy
          </a>
          .
        </p>
      </main>
    </div>
  );
}
