import type { Metadata } from "next";
import TallerContent from "./TallerContent";

export const metadata: Metadata = {
  title: "Taller Claude AI — Lima | Moises Mejias",
  description:
    "El primer taller presencial de Claude AI en Lima. Para emprendedores y marketeros, con casos reales y cupos limitados a los primeros 30 inscritos.",
  openGraph: {
    title: "Taller Claude AI — Lima | Moises Mejias",
    description:
      "El primer taller presencial de Claude AI en Lima. Para emprendedores y marketeros, con casos reales y cupos limitados a los primeros 30 inscritos.",
    url: "https://moisesmejias.com/taller",
    siteName: "Moises Marketing",
    locale: "es_ES",
    type: "website",
  },
};

export default function TallerPage() {
  return <TallerContent />;
}
