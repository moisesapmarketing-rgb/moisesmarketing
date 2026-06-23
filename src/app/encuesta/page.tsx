"use client";

import { useState } from "react";

const CHECKBOXES = [
  "Automatizar tareas de mi negocio",
  "Crear campañas de marketing con IA",
  "Generar contenido y videos",
  "Crear asistentes personalizados",
  "Automatizar WhatsApp y atención al cliente",
  "Analizar documentos y datos",
  "Todo lo anterior",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function EncuestaPage() {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState<string[]>([]);
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const toggleQ3 = (item: string) => {
    setQ3((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1) return;
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mbdvrwzb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fuente: "Encuesta Taller Claude AI – Lima",
          "01_asistir": q1,
          "02_perfil": q2,
          "03_aprender": q3.join(", "),
          "04_inversion": q4,
          "05_ubicacion": q5,
          whatsapp: whatsapp || "(no dejó)",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c8b89a", marginBottom: "24px" }}>
          Encuesta enviada
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#f0ede8",
            marginBottom: "24px",
          }}
        >
          ¡Gracias<br />por tu respuesta!
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6b6b", maxWidth: "400px", lineHeight: 1.7, marginBottom: "48px" }}>
          Tus respuestas me ayudan a diseñar un taller que realmente valga tu tiempo e inversión. Si dejaste tu WhatsApp, te aviso antes que nadie.
        </p>
        <a
          href="/"
          style={{
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c8b89a",
            borderBottom: "1px solid #c8b89a",
            paddingBottom: "2px",
          }}
        >
          Volver al sitio
        </a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100svh", padding: "80px 24px 120px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8b89a", marginBottom: "20px" }}>
            Lima, Perú · 2025
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#f0ede8",
              marginBottom: "20px",
            }}
          >
            Taller de<br />Claude AI en Lima
          </h1>
          <p style={{ fontSize: "16px", color: "#6b6b6b", lineHeight: 1.7 }}>
            Ayúdame respondiendo esta encuesta de 30 segundos.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Q1 */}
          <Question
            number="01"
            label="La más importante"
            question="¿Te interesaría asistir a un taller presencial sobre Claude AI aplicado a negocios?"
          >
            {["Sí, definitivamente", "Tal vez", "No"].map((opt) => (
              <RadioCard key={opt} label={opt} selected={q1 === opt} onClick={() => setQ1(opt)} />
            ))}
          </Question>

          {/* Q2 */}
          <Question number="02" question="¿Cuál te describe mejor?">
            {["Empresario", "Emprendedor", "Profesional independiente", "Marketero", "Estudiante", "Otro"].map((opt) => (
              <RadioCard key={opt} label={opt} selected={q2 === opt} onClick={() => setQ2(opt)} />
            ))}
          </Question>

          {/* Q3 */}
          <Question number="03" question="¿Qué te gustaría aprender?" hint="Selección múltiple">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {CHECKBOXES.map((opt) => (
                <CheckCard key={opt} label={opt} selected={q3.includes(opt)} onClick={() => toggleQ3(opt)} />
              ))}
            </div>
          </Question>

          {/* Q4 */}
          <Question
            number="04"
            label="Probablemente la segunda más importante"
            question="¿Cuánto estarías dispuesto a invertir en un taller presencial de 4–5 horas?"
          >
            {["S/100 – S/200", "S/200 – S/300", "Más de S/300"].map((opt) => (
              <RadioCard key={opt} label={opt} selected={q4 === opt} onClick={() => setQ4(opt)} />
            ))}
          </Question>

          {/* Q5 */}
          <Question number="05" question="¿Dónde te gustaría que se realice?">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {["San Isidro", "Miraflores", "Surco", "San Borja", "Virtual", "Indiferente"].map((opt) => (
                <RadioCard key={opt} label={opt} selected={q5 === opt} onClick={() => setQ5(opt)} />
              ))}
            </div>
          </Question>

          {/* WhatsApp opcional */}
          <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "48px", marginTop: "16px", marginBottom: "48px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4a4a4a", marginBottom: "8px" }}>
              Opcional
            </p>
            <p style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", color: "#f0ede8", marginBottom: "6px" }}>
              Déjame tu WhatsApp si quieres ser de los primeros en enterarte
            </p>
            <p style={{ fontSize: "13px", color: "#4a4a4a", marginBottom: "24px" }}>
              Solo te escribo cuando el taller esté confirmado. Sin spam.
            </p>
            <input
              type="tel"
              placeholder="+51 999 999 999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                borderBottom: "1px solid #2a2a2a",
                padding: "14px 0",
                fontSize: "16px",
                color: "#f0ede8",
                outline: "none",
                fontFamily: "var(--font-geist-sans)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "#c8b89a")}
              onBlur={(e) => (e.target.style.borderBottomColor = "#2a2a2a")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!q1 || status === "sending"}
            style={{
              width: "100%",
              padding: "20px",
              background: q1 ? "#c8b89a" : "#1e1e1e",
              color: q1 ? "#0a0a0a" : "#3a3a3a",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: "2px",
              cursor: q1 ? "pointer" : "default",
              transition: "background 0.2s, color 0.2s",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {status === "sending" ? "Enviando..." : "Enviar respuestas"}
          </button>

          {status === "error" && (
            <p style={{ marginTop: "16px", fontSize: "13px", color: "#ff6b6b", textAlign: "center" }}>
              Algo salió mal. Intenta de nuevo o escríbeme por WhatsApp.
            </p>
          )}

          <p style={{ marginTop: "20px", fontSize: "12px", color: "#3a3a3a", textAlign: "center" }}>
            Solo la pregunta 1 es obligatoria. El resto es opcional.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Question({
  number,
  label,
  question,
  hint,
  children,
}: {
  number: string;
  label?: string;
  question: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "56px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
        <span style={{ fontSize: "11px", color: "#3a3a3a", fontWeight: 600, letterSpacing: "0.08em" }}>
          {number}
        </span>
        {label && (
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8b89a" }}>
            {label}
          </span>
        )}
      </div>
      <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#f0ede8", marginBottom: hint ? "6px" : "24px", lineHeight: 1.3 }}>
        {question}
      </p>
      {hint && (
        <p style={{ fontSize: "12px", color: "#4a4a4a", marginBottom: "20px" }}>{hint}</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {children}
      </div>
    </div>
  );
}

function RadioCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "14px 20px",
        border: selected ? "1px solid #c8b89a" : "1px solid #2a2a2a",
        background: selected ? "rgba(200,184,154,0.08)" : "transparent",
        color: selected ? "#c8b89a" : "#6b6b6b",
        fontSize: "14px",
        fontWeight: selected ? 600 : 400,
        letterSpacing: "0.02em",
        textAlign: "left",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        fontFamily: "var(--font-geist-sans)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#4a4a4a";
          e.currentTarget.style.color = "#a0a0a0";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#2a2a2a";
          e.currentTarget.style.color = "#6b6b6b";
        }
      }}
    >
      <span
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: selected ? "4px solid #c8b89a" : "1px solid #3a3a3a",
          flexShrink: 0,
          transition: "all 0.15s ease",
        }}
      />
      {label}
    </button>
  );
}

function CheckCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "12px 16px",
        border: selected ? "1px solid #c8b89a" : "1px solid #2a2a2a",
        background: selected ? "rgba(200,184,154,0.08)" : "transparent",
        color: selected ? "#c8b89a" : "#6b6b6b",
        fontSize: "13px",
        fontWeight: selected ? 600 : 400,
        letterSpacing: "0.01em",
        textAlign: "left",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        fontFamily: "var(--font-geist-sans)",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "2px",
          border: selected ? "none" : "1px solid #3a3a3a",
          background: selected ? "#c8b89a" : "transparent",
          flexShrink: 0,
          marginTop: "1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s ease",
        }}
      >
        {selected && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}
