"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 80%",
        },
      });

      gsap.from(".contact-form", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("https://formspree.io/f/mbdvrwzb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: form.name,
          email: form.email,
          empresa: form.company,
          interes: form.interest,
          mensaje: form.message,
        }),
      });
      setFormState(res.ok ? "sent" : "error");
    } catch {
      setFormState("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "none",
    border: "none",
    borderBottom: "1px solid #2a2a2a",
    padding: "16px 0",
    fontSize: "15px",
    color: "#f0ede8",
    outline: "none",
    fontFamily: "var(--font-geist-sans)",
    cursor: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#4a4a4a",
    display: "block",
    marginBottom: "0",
    paddingTop: "32px",
  };

  const interests = [
    "Estrategia Comercial",
    "Marketing Digital",
    "Automatizaciones con IA",
    "Marca Personal",
    "Todo el ciclo",
  ];

  return (
    <section
      ref={sectionRef}
      id="contacto"
      style={{
        background: "transparent",
        padding: "160px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "120px",
            alignItems: "flex-start",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left: Copy */}
          <div className="contact-header">
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b6b6b",
                marginBottom: "32px",
              }}
            >
              Conversemos
            </p>
            <h2
              style={{
                fontSize: "clamp(40px, 5.5vw, 80px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.93,
                color: "#f0ede8",
                marginBottom: "48px",
              }}
            >
              ¿Listo para trabajar el ciclo completo?
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6b6b6b",
                lineHeight: 1.75,
                maxWidth: "400px",
                marginBottom: "56px",
              }}
            >
              Cuéntame dónde está tu negocio hoy y dónde quieres llegar.
              Evaluamos juntos qué parte del ciclo necesita más atención.
            </p>

            {/* Contact details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#4a4a4a",
                    marginBottom: "6px",
                  }}
                >
                  Redes
                </p>
                <div style={{ display: "flex", gap: "20px" }}>
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/soymoisesmkt/" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/mois%C3%A9s-mej%C3%ADas-b246b41b2/" },
                    { label: "YouTube", href: "https://www.youtube.com/@MoisesMarketing" },
                  ].map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        color: "#6b6b6b",
                        letterSpacing: "0.06em",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c8b89a")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b6b6b")}
                    >
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form">
            {formState === "sent" ? (
              <div
                style={{
                  padding: "80px 0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "#c8b89a",
                    marginBottom: "16px",
                  }}
                >
                  Mensaje recibido.
                </p>
                <p style={{ fontSize: "16px", color: "#6b6b6b" }}>
                  Te contacto en menos de 24 horas.
                </p>
              </div>
            ) : formState === "error" ? (
              <div style={{ padding: "80px 0", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#f0ede8",
                    marginBottom: "16px",
                  }}
                >
                  Algo salió mal.
                </p>
                <p style={{ fontSize: "15px", color: "#6b6b6b", marginBottom: "32px" }}>
                  Escríbeme directamente a través de Instagram o LinkedIn.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#c8b89a",
                    background: "none",
                    border: "1px solid #c8b89a",
                    padding: "12px 24px",
                    cursor: "none",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 32px",
                  }}
                >
                  <div>
                    <label htmlFor="name" style={labelStyle}>
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderBottomColor =
                          "#c8b89a")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderBottomColor =
                          "#2a2a2a")
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderBottomColor =
                          "#c8b89a")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderBottomColor =
                          "#2a2a2a")
                      }
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" style={labelStyle}>
                    Empresa / Negocio
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Nombre de tu empresa"
                    value={form.company}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderBottomColor =
                        "#c8b89a")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderBottomColor =
                        "#2a2a2a")
                    }
                  />
                </div>

                <div>
                  <label htmlFor="interest" style={labelStyle}>
                    Me interesa
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                    }}
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderBottomColor =
                        "#c8b89a")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderBottomColor =
                        "#2a2a2a")
                    }
                  >
                    <option value="" style={{ background: "#0a0a0a" }}>
                      Selecciona un servicio
                    </option>
                    {interests.map((i) => (
                      <option
                        key={i}
                        value={i}
                        style={{ background: "#0a0a0a" }}
                      >
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>
                    Cuéntame tu situación
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="¿Cuál es el reto más grande de tu negocio hoy?"
                    value={form.message}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      resize: "none",
                      paddingTop: "20px",
                    }}
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderBottomColor =
                        "#c8b89a")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderBottomColor =
                        "#2a2a2a")
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  data-cursor-expand
                  style={{
                    marginTop: "48px",
                    width: "100%",
                    padding: "20px",
                    background: formState === "sending" ? "#1e1e1e" : "#c8b89a",
                    color: "#0a0a0a",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: formState === "sending" ? "default" : "none",
                    borderRadius: "2px",
                    transition: "background 0.2s",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  {formState === "sending" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
