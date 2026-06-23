"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Videos", href: "#videos" },
    { label: "Automatizaciones", href: "#automatizaciones" },
    { label: "Resultados", href: "#resultados" },
    { label: "Contacto", href: "#contacto" },
  ];

  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/soymoisesmkt/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mois%C3%A9s-mej%C3%ADas-b246b41b2/" },
    { label: "YouTube", href: "https://www.youtube.com/@MoisesMarketing" },
  ];

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 40px 40px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "48px",
            marginBottom: "80px",
          }}
        >
          {/* Logo & description */}
          <div style={{ maxWidth: "320px" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#f0ede8",
                marginBottom: "16px",
              }}
            >
              Moises<span style={{ color: "#c8b89a" }}>.</span>
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#4a4a4a",
                lineHeight: 1.75,
              }}
            >
              Estrategia comercial, marketing digital e inteligencia artificial.
              El ciclo completo de tu negocio.
            </p>
          </div>

          {/* Nav links */}
          <div
            style={{
              display: "flex",
              gap: "56px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#3a3a3a",
                  marginBottom: "20px",
                }}
              >
                Navegación
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    style={{
                      fontSize: "13px",
                      color: "#6b6b6b",
                      letterSpacing: "0.02em",
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
            </div>

            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#3a3a3a",
                  marginBottom: "20px",
                }}
              >
                Redes
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "13px",
                      color: "#6b6b6b",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#f0ede8")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "#6b6b6b")
                    }
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            paddingTop: "32px",
            borderTop: "1px solid #1e1e1e",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#3a3a3a",
              letterSpacing: "0.04em",
            }}
          >
            © {year} Moises Mejias. moisesmarketing.com
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "#2a2a2a",
              letterSpacing: "0.04em",
            }}
          >
            Hecho con intención.
          </p>
        </div>
      </div>
    </footer>
  );
}
