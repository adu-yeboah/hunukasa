import { C } from "@/lib/constant";

/* Shell for the onboarding and sign-in pages. Pages paint their own
   full-bleed backgrounds; the layout only adds the way back to the site. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <a
        href="/"
        className="absolute left-4 top-4 z-20 rounded-xl px-3 py-1.5 text-[11px] font-black uppercase tracking-widest transition-opacity hover:opacity-100 md:left-6 md:top-6"
        style={{ color: C.cream, opacity: 0.6 }}
      >
        ← Back to site
      </a>
      {children}
    </div>
  );
}
