import { MascotStar } from "@/components/MascotStar";
import { C, NAV } from "@/lib/constant";

export function Header() {
    return <header
        className="sticky top-0 z-50 border-b-2 backdrop-blur"
        style={{ background: "rgba(23,19,16,0.88)", borderColor: "rgba(247,239,223,0.12)" }}
    >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-8">
            <a href="/" className="flex items-center gap-2.5">
                <MascotStar mood="idle" size={40} animated={false} />
                <span className="text-xl font-black tracking-wide" style={{ color: C.cream }}>
                    Hunukasa
                </span>

            </a>
            <nav className="ml-auto hidden items-center gap-6 md:flex">
                {NAV.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="text-sm font-extrabold transition-colors hover:opacity-100"
                        style={{ color: C.cream, opacity: 0.65 }}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
            <a
                href="/sign-in"
                className="key-3d ml-auto rounded-2xl border-2 px-4 py-2 text-xs font-black uppercase tracking-widest"
                style={{ borderColor: `${C.cream}66`, color: C.cream }}
            >
                Sign in
            </a>
            <a
                href="/#download"
                className="key-3d rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-widest md:ml-0"
                style={{ background: C.terracotta, color: C.cream }}
            >
                Get the app
            </a>
        </div>
    </header>;
}

