"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      const eyebrow = el.querySelector<HTMLElement>(".hero-eyebrow");
      if (eyebrow) eyebrow.style.transform = `translateY(${y * 0.12}px)`;
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 0.45,
        }}
      >
        <source src="/conf-utp.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — darker at top and bottom for text legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid on top of video */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,184,154,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,184,154,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Live badge — top right */}
      <div
        style={{
          position: "absolute",
          top: "32px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          animation: "fadeUp 0.6s ease 1.2s both",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#c8b89a",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6b6b6b",
          }}
        >
          Conferencia UTP — Lima, Perú
        </span>
      </div>

      {/* Content — bottom left */}
      <div
        style={{
          position: "relative",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
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
            fontSize: "clamp(52px, 9vw, 130px)",
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

        {/* Sub + Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "32px",
            animation: "fadeUp 0.7s ease 0.72s both",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "#a8a8a8",
              maxWidth: "480px",
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            Estrategia comercial, marketing digital e inteligencia artificial
            integrados en un solo proceso. Desde la marca hasta el cliente que
            regresa.
          </p>

          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {[
              { value: "50+", label: "Marcas escaladas" },
              { value: "360°", label: "Ciclo comercial" },
              { value: "IA", label: "En cada proceso" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: "clamp(36px, 4vw, 52px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "#f0ede8",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9a9a9a",
                    letterSpacing: "0.08em",
                    marginTop: "8px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
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
            background: "rgba(255,255,255,0.08)",
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
