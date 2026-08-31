import type { Metadata } from "next";
import AnalizadorApifyContent from "./AnalizadorApifyContent";

export const metadata: Metadata = {
  title: "Cómo conectar Apify con Claude AI | Moises Mejias",
  description:
    "Guía práctica para conectar Apify con Claude AI y extraer datos de cualquier sitio web sin programar. Más de 1,500 scrapers listos para usar.",
  openGraph: {
    title: "Cómo conectar Apify con Claude AI | Moises Mejias",
    description:
      "Guía práctica para conectar Apify con Claude AI y extraer datos de cualquier sitio web sin programar.",
    url: "https://moisesmejias.com/analizador-apify",
    siteName: "Moises Marketing",
    locale: "es_ES",
    type: "website",
  },
};

export default function AnalizadorApifyPage() {
  return <AnalizadorApifyContent />;
}
