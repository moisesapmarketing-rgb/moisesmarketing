"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// VIDEO CONTENT: Update titles and durations to match your real videos
const videos = [
  {
    id: "YOgaW4ks81A",
    title: "Cómo estructurar el ciclo comercial de tu negocio",
    category: "Podcast",
    duration: "",
    isShort: false,
  },
  {
    id: "JSxHGVT1F9Y",
    title: "Estrategia comercial en menos de 60 segundos",
    category: "Short",
    duration: "",
    isShort: true,
  },
  {
    id: "tcgRLZt8VH0",
    title: "El error que cometen la mayoría de negocios",
    category: "Short",
    duration: "",
    isShort: true,
  },
];

export default function VideoHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-header",
          start: "top 80%",
        },
      });

      gsap.from(".video-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-grid",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = videos[0];
  const secondary = videos.slice(1);

  return (
    <section
      ref={sectionRef}
      id="videos"
      style={{
        background: "transparent",
        padding: "160px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="video-header"
          style={{
            marginBottom: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
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
              Podcast & Shorts
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
              Aprende
              <br />
              en video.
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@MoisesMarketing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#c8b89a",
              borderBottom: "1px solid #c8b89a",
              paddingBottom: "2px",
            }}
          >
            Ver canal completo
          </a>
        </div>

        {/* Featured video (large, 16:9) */}
        <div
          className="video-card"
          style={{
            marginBottom: "16px",
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: "2px",
            background: "#161616",
          }}
        >
          {playing === "featured" ? (
            <iframe
              src={`https://www.youtube.com/embed/${featured.id}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
              title={featured.title}
            />
          ) : (
            <button
              onClick={() => setPlaying("featured")}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                background: "none",
                border: "none",
                cursor: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "40px",
              }}
              data-cursor-expand
              aria-label={`Reproducir: ${featured.title}`}
            >
              {/* Real YouTube thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
                alt={featured.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Dark overlay for legibility */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.1) 100%)",
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
                  background: "rgba(10,10,10,0.3)",
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

              {/* Meta */}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#c8b89a",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  {featured.category}
                  {featured.duration ? ` — ${featured.duration}` : ""}
                </span>
                <p
                  style={{
                    fontSize: "clamp(18px, 2.4vw, 28px)",
                    fontWeight: 700,
                    color: "#f0ede8",
                    letterSpacing: "-0.02em",
                    textAlign: "left",
                  }}
                >
                  {featured.title}
                </p>
              </div>
            </button>
          )}
        </div>

        {/* Secondary videos — Shorts in portrait */}
        <div
          className="video-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${secondary.length}, 1fr)`,
            gap: "16px",
          }}
        >
          {secondary.map((video) => (
            <div
              key={video.id}
              className="video-card"
              style={{
                position: "relative",
                height: video.isShort ? "480px" : undefined,
                aspectRatio: video.isShort ? undefined : "16/9",
                overflow: "hidden",
                borderRadius: "2px",
                background: "#161616",
              }}
            >
              {playing === video.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title={video.title}
                />
              ) : (
                <button
                  onClick={() => setPlaying(video.id)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    background: "none",
                    border: "none",
                    cursor: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "20px",
                  }}
                  data-cursor-expand
                  aria-label={`Reproducir: ${video.title}`}
                >
                  {/* Real YouTube thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)",
                    }}
                  />

                  {/* Play button */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "48px",
                      height: "48px",
                      border: "1px solid rgba(200,184,154,0.5)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                      background: "rgba(10,10,10,0.3)",
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                        borderLeft: "11px solid #c8b89a",
                        marginLeft: "3px",
                      }}
                    />
                  </div>

                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#c8b89a",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {video.category}
                    </span>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#f0ede8",
                        letterSpacing: "-0.01em",
                        textAlign: "left",
                        lineHeight: 1.3,
                      }}
                    >
                      {video.title}
                    </p>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
