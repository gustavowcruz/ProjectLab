import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clair Obscur: Expedition 33 — ProjectLab",
  description:
    "Avaliações, notas e reviews de Clair Obscur: Expedition 33, o RPG por turnos da Sandfall Interactive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
