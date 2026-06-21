"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const FEATURED_VIDEO_ID = "YOgaW4ks81A";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Scroll indicator only — CSS handles the intro animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      const eyebrow = el.querySelector<HTMLElement>(".hero-eyebrow");
      if (eyebrow) eyebrow.style.transform = `translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="inicio"
      style={{
        minHeight: "100svh",
        background: "#0a0a0a",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "flex-end",
        padding: "120px 40px 64px",
        position: "relative",
        overflow: "hidden",
        gap: "80px",
      }}
    >
      {/* Subtle background grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,184,154,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,184,154,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* LEFT: Headline block */}
      <div style={{ position: "relative" }}>
        <p
          className="hero-eyebrow"
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6b6b6b",
            marginBottom: "32px",
            animation: "fadeUp 0.7s ease 0.1s both",
          }}
        >
          Moises Mejias — Consultor Comercial & Marketing
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 6.5vw, 100px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#f0ede8",
            marginBottom: "52px",
            overflow: "hidden",
          }}
        >
          {[
            { text: "No solo redes.", delay: "0.2s", accent: false },
            { text: "No solo ventas.", delay: "0.36s", accent: false },
            { text: "Todo el ciclo.", delay: "0.52s", accent: true },
          ].map(({ text, delay, accent }) => (
            <span
              key={text}
              style={{ display: "block", overflow: "hidden", lineHeight: 1.05 }}
            >
              <span
                style={{
                  display: "block",
                  color: accent ? "#c8b89a" : "#f0ede8",
                  animation: `slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay} both`,
                }}
              >
                {text}
              </span>
            </span>
          ))}
        </h1>

        {/* Sub + Stats */}
        <div
          style={{
            borderTop: "1px solid #1e1e1e",
            paddingTop: "32px",
            animation: "fadeUp 0.7s ease 0.72s both",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 1.4vw, 16px)",
              color: "#6b6b6b",
              maxWidth: "440px",
              lineHeight: 1.65,
              fontWeight: 400,
              marginBottom: "40px",
            }}
          >
            Estrategia comercial, marketing digital e inteligencia artificial
            integrados en un solo proceso. Desde la marca hasta el cliente que
            regresa.
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { value: "50+", label: "Marcas escaladas" },
              { value: "360°", label: "Ciclo comercial" },
              { value: "IA", label: "En cada proceso" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: "clamp(24px, 3vw, 40px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "#f0ede8",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: "11px", color: "#6b6b6b", letterSpacing: "0.06em", marginTop: "6px" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Featured video */}
      <div
        style={{
          position: "relative",
          animation: "fadeUp 0.9s ease 0.6s both",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: "2px",
            background: "#111",
          }}
        >
          {videoPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Podcast Moises Mejias"
            />
          ) : (
            <button
              onClick={() => setVideoPlaying(true)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Reproducir podcast"
            >
              <img
                src={`https://img.youtube.com/vi/${FEATURED_VIDEO_ID}/maxresdefault.jpg`}
                alt="Podcast Moises Mejias"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.15) 60%, transparent 100%)",
                }}
              />
              {/* Play button */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "72px",
                  height: "72px",
                  border: "1px solid rgba(200,184,154,0.6)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                  background: "rgba(10,10,10,0.4)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "16px solid #c8b89a",
                    marginLeft: "4px",
                  }}
                />
              </div>
              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  right: "24px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#c8b89a",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Podcast
                </span>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 18px)",
                    fontWeight: 700,
                    color: "#f0ede8",
                    letterSpacing: "-0.02em",
                    textAlign: "left",
                    lineHeight: 1.3,
                  }}
                >
                  Cómo estructurar el ciclo comercial de tu negocio
                </p>
              </div>
            </button>
          )}
        </div>
        {/* Sub-label below video */}
        <p
          style={{
            fontSize: "11px",
            color: "#3a3a3a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: "16px",
            textAlign: "right",
          }}
        >
          Ver todos los videos en YouTube
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "fadeUp 0.6s ease 1.1s both",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3a3a3a",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "56px",
            background: "#1e1e1e",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: "#c8b89a",
              animation: "scrollLine 2.2s ease-in-out 1.4s infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(108%); }
          to   { transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
