import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import CrtOverlay from "@/components/CrtOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://linktree-cavalcante.vercel.app";

export const metadata: Metadata = {
  title: "Lucas Cavalcante — Analista de Dados & IA",
  description:
    "Analista de Dados | IA & Machine Learning | Visão Computacional — LinkTree Cavalcante",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Lucas Cavalcante — Analista de Dados & IA",
    description:
      "Analista de Dados especializado em IA, automação e marketing digital. Acesse meus links.",
    url: BASE_URL,
    siteName: "LinkTree Cavalcante",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lucas Cavalcante — Analista de Dados & IA",
    description:
      "Analista de Dados especializado em IA, automação e marketing digital. Acesse meus links.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-dvh flex flex-col bg-slate-900 text-slate-50">
        <CrtOverlay />
        {children}
        <Footer />
      </body>
    </html>
  );
}
