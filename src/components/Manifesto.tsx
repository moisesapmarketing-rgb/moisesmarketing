"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "La mayoría de los consultores",
  "trabajan solo una parte",
  "de tu negocio.",
  "Yo trabajo todo el ciclo:",
  "la marca que atrae,",
  "el marketing que convierte,",
  "las ventas que cierran",
  "y la IA que escala.",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line");

      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { color: "#2a2a2a" },
          {
            color: "#f0ede8",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });

      // Photo reveal
      gsap.from(".manifesto-photo", {
        scale: 1.08,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-photo",
          start: "top 75%",
        },
      });

      gsap.from(".manifesto-tag", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-tags",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      style={{
        background: "#0a0a0a",
        padding: "160px 40px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Text column */}
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6b6b",
              marginBottom: "56px",
            }}
          >
            Sobre Moises
          </p>

          <div style={{ marginBottom: "64px" }}>
            {words.map((line, i) => (
              <p
                key={i}
                className="manifesto-line"
                style={{
                  fontSize: "clamp(24px, 3.2vw, 42px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "#2a2a2a",
                  transition: "color 0.1s",
                  marginBottom: "4px",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <p
            style={{
              fontSize: "15px",
              color: "#6b6b6b",
              lineHeight: 1.75,
              maxWidth: "440px",
              marginBottom: "40px",
            }}
          >
            Con más de 50 marcas escaladas y una especialización profunda en
            gestión comercial, entiendo cómo funciona un negocio desde adentro.
            No solo su marketing.
          </p>

          {/* Tags */}
          <div
            className="manifesto-tags"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
          >
            {[
              "Estrategia Comercial",
              "Marketing Digital",
              "Gestión de Ventas",
              "Automatización con IA",
              "Marca Personal",
              "Meta Ads",
            ].map((tag) => (
              <span
                key={tag}
                className="manifesto-tag"
                style={{
                  fontSize: "11px",
                  padding: "6px 14px",
                  border: "1px solid #2a2a2a",
                  color: "#6b6b6b",
                  borderRadius: "2px",
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Photo column */}
        <div
          className="manifesto-photo"
          style={{
            position: "relative",
            aspectRatio: "3/4",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          <Image
            src="/moises.png"
            alt="Moises Mejias"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />

          {/* Overlay label */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
              right: "24px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#c8b89a",
                background: "rgba(10,10,10,0.85)",
                display: "inline-block",
                padding: "6px 12px",
                backdropFilter: "blur(8px)",
              }}
            >
              Moises Mejias — 50+ marcas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
