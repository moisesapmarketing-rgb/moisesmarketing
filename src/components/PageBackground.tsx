"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sección ID → color de fondo
const COLORS: Record<string, string> = {
  inicio:           "#0a0a0a",  // Hero → negro
  "sobre-mi":       "#f2efe9",  // Manifesto → blanco
  servicios:        "#0B3068",  // Services → azul
  videos:           "#0a0a0a",  // VideoHub → negro
  automatizaciones: "#f2efe9",  // Automations → blanco
  resultados:       "#0B3068",  // Results → azul
  contacto:         "#0a0a0a",  // Contact → negro
};

export default function PageBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const triggers: ScrollTrigger[] = [];

    Object.entries(COLORS).forEach(([id, color]) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          onEnter: () =>
            gsap.to(bg, { backgroundColor: color, duration: 0.85, ease: "power2.inOut" }),
          onEnterBack: () =>
            gsap.to(bg, { backgroundColor: color, duration: 0.85, ease: "power2.inOut" }),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundColor: "#0a0a0a",
      }}
    />
  );
}
