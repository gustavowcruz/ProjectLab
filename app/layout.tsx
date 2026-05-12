import type { Metadata } from "next";
import "./globals.css";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clair Obscur: Expedition 33 — Gamelog",
  description:
    "Avaliações, notas e reviews de Clair Obscur: Expedition 33, o RPG por turnos da Sandfall Interactive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${oswald.className}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
