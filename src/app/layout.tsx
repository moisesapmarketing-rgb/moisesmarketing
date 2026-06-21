import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Moises Mejias — Estrategia Comercial & Marketing con IA",
  description:
    "Consultor especializado en el ciclo comercial completo. Estrategia, marketing digital, ventas y automatización con inteligencia artificial. 50+ marcas escaladas.",
  keywords: [
    "consultor marketing digital",
    "marketing con IA",
    "estrategia comercial",
    "automatizaciones IA",
    "Moises Mejias",
    "moisesmarketing",
  ],
  openGraph: {
    title: "Moises Mejias — Estrategia Comercial & Marketing con IA",
    description:
      "El ciclo comercial completo. No solo redes. No solo ventas. Todo.",
    url: "https://moisesmarketing.com",
    siteName: "Moises Marketing",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
