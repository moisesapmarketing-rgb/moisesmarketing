"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Marca & Estrategia",
    description:
      "Construimos desde quién eres hasta cómo te percibe tu mercado. Posicionamiento, propuesta de valor y narrativa de marca que genera atracción antes de vender.",
    deliverables: [
      "Diagnóstico de marca",
      "Propuesta de valor única",
      "Posicionamiento en mercado",
      "Manual de narrativa",
    ],
  },
  {
    number: "02",
    title: "Marketing & Captación",
    description:
      "Campañas de publicidad digital, contenido estratégico y SEO diseñados para atraer clientes que ya quieren lo que ofreces. Meta Ads, Google y orgánico.",
    deliverables: [
      "Estrategia de contenido",
      "Meta Ads y Google Ads",
      "Funnel de captación",
      "Optimización continua",
    ],
  },
  {
    number: "03",
    title: "Ventas & Conversión",
    description:
      "El marketing lleva personas a tu puerta. El proceso comercial las convierte en clientes. Diseñamos y optimizamos tu ciclo de ventas completo.",
    deliverables: [
      "Proceso de ventas",
      "Scripts y objeciones",
      "CRM y seguimiento",
      "Tasas de conversión",
    ],
  },
  {
    number: "04",
    title: "Automatización con IA",
    description:
      "Automatizaciones propias para que tu negocio trabaje mientras no estás. Desde respuestas automáticas hasta sistemas de seguimiento inteligente con IA.",
    deliverables: [
      "Automatizaciones personalizadas",
      "Integración de IA",
      "Workflows automáticos",
      "Reportes en tiempo real",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 80%",
        },
      });

      gsap.from(".service-row", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      style={{
        background: "#0a0a0a",
        padding: "160px 40px",
        borderTop: "1px solid #1e1e1e",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="services-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "80px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b6b6b",
                marginBottom: "20px",
              }}
            >
              El ciclo completo
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
              Cada etapa
              <br />
              cubierta.
            </h2>
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "#6b6b6b",
              maxWidth: "340px",
              lineHeight: 1.7,
            }}
          >
            No contratas un área de tu negocio. Construyes el sistema completo
            que lleva un extraño a convertirse en cliente fiel.
          </p>
        </div>

        {/* Services list */}
        <div className="services-list">
          {services.map((service, i) => (
            <div
              key={service.number}
              className="service-row"
              onClick={() => setActive(active === i ? null : i)}
              data-cursor-expand
              style={{
                borderTop: "1px solid #1e1e1e",
                paddingTop: "32px",
                paddingBottom: active === i ? "0" : "32px",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderTopColor = "#c8b89a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderTopColor = "#1e1e1e";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#3a3a3a",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      minWidth: "28px",
                    }}
                  >
                    {service.number}
                  </span>
                  <h3
                    style={{
                      fontSize: "clamp(22px, 3vw, 40px)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "#f0ede8",
                      transition: "color 0.2s",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                <span
                  style={{
                    fontSize: "22px",
                    color: "#3a3a3a",
                    transform: active === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease, color 0.2s",
                    flexShrink: 0,
                    color: active === i ? "#c8b89a" : "#3a3a3a",
                  }}
                >
                  +
                </span>
              </div>

              {/* Expanded content */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: active === i ? "400px" : "0",
                  transition: "max-height 0.5s ease",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    padding: "40px 0 40px 60px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#8a8a8a",
                      lineHeight: 1.75,
                    }}
                  >
                    {service.description}
                  </p>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#4a4a4a",
                        marginBottom: "16px",
                      }}
                    >
                      Incluye
                    </p>
                    <ul style={{ listStyle: "none" }}>
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          style={{
                            fontSize: "14px",
                            color: "#8a8a8a",
                            paddingBottom: "10px",
                            borderBottom: "1px solid #1e1e1e",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: "#c8b89a",
                              flexShrink: 0,
                            }}
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Last border */}
          <div style={{ borderTop: "1px solid #1e1e1e" }} />
        </div>
      </div>
    </section>
  );
}
