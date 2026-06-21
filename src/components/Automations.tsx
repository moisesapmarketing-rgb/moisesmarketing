"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    problem: "Pierdes leads porque no puedes responder a tiempo",
    solution: "Sistema de respuesta automática con IA que califica y responde en segundos, las 24 horas.",
  },
  {
    problem: "Seguimiento manual de clientes que se pierde en el caos",
    solution: "CRM automatizado que gestiona tu pipeline comercial y te avisa cuándo actuar.",
  },
  {
    problem: "Reportes de campaña que toman horas por semana",
    solution: "Dashboards automáticos con métricas clave enviados a tu WhatsApp o email.",
  },
  {
    problem: "Contenido que consume tiempo sin escalar",
    solution: "Flujos de creación de contenido con IA que generan borradores listos para publicar.",
  },
];

export default function Automations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auto-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".auto-header",
          start: "top 80%",
        },
      });

      gsap.from(".problem-row", {
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".problems-grid",
          start: "top 75%",
        },
      });

      gsap.from(".auto-cta", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".auto-cta",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="automatizaciones"
      style={{
        background: "#0a0a0a",
        padding: "160px 40px",
        borderTop: "1px solid #1e1e1e",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="auto-header"
          style={{ marginBottom: "80px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6b6b",
              marginBottom: "20px",
            }}
          >
            Automatizaciones con IA
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#f0ede8",
              }}
            >
              Tu negocio
              <br />
              trabaja solo.
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#6b6b6b",
                maxWidth: "380px",
                lineHeight: 1.7,
              }}
            >
              Identifico los procesos que más tiempo te consumen y los
              automatizo con IA. Sistemas hechos para tu negocio, no plantillas
              genéricas.
            </p>
          </div>
        </div>

        {/* Problems & solutions grid */}
        <div className="problems-grid" style={{ marginBottom: "80px" }}>
          {problems.map((item, i) => (
            <div
              key={i}
              className="problem-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                padding: "40px 0",
                borderTop: "1px solid #1e1e1e",
                alignItems: "center",
              }}
            >
              {/* Problem */}
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#3a3a3a",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    minWidth: "28px",
                    paddingTop: "2px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#4a4a4a",
                      marginBottom: "12px",
                    }}
                  >
                    El problema
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      color: "#8a8a8a",
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    {item.problem}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#c8b89a",
                    marginBottom: "12px",
                  }}
                >
                  La automatización
                </p>
                <p
                  style={{
                    fontSize: "clamp(16px, 1.6vw, 20px)",
                    color: "#f0ede8",
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1e1e1e" }} />
        </div>

        {/* CTA banner */}
        <div
          className="auto-cta"
          style={{
            padding: "56px",
            border: "1px solid #1e1e1e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "clamp(22px, 2.8vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#f0ede8",
                marginBottom: "8px",
              }}
            >
              ¿Tienes un proceso que quieres automatizar?
            </p>
            <p style={{ fontSize: "15px", color: "#6b6b6b" }}>
              Cuéntame el problema. Te digo si tiene solución con IA.
            </p>
          </div>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 36px",
              background: "#c8b89a",
              color: "#0a0a0a",
              borderRadius: "2px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            data-cursor-expand
          >
            Hablemos
          </a>
        </div>
      </div>
    </section>
  );
}
