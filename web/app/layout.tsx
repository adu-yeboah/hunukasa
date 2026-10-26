import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const nunito = localFont({
  src: [
    { path: "./fonts/Nunito_400Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Nunito_600SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Nunito_700Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Nunito_800ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/Nunito_900Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hunukasa · Understand Language",
  description:
    "Learn Asante Twi with gamified, culturally grounded lessons. Free and open-source, offline-first, no ads, no account.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-nunito), ui-rounded, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
