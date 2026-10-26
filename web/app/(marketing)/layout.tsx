import { C, NAV } from "@/lib/constant";
import { MascotStar } from "../../components/MascotStar";
import { Header } from "@/components/ui/marketing/Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky site header  */}
      <Header />
      <main className="flex-1">{children}</main>

      {/* Footer  */}
      <footer
        className="border-t-2"
        style={{ background: "#171310", borderColor: "rgba(247,239,223,0.12)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_0.5fr] md:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <MascotStar mood="wave" size={44} animated={false} />
              <span
                className="text-xl font-black tracking-wide"
                style={{ color: C.cream }}
              >
                Hunukasa
              </span>
            </div>
            <p
              className="mt-3 max-w-xs text-sm font-semibold leading-relaxed"
              style={{ color: C.cream, opacity: 0.6 }}
            >
              Free, open-source Asante Twi lessons built on a verifiable
              public-domain curriculum, made with pride in Ghana. 🇬🇭
            </p>
            <p className="mt-4 text-xs font-bold" style={{ color: C.gold }}>
              Medaase
            </p>
          </div>
          <div>
            <p
              className="text-[11px] font-black uppercase tracking-[0.25em]"
              style={{ color: C.gold }}
            >
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-bold text-cream opacity-65"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#download"
                  className="text-sm font-bold text-cream opacity-65"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="border-t px-4 py-5 text-center md:px-8"
          style={{ borderColor: "rgba(247,239,223,0.08)" }}
        >
          <p
            className="text-xs font-bold"
            style={{ color: C.cream, opacity: 0.45 }}
          >
            © 2026 Hunukasa
          </p>
        </div>
      </footer>
    </div>
  );
}
