"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 50, suffix: "+", label: "Marcas escaladas" },
  { value: 360, suffix: "°", label: "Ciclo comercial completo" },
  { value: 8, suffix: " años", label: "De experiencia en campo" },
  { value: 3, suffix: "x", label: "Promedio de crecimiento en ventas" },
];

// CASE STUDIES: Replace with your actual client cases
const cases = [
  {
    label: "E-commerce — Moda",
    result: "Incremento del 280% en ventas en 6 meses",
    detail:
      "Reestructuramos el ciclo completo: desde el posicionamiento de marca hasta el proceso de cierre y retención con automatizaciones.",
  },
  {
    label: "Servicios profesionales — Consultoría",
    result: "+120 leads calificados por mes con sistema automatizado",
    detail:
      "Implementamos un funnel de captación con IA que califica leads 24/7 y los entrega al equipo comercial listos para cerrar.",
  },
  {
    label: "Retail — Distribución local",
    result: "Proceso de ventas reducido de 21 a 6 días",
    detail:
      "Rediseñamos el ciclo comercial completo y automatizamos el seguimiento, eliminando los cuellos de botella en la gestión de clientes.",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        if (started.current) return;
        started.current = true;
        const duration = 1800;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    });

    return () => st.kill();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".results-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".results-header",
          start: "top 80%",
        },
      });

      gsap.from(".case-card", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cases-grid",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resultados"
      style={{
        background: "#0d0d0d",
        padding: "160px 40px",
        borderTop: "1px solid #1e1e1e",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div className="results-header" style={{ marginBottom: "100px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6b6b",
              marginBottom: "20px",
            }}
          >
            Resultados
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#f0ede8",
            }}
          >
            Los números
            <br />
            no mienten.
          </h2>
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            borderTop: "1px solid #1e1e1e",
            marginBottom: "120px",
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: "48px 32px",
                borderRight: i < metrics.length - 1 ? "1px solid #1e1e1e" : "none",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#f0ede8",
                  lineHeight: 1,
                  marginBottom: "12px",
                }}
              >
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b6b6b",
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Case studies */}
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6b6b",
              marginBottom: "40px",
            }}
          >
            Casos de éxito
          </p>

          <div
            className="cases-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {cases.map((c, i) => (
              <div
                key={i}
                className="case-card"
                style={{
                  padding: "40px",
                  border: "1px solid #1e1e1e",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#4a4a4a",
                  }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#c8b89a",
                    lineHeight: 1.2,
                    flex: 1,
                  }}
                >
                  {c.result}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b6b6b",
                    lineHeight: 1.7,
                    borderTop: "1px solid #1e1e1e",
                    paddingTop: "20px",
                  }}
                >
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
