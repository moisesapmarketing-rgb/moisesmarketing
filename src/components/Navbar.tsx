"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Videos", href: "#videos" },
  { label: "Automatizaciones", href: "#automatizaciones" },
  { label: "Resultados", href: "#resultados" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, padding 0.4s ease",
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          paddingTop: scrolled ? "14px" : "20px",
          paddingBottom: scrolled ? "14px" : "20px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#f0ede8",
          }}
        >
          Moises<span style={{ color: "#c8b89a" }}>.</span>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "36px",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              style={{
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "#6b6b6b",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#f0ede8")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#6b6b6b")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={(e) => handleAnchor(e, "#contacto")}
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "10px 22px",
            border: "1px solid rgba(200,184,154,0.4)",
            color: "#c8b89a",
            borderRadius: "2px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "#c8b89a";
            el.style.color = "#0a0a0a";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.color = "#c8b89a";
          }}
        >
          Conversemos
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            color: "#f0ede8",
            fontSize: "11px",
            letterSpacing: "0.1em",
          }}
          aria-label="Menú"
        >
          {menuOpen ? "CERRAR" : "MENÚ"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 40px",
          }}
        >
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              style={{
                fontSize: "clamp(32px, 8vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#f0ede8",
                display: "block",
                paddingBottom: "16px",
                borderBottom: "1px solid #1e1e1e",
                marginBottom: "16px",
                opacity: 0,
                animation: `fadeInUp 0.4s ease ${i * 0.08}s forwards`,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleAnchor(e, "#contacto")}
            style={{
              fontSize: "clamp(32px, 8vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#c8b89a",
              display: "block",
              marginTop: "16px",
              opacity: 0,
              animation: `fadeInUp 0.4s ease ${links.length * 0.08}s forwards`,
            }}
          >
            Conversemos
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
