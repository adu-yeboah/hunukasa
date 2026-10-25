import type { Metadata } from "next";

import { MascotStar } from "../../components/MascotStar";

export const metadata: Metadata = {
  title: "Hunukasa  Privacy & Terms",
  description:
    "Privacy Policy and Terms & Conditions for Hunukasa, the free and open-source Asante Twi learning app.",
};

const C = {
  cream: "#F7EFDF",
  charcoal: "#2B211A",
  terracotta: "#B54B2E",
  gold: "#D9A441",
  indigo: "#1B3A6B",
};

const EFFECTIVE = "16 October 2026";
const CONTACT = "support@hunukasa.com";

/* Kente diamond band, same 48px tile as the prototype header. */
function KentePattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-10"
    >
      <svg
        className="h-full w-full object-cover"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            height="48"
            id="kente-legal"
            patternUnits="userSpaceOnUse"
            width="48"
          >
            <path
              d="M0 24 L24 0 L48 24 L24 48 Z"
              fill="none"
              stroke={C.cream}
              strokeWidth="2"
            />
            <path d="M12 24 L24 12 L36 24 L24 36 Z" fill={C.cream} />
            <circle
              cx="24"
              cy="24"
              fill="none"
              r="3"
              stroke={C.cream}
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect fill="url(#kente-legal)" height="100%" width="100%" />
      </svg>
    </div>
  );
}

/* Document building blocks */

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="key-3d rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-widest"
        style={{
          background: C.terracotta,
          color: C.cream,
          boxShadow: `0 4px 0 ${C.charcoal}`,
          border: `2px solid ${C.charcoal}`,
        }}
      >
        {num}
      </span>
      <h2
        className="text-2xl font-black tracking-wide"
        style={{ color: C.indigo }}
      >
        {title}
      </h2>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-7 mb-2 flex items-center gap-2 text-base font-black"
      style={{ color: C.charcoal }}
    >
      <span
        className="inline-block h-2.5 w-2.5 rotate-45 rounded-[3px]"
        style={{ background: C.gold, border: `2px solid ${C.charcoal}` }}
      />
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-[15px] leading-relaxed font-semibold"
      style={{ color: C.charcoal }}
    >
      {children}
    </p>
  );
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-3 ml-1 space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-2.5 text-[15px] leading-relaxed font-semibold"
          style={{ color: C.charcoal }}
        >
          <span
            aria-hidden="true"
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: C.terracotta }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage() {
  return (
    <main
      className="min-h-screen px-4 py-8 md:px-8 md:py-12"
      style={{ background: "#171310" }}
    >
      <div className="mx-auto max-w-full">
        {/* Header  */}
        <header
          className="relative overflow-hidden rounded-3xl p-6 md:p-8"
          style={{
            background: C.indigo,
            border: `2px solid ${C.charcoal}`,
            boxShadow: `0 6px 0 ${C.charcoal}`,
          }}
        >
          <KentePattern />
          <div className="relative flex flex-wrap items-center gap-5">
            <MascotStar mood="wave" size={96} />
            <div className="min-w-0">
              <p
                className="text-[11px] font-black uppercase tracking-[0.3em]"
                style={{ color: C.gold }}
              >
                Hunukasa · Understand Language
              </p>
              <h1
                className="mt-1 text-3xl font-black tracking-wide md:text-4xl"
                style={{ color: C.cream }}
              >
                Privacy &amp; Terms
              </h1>
              <p
                className="mt-1 text-sm font-bold"
                style={{ color: C.cream, opacity: 0.75 }}
              >
                Free, open-source, and built to respect your data.
              </p>
            </div>
          </div>
        </header>

        {/* Document  */}
        <article
          className="cloth-texture mt-6 rounded-3xl px-5 py-7 md:px-10 md:py-10"
          style={{
            border: `2px solid ${C.charcoal}`,
            boxShadow: `0 6px 0 ${C.charcoal}`,
          }}
        >
          <p
            className="mb-8 rounded-2xl px-4 py-3 text-sm font-bold leading-relaxed"
            style={{
              background: "rgba(217,164,65,0.15)",
              border: `2px dashed ${C.charcoal}`,
              color: C.charcoal,
            }}
          >
            Akwaaba! Hunukasa is a <strong>free, open-source community
            project</strong> for learning Asante Twi. This page explains what
            data the app and website handle (the short answer: almost none, and
            it stays on your device) and the rules for using and sharing the
            project. Please read both sections; they apply every time you open
            the app.
          </p>

          {/* ══ §1 Privacy Policy ══════════════════════════════════════ */}
          <div id="privacy" className="scroll-mt-6">
            <SectionHeading num="§1" title="Privacy Policy" />

            <H3>Who we are</H3>
            <P>
              Hunukasa (&ldquo;Hunukasa&rdquo;, &ldquo;we&rdquo;,
              &ldquo;the project&rdquo;) is a community-driven, open-source
              project offering a free Asante Twi course on mobile and the web.
              It is maintained by volunteers. For any privacy question you can
              reach us at <strong>{CONTACT}</strong> or open an issue on the
              project repository.
            </P>

            <H3>Data we handle (the honest current state)</H3>
            <UL
              items={[
                <>
                  <strong>Learning data stays on your device.</strong> Your
                  progress, XP, streak, completed lessons and &ldquo;weak
                  words&rdquo; are stored locally on your phone or computer.
                  No account is required, and in the current release this data
                  never leaves your device.
                </>,
                <>
                  <strong>No accounts, no sign-in.</strong> The app works fully
                  offline and locally; there is currently no login and no
                  server that receives your learning data.
                </>,
                <>
                  <strong>Speech audio (when speak exercises are available):</strong>{" "}
                  a recording you make in a &ldquo;speak&rdquo; exercise is
                  processed solely to score your pronunciation and is deleted
                  immediately after scoring. Recordings are never used to
                  identify you, never shared, and not used to train models.
                </>,
                <>
                  <strong>Website visits:</strong> this site runs no analytics
                  and embeds no advertising or tracking scripts.
                </>,
              ]}
            />

            <H3>How your data is stored</H3>
            <P>
              Hunukasa is offline-first and local-first: everything the app
              saves lives in your device&rsquo;s local storage, under your
              control. If optional sign-in and cross-device sync are added in
              the future, they will be strictly optional, clearly announced in
              the app, and this policy will be updated before any data is ever
              sent to a server.
            </P>

            <H3>
              What we do <em>not</em> do
            </H3>
            <UL
              items={[
                <>
                  We show <strong>no advertising</strong> and embed no ad or
                  analytics trackers.
                </>,
                <>
                  We never <strong>sell or rent</strong> data; we do not have
                  data to sell.
                </>,
                <>
                  The app does not read your contacts, messages, photos, files
                  or location.
                </>,
              ]}
            />

            <H3>Free forever</H3>
            <P>
              Hunukasa costs nothing and always will: no purchases, no
              subscriptions, no paid features, no ads. If the project ever
              accepts voluntary donations, donating will never unlock or
              change functionality.
            </P>

            <H3>Permissions the app uses</H3>
            <UL
              items={[
                <>
                  <strong>Local storage</strong>, to save your progress offline
                  on your device.
                </>,
                <>
                  <strong>Audio playback</strong>, to play native-speaker audio
                  for lessons.
                </>,
                <>
                  <strong>Microphone</strong>, only while you are on a
                  &ldquo;speak&rdquo; exercise (where available), and only to
                  score pronunciation. You can decline; all other exercises
                  work fully without it.
                </>,
              ]}
            />

            <H3>Children&rsquo;s privacy</H3>
            <P>
              Hunukasa is not directed at children under 13 and we do not
              knowingly collect personal data from anyone. Because learning
              data lives only on the device, a parent can remove everything
              simply by uninstalling the app. Teenagers should use Hunukasa
              with a parent or guardian&rsquo;s permission.
            </P>

            <H3>Your rights</H3>
            <P>
              Your learning data is yours: it sits on your device, you can
              copy or export it freely, and deleting the app deletes it
              entirely. We process no server-side personal data today, so
              there is nothing for us to access, correct or delete on your
              behalf. Where the EU/UK GDPR applies, the same is true by
              design: the data never reaches a controller. If that ever
              changes, the rights (access, correction, portability,
              restriction, objection, deletion) will be honoured as described
              here and in the app.
            </P>

            <H3>The law we follow</H3>
            <P>
              We comply with Ghana&rsquo;s Data Protection Act, 2012 (Act 843),
              and honour the GDPR/UK GDPR for users in the EU/EEA and UK. By
              using Hunukasa you accept the practices in this policy; where
              consent is ever the legal basis for processing, you may withdraw
              it at any time.
            </P>

            <H3>Changes to this policy</H3>
            <P>
              If we change how data is handled, we will update this page,
              change the effective date above, and notify you in the app for
              any significant change, before the change takes effect.
            </P>
          </div>

          {/* ══ §2 Terms & Conditions ═══════════════════════════════════ */}
          <div
            id="terms"
            className="mt-10 scroll-mt-6 border-t-2 border-dashed pt-8"
            style={{ borderColor: "rgba(43,33,26,0.3)" }}
          >
            <SectionHeading num="§2" title="Terms & Conditions" />

            <H3>1. Acceptance</H3>
            <P>
              By downloading, accessing or using Hunukasa, you agree to these
              Terms &amp; Conditions and to our Privacy Policy (§1). If you do
              not agree, please do not use the app.
            </P>

            <H3>2. Eligibility</H3>
            <P>
              You must be at least 13 years old (or the minimum digital-consent
              age in your country) to participate in the project community,
              and users under 18 should have a parent or guardian&rsquo;s
              permission. No account is needed to learn; the app works fully
              offline on your device.
            </P>

            <H3>3. Licence: free and open source</H3>
            <P>
              Hunukasa is open source, and you are warmly invited to use,
              study, share and improve it:
            </P>
            <UL
              items={[
                <>
                  <strong>App source code</strong> is released under the{" "}
                  <strong>MIT License</strong>: you may use, copy, modify and
                  redistribute it, commercially or not, provided you include
                  the license notice.
                </>,
                <>
                  <strong>Course content</strong> (the curriculum, dialogues,
                  exercises, explanations, and artwork (including the Nsoromma
                  mascot and visual design) is released under{" "}
                  <strong>Creative Commons Attribution-ShareAlike 4.0
                  (CC BY-SA 4.0)</strong>: you may share and adapt it for any
                  purpose, with attribution, under the same license.
                </>,
                <>
                  <strong>Contributions</strong> (reviews, corrections, code,
                  content) are accepted under those same licenses; by
                  contributing you agree your work is published under them and
                  credited to you.
                </>,
              ]}
            />

            <H3>4. Content, provenance &amp; cultural respect</H3>
            <P>
              The Twi course is adapted from the{" "}
              <strong>FSI Twi Basic Course</strong> (US Foreign Service
              Institute, 1963, <strong>public domain</strong>) and the{" "}
              <strong>Peace Corps &ldquo;Twi For All&rdquo;</strong> lessons
              (also public domain), with the source cited on every unit in the
              app. Cross-checks reference LearnAkan and other public
              resources; copyrighted third-party material is never copied.
              Adinkra symbols and kente patterns are proud Ghanaian cultural
              heritage; the project uses them respectfully and claims no
              ownership of the traditional motifs themselves.
            </P>

            <H3>5. Free of charge</H3>
            <P>
              Hunukasa is free, forever. There are no purchases,
              subscriptions, paid tiers or advertisements, and the project
              will not put learning features behind a paywall. Optional
              voluntary donations, if ever accepted, change nothing about the
              experience.
            </P>

            <H3>6. Educational purpose &amp; honesty</H3>
            <P>
              Hunukasa is a self-study aid built on an expert-designed
              curriculum, but it is not a substitute for formal instruction,
              certified translation, or official language examinations.
              Language is living and regional: vocabulary, tone and
              pronunciations vary across dialects, and community review of
              content is continuous; if something sounds wrong to you, please
              report it.
            </P>

            <H3>7. Community standards</H3>
            <P>
              Be kind. No harassment of learners or contributors, no attempts
              to breach security, no unlawful or infringing content, and use
              the pronunciation feature only to record yourself practising.
              Contributions that violate these standards may be removed.
            </P>

            <H3>8. Availability &amp; changes</H3>
            <P>
              Hunukasa is a volunteer community project provided
              &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
              warranties of any kind, express or implied. Features may be
              added, changed or removed over time; offline learning is the
              core and always works without an account.
            </P>

            <H3>9. Limitation of liability</H3>
            <P>
              To the maximum extent permitted by law, the Hunukasa project
              and its maintainers and contributors are not liable for any
              indirect, incidental or consequential damages, or for loss of
              data or streaks, arising from your use of the app. The project
              is provided free of charge, as-is; you are responsible for your
              use of it and for any reliance on its educational content.
            </P>

            <H3>10. Ending your use</H3>
            <P>
              You may stop using Hunukasa at any time. Because your data is
              stored locally, uninstalling the app removes it completely.
              Sections 3, 4 and 9 survive any end of use.
            </P>

            <H3>11. Governing law</H3>
            <P>
              These Terms are governed by the laws of the Republic of Ghana,
              and the courts of Ghana have exclusive jurisdiction over any
              dispute, without affecting mandatory consumer protections in
              your country of residence.
            </P>

            <H3>12. Updates to these Terms</H3>
            <P>
              These Terms may evolve with the project. New versions will be
              posted here with a new effective date and announced in the app
              and in the open repository for material changes; the community
              can discuss them there. Continued use after that means you
              accept the update.
            </P>

            <H3>Questions?</H3>
            <P>
              Email <strong>{CONTACT}</strong> or open an issue on the project
              repository; a maintainer (a learner like you) reads every
              message. Yedaasɛ! Medaase! Akpé! Thank you for learning with us.
            </P>
          </div>
        </article>

        {/* Footer  */}
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 px-2 pb-4">
          <p
            className="text-xs font-bold"
            style={{ color: C.cream, opacity: 0.55 }}
          >
            Hunukasa · Free &amp; open source · Made with pride in Ghana
          </p>
          <nav className="flex gap-3">
            <a
              href="/"
              className="key-3d rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest"
              style={{ background: C.indigo, color: C.cream }}
            >
              ← Open app
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
