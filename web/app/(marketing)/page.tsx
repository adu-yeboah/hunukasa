import type { Metadata } from "next";

import { KentePattern } from "../../components/ui/KentePattern";
import { MascotStar } from "../../components/MascotStar";
import { SunEmblem } from "../../components/ui/SunEmblem";

export const metadata: Metadata = {
  title: "Hunukasa · Learn Asante Twi for free",
  description:
    "Learn Asante Twi with fun 3-minute lessons built on a verifiable, public-domain curriculum. Free and open-source, offline-first, no ads, no account.",
};

/* Reusable bits  */

function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gold">◆ {kicker}</p>
      <h2 className="mt-2 text-3xl font-black tracking-wide text-cream md:text-4xl">{title}</h2>
      {sub ? (
        <p className="mt-3 text-base font-semibold leading-relaxed text-cream opacity-60">{sub}</p>
      ) : null}
    </div>
  );
}

function StatChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border-[1.5px] border-cream/30 bg-cream/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-cream">
      {children}
    </span>
  );
}

const STAGES = [
  "Sounds of Twi",
  "First Words",
  "Speaking Twi",
  "Food & Market",
  "Daily Life",
  "Getting Around",
  "People & Culture",
];

const LATER_LANGUAGES = [
  { name: "Eʋegbe", full: "Ewe", greeting: "Akpé" },
  { name: "Gã", full: "Ga", greeting: "Ojekoo" },
];

const FEATURES = [
  {
    title: "Play real lessons",
    body: "Tap, build, listen and match your way through bite-size exercises, one small win at a time.",
  },
  {
    title: "Remembers your weak words",
    body: "Hunukasa notices the words you stumble on and brings them back right before you'd forget them.",
  },
  {
    title: "Fully offline",
    body: "On the trotro, in the market, no bars in the taxi: every lesson works without internet, and your progress lives on your device.",
  },
  {
    title: "Culture woven in",
    body: "Adinkra symbols, kente patterns, proverbs and real-life scenes: every lesson is rooted in how Ghana actually talks.",
  },
  {
    title: "Nsoromma, your star",
    body: "A cuddly star companion who cheers when you're right and encourages when you're wrong. Never a red X, always akwaaba.",
  },
  {
    title: "Private by design",
    body: "No account, no sign-up, no ads, no trackers. Your learning data never leaves your device. That's a promise, not a setting.",
  },
];

const STEPS = [
  { mood: "point" as const, title: "Start with Twi", body: "From your first sounds to real conversations, one small win at a time." },
  { mood: "think" as const, title: "Play a 3-minute lesson", body: "Tap, build, listen and match. Bite-size enough for any queue." },
  { mood: "cheer" as const, title: "Pue! Celebrate", body: "Keep your streak alive and watch Nsoromma dance for you." },
];

const FAQS = [
  {
    q: "Is Hunukasa really free?",
    a: "Yes, completely. Every lesson in the full course is free, with no premium tier and no ads. The project is open-source, and if voluntary donations are ever accepted, they will never gate a single feature.",
  },
  {
    q: "Which Twi do you teach?",
    a: "Asante Twi, the most widely spoken variant. The course is built on the FSI Twi Basic Course (1963), a public-domain expert-designed curriculum with native recordings, plus Peace Corps materials. Eʋegbe and Gã are planned for later.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes, Hunukasa is offline-first. Lessons and your progress live entirely on your device, so it works on the trotro, in the market, or anywhere with no signal.",
  },
  {
    q: "Does Hunukasa collect my data?",
    a: "No. There are no accounts, no sign-ups, no analytics and no ads. Your learning progress is stored only on your device, and it never leaves it. The full details are in the privacy policy.",
  },
  {
    q: "When can I download it?",
    a: "We're putting the final polish on the app, and it rolls out on Google Play soon. This page will get the download link the moment it's live.",
  },
];

/* Page */

export default function LandingPage() {
  return (
    <div className="overflow-x-clip">
      {/* Hero  */}
      <section className="px-4 pt-6 md:px-8 md:pt-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-2 border-charcoal bg-indigo p-7 shadow-[0_8px_0_var(--stamp-charcoal)] md:p-14">
          <KentePattern id="kente-hero" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              
              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-wide text-cream md:text-6xl">
                Learn Asante Twi.
              </h1>
              <p className="mt-5 max-w-lg text-base font-bold leading-relaxed text-cream opacity-75 md:text-lg">
                Fun 3-minute lessons rooted in real Ghanaian life: greetings that open doors, market talk, family and
                proverbs. Free and open-source, works offline, no ads and no account needed.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#download"
                  className="key-3d rounded-2xl bg-gold px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-charcoal"
                >
                  Get the app · free
                </a>
                <a
                  href="#features"
                  className="key-3d rounded-2xl bg-cream px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-charcoal"
                >
                  See how it works
                </a>
              </div>
             
            </div>

            {/* Mascot stage */}
            <div className="relative mx-auto h-64 w-64 md:h-96 md:w-96">
              <SunEmblem className="spin-slow absolute inset-0 h-full w-full opacity-30" />
              <span className="twinkle absolute left-2 top-6 text-2xl text-gold">✦</span>
              <span className="twinkle absolute right-4 top-16 text-lg text-cream [animation-delay:0.5s]">✦</span>
              <span className="twinkle absolute bottom-10 left-6 text-base text-gold [animation-delay:1s]">✦</span>
              <div className="floaty absolute inset-0 flex items-center justify-center">
                <MascotStar mood="wave" size={280} />
              </div>

              <div
                aria-hidden="true"
                className="absolute -bottom-2 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-black/35 blur-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="languages" className="scroll-mt-24 px-4 pt-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="The language"
            title="Start with Asante Twi"
            sub="Real conversations, not tourist phrases: one clear path from your first sounds to holding a conversation, with culture woven into every unit."
          />
          {/* Twi spotlight */}
          <article className="cloth-texture rounded-3xl border-2 border-charcoal p-7 shadow-[0_6px_0_var(--stamp-charcoal)] md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-3xl font-black tracking-wide text-indigo">Asante Twi</h3>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-terracotta">
                  the most widely spoken Twi dialect
                </p>
              </div>
              <span className="rounded-full bg-indigo px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-cream">
                7 stages · 30 units · 150 lessons
              </span>
            </div>
            <p className="mt-6 text-3xl font-black tracking-wide text-charcoal md:text-4xl">“Medaase”</p>
            <p className="mt-1 text-sm font-bold text-charcoal opacity-55">
              “Thank you”: your first word, and a good habit.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {STAGES.map((stage, i) => (
                <span
                  key={stage}
                  className={`rounded-full border-2 border-charcoal px-3.5 py-1.5 text-xs font-extrabold text-charcoal ${
                    i === 0 ? "bg-gold" : "bg-charcoal/5"
                  }`}
                >
                  {i + 1} · {stage}
                </span>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border-2 border-dashed border-charcoal bg-gold/15 px-4 py-3 text-xs font-bold leading-relaxed text-charcoal">
              Built on the FSI Twi Basic Course (1963, US Foreign Service Institute), a public-domain, expert-designed
              curriculum with native recordings. Every unit cites its source, so what you learn is verifiable, not
              vibes.
            </p>
          </article>
          {/* Roadmap languages */}
          {/* <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {LATER_LANGUAGES.map((lang) => (
              <article
                key={lang.name}
                className="flex items-center gap-5 rounded-3xl border-2 border-dashed border-cream/35 bg-cream/5 p-6"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-black tracking-wide text-cream opacity-75">{lang.name}</h3>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gold opacity-80">
                    {lang.full} · on the roadmap
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-cream opacity-75">“{lang.greeting}”</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-cream opacity-40">coming later</p>
                </div>
              </article>
            ))}
          </div> */}
        </div>
      </section>

      {/* Features  */}
      <section id="features" className="scroll-mt-24 px-4 pt-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="Why Hunukasa"
            title="Learning that feels like play"
            sub="Everything is built around one idea: keep you coming back tomorrow, and enjoying it."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="cloth-texture rounded-3xl border-2 border-charcoal p-6 shadow-[0_5px_0_var(--stamp-charcoal)] transition-transform hover:-translate-y-1"
              >
                <h3 className="mt-1 flex items-center gap-2 text-lg font-black text-indigo">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px] border-2 border-charcoal bg-gold"
                  />
                  {f.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-charcoal opacity-75">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works  */}
      <section className="px-4 pt-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader kicker="How it works" title="Your first word in three minutes" />
          <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            <div
              aria-hidden="true"
              className="absolute left-[16%] right-[16%] top-16 hidden border-t-4 border-dashed border-gold/40 md:block"
            />
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-charcoal bg-indigo shadow-[0_5px_0_var(--stamp-charcoal)]">
                  <MascotStar mood={step.mood} size={96} />
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-charcoal bg-gold text-sm font-black text-charcoal">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-black text-cream">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm font-semibold leading-relaxed text-cream opacity-60">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 px-4 pt-20 md:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader kicker="FAQ" title="Small questions, honest answers" />
          <div className="space-y-3.5">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="cloth-texture group rounded-2xl border-2 border-charcoal px-5 py-4 shadow-[0_4px_0_var(--stamp-charcoal)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-indigo">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-charcoal bg-gold text-sm font-black text-charcoal transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-charcoal opacity-75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA  */}
      <section id="download" className="scroll-mt-24 px-4 py-20 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-2 border-charcoal bg-indigo p-8 text-center shadow-[0_8px_0_var(--stamp-charcoal)] md:p-14">
          <KentePattern id="kente-download" />
          <div className="relative mx-auto max-w-xl">
            <div className="floaty mx-auto w-fit">
              <MascotStar mood="cheer" size={150} />
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-wide text-cream md:text-4xl">
              Say your first word today
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base font-bold leading-relaxed text-cream opacity-70">
              Akwaaba! Join the learners keeping Ghana's languages alive,
              one 3-minute lesson at a time.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="/welcome"
                className="key-3d inline-flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-charcoal"
                style={{ border: "2px solid #2B211A" }}
              >
                Try in your browser · free
              </a>
              <span className="key-3d inline-flex items-center gap-2.5 rounded-2xl bg-cream px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-charcoal">
                <span className="text-lg leading-none text-terracotta">▸</span>
                Google Play · soon
              </span>
              <span className="key-3d inline-flex items-center gap-2.5 rounded-2xl bg-gold px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-charcoal">
                <span className="text-lg leading-none">★</span>
                App Store · later
              </span>
            </div>
            <p className="mt-4 text-xs font-bold text-cream opacity-50">
              Rolling out soon · Questions?{" "}
              <a href="mailto:support@hunukasa.com" className="underline underline-offset-2">
                support@hunukasa.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
