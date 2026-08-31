"use client";

import { useEffect, useState } from "react";

const STYLES = `
  .apify-root{
    --bg:#0F172A;
    --bg-alt:#1B2E45;
    --blue:#1D4ED8;
    --blue-hover:#2563EB;
    --blue-light:#60A5FA;
    --text:#F8FAFC;
    --text-secondary:#94A3B8;
    --text-muted:#475569;
    --border:#1E3A5F;
    --green:#22C55E;
    --code-bg:#060D1A;

    font-family:'Inter',sans-serif;
    background-color:var(--bg);
    background-image:radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px);
    background-size:28px 28px;
    color:var(--text);
    font-size:16px;
    font-weight:400;
    line-height:1.7;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  .apify-root *,.apify-root *::before,.apify-root *::after{box-sizing:border-box;}
  .apify-root{scroll-behavior:smooth;}
  .apify-root a{text-decoration:none;color:inherit;}
  .apify-root ul{list-style:none;margin:0;padding:0;}
  .apify-root button{font-family:inherit;cursor:pointer;border:none;background:none;}

  @media (min-width:768px){ .apify-root{font-size:18px;} }

  .apify-root h1,.apify-root h2,.apify-root h3,.apify-root h4{color:var(--text);margin:0;}
  .apify-root h1{font-size:40px;font-weight:900;line-height:1.05;letter-spacing:-0.02em;}
  .apify-root h2{font-size:30px;font-weight:800;line-height:1.15;}
  .apify-root h3{font-size:19px;font-weight:700;line-height:1.3;}
  @media (min-width:768px){
    .apify-root h1{font-size:68px;}
    .apify-root h2{font-size:44px;}
    .apify-root h3{font-size:22px;}
  }

  .apify-root p{font-size:16px;line-height:1.7;margin:0;}
  @media (min-width:768px){ .apify-root p{font-size:18px;} }

  .apify-root .container{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;}
  .apify-root .section{padding:80px 0;}
  @media (min-width:768px){ .apify-root .section{padding:120px 0;} }
  .apify-root .section-alt{background:var(--bg-alt);}

  .apify-root .label{
    display:block;font-size:12px;font-weight:600;letter-spacing:0.08em;
    text-transform:uppercase;color:var(--blue-light);margin-bottom:16px;
  }
  .apify-root .section-header{max-width:720px;margin:0 auto 56px;text-align:center;}
  .apify-root .section-header p{color:var(--text-secondary);margin-top:20px;}

  .apify-root .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease;}
  .apify-root .reveal.visible{opacity:1;transform:translateY(0);}
  .apify-root .grid-3 .reveal:nth-child(2){transition-delay:0.1s;}
  .apify-root .grid-3 .reveal:nth-child(3){transition-delay:0.2s;}
  .apify-root .grid-6 .reveal:nth-child(2){transition-delay:0.08s;}
  .apify-root .grid-6 .reveal:nth-child(3){transition-delay:0.16s;}
  .apify-root .grid-6 .reveal:nth-child(4){transition-delay:0.08s;}
  .apify-root .grid-6 .reveal:nth-child(5){transition-delay:0.16s;}
  .apify-root .grid-6 .reveal:nth-child(6){transition-delay:0.24s;}

  .apify-root .btn-primary{
    display:inline-flex;align-items:center;justify-content:center;
    background:var(--blue);color:#fff;padding:16px 36px;border-radius:8px;
    font-size:17px;font-weight:700;transition:background 0.2s ease,transform 0.2s ease;
  }
  .apify-root .btn-primary:hover{background:var(--blue-hover);}

  .apify-root .btn-nav{padding:10px 20px;font-size:13px;}
  @media (min-width:768px){ .apify-root .btn-nav{padding:12px 28px;font-size:15px;} }

  .apify-root .badge{
    display:inline-flex;align-items:center;gap:8px;background:rgba(29,78,216,0.15);
    color:var(--blue-light);border:1px solid rgba(29,78,216,0.3);padding:6px 14px;
    border-radius:999px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
  }

  .apify-root .card{
    background:var(--bg-alt);border:1px solid var(--border);border-radius:16px;padding:32px;
    transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease;
  }
  .apify-root .card:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(0,0,0,0.3);border-color:var(--blue-hover);}
  .apify-root .card h3{margin-bottom:12px;}
  .apify-root .card p{color:var(--text-secondary);}

  .apify-root .divider{border-top:1px solid var(--border);width:100%;}

  .apify-root .navbar{
    position:sticky;top:0;z-index:100;background:rgba(15,23,42,0.9);
    backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    border-bottom:1px solid var(--border);transition:box-shadow 0.2s ease;
  }
  .apify-root .navbar.scrolled{box-shadow:0 4px 24px rgba(0,0,0,0.25);}
  .apify-root .nav-container{height:68px;display:flex;align-items:center;justify-content:space-between;}
  .apify-root .logo{font-weight:800;font-size:20px;color:var(--text);}
  .apify-root .logo-img{height:26px;width:auto;display:block;}

  .apify-root .hero{padding:100px 0 80px;text-align:center;}
  @media (min-width:768px){ .apify-root .hero{padding:160px 0 120px;} }
  @keyframes apifyFadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
  .apify-root .hero-anim{opacity:0;animation:apifyFadeUp 0.7s ease forwards;}
  .apify-root .hero-anim.d1{animation-delay:0.05s;}
  .apify-root .hero-anim.d2{animation-delay:0.15s;}
  .apify-root .hero-anim.d3{animation-delay:0.28s;}
  .apify-root .hero-anim.d4{animation-delay:0.4s;}
  .apify-root .hero-anim.d5{animation-delay:0.52s;}
  .apify-root .hero .badge{margin-bottom:24px;}
  .apify-root .hero h1{margin-bottom:24px;}
  .apify-root .hero-subtitle{color:var(--text-secondary);max-width:640px;margin:0 auto 40px;}
  .apify-root .hero .divider{margin-top:64px;}
  .apify-root .text-blue{color:var(--blue);}

  .apify-root .stats-row{display:flex;justify-content:center;flex-wrap:wrap;gap:48px;margin-top:40px;}
  .apify-root .stat{display:flex;flex-direction:column;align-items:center;gap:6px;}
  .apify-root .stat-number{font-size:32px;font-weight:900;color:var(--blue-light);line-height:1;}
  .apify-root .stat-label{font-size:14px;color:var(--text-secondary);}
  @media (min-width:768px){ .apify-root .stat-number{font-size:42px;} }

  .apify-root .grid-3{display:grid;grid-template-columns:1fr;gap:24px;margin-top:16px;}
  @media (min-width:768px){ .apify-root .grid-3{grid-template-columns:repeat(3,1fr);gap:28px;} }

  .apify-root .grid-6{display:grid;grid-template-columns:1fr;gap:24px;margin-top:16px;}
  @media (min-width:768px){ .apify-root .grid-6{grid-template-columns:repeat(3,1fr);gap:28px;} }

  .apify-root .icon-circle{
    width:48px;height:48px;border-radius:12px;background:rgba(29,78,216,0.15);
    border:1px solid rgba(29,78,216,0.3);color:var(--blue);
    display:flex;align-items:center;justify-content:center;
    font-size:20px;font-weight:700;margin-bottom:20px;
  }

  .apify-root .steps{max-width:760px;margin:32px auto 0;display:flex;flex-direction:column;gap:36px;}
  .apify-root .step{display:flex;gap:24px;align-items:flex-start;}
  .apify-root .step-number{
    width:48px;height:48px;border-radius:50%;background:var(--blue);color:#fff;
    display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;
    flex-shrink:0;
  }
  .apify-root .step-content h3{margin-bottom:8px;}
  .apify-root .step-content p{color:var(--text-secondary);}

  .apify-root .code-block{
    background:var(--code-bg);border:1px solid var(--border);border-radius:10px;padding:20px;
    font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;
    font-size:14px;color:var(--text-secondary);line-height:1.8;white-space:pre-wrap;
    max-width:720px;margin:32px auto 0;
  }
  .apify-root .code-note{color:var(--text-muted);font-size:14px;max-width:720px;margin:20px auto 0;text-align:center;}

  .apify-root .check-list{max-width:720px;margin:32px auto 0;display:flex;flex-direction:column;gap:20px;}
  .apify-root .check-list li{display:flex;align-items:flex-start;gap:14px;color:var(--text-secondary);}
  .apify-root .check-list .icon-check{
    color:var(--blue);font-weight:900;flex-shrink:0;font-size:18px;line-height:1.7;
  }

  .apify-root .cta-section{padding:80px 0;}
  @media (min-width:768px){ .apify-root .cta-section{padding:120px 0;} }
  .apify-root .cta-card{
    max-width:700px;margin:0 auto;text-align:center;padding:48px 32px;
    border-radius:24px;border:1px solid rgba(29,78,216,0.5);
    background:linear-gradient(160deg, rgba(29,78,216,0.18) 0%, rgba(15,23,42,0.4) 60%);
  }
  @media (min-width:768px){ .apify-root .cta-card{padding:64px 56px;} }
  .apify-root .cta-card .badge{margin-bottom:20px;}
  .apify-root .cta-card h2{margin-bottom:20px;}
  .apify-root .cta-card p{color:var(--text-secondary);margin-bottom:32px;}
  .apify-root .cta-note{color:var(--text-muted);font-size:14px;margin-top:20px;}

  .apify-root .footer{background:var(--bg);border-top:1px solid var(--border);padding:48px 0 0;}
  .apify-root .footer-content{
    display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;padding-bottom:40px;
  }
  @media (min-width:768px){
    .apify-root .footer-content{flex-direction:row;justify-content:space-between;align-items:flex-start;text-align:left;}
  }
  .apify-root .footer-tagline{color:var(--text-muted);font-size:14px;margin-top:6px;}
  .apify-root .footer-right{display:flex;align-items:center;gap:10px;}
  .apify-root .footer-right a{color:var(--text-secondary);font-size:14px;transition:color 0.2s ease;}
  .apify-root .footer-right a:hover{color:var(--text);}
  .apify-root .footer-sep{color:var(--text-muted);font-size:14px;}
  .apify-root .footer-bottom{text-align:center;color:var(--text-muted);font-size:13px;padding:24px 0;}

  @media (prefers-reduced-motion:reduce){
    .apify-root *{animation-duration:0.01ms !important;transition-duration:0.01ms !important;scroll-behavior:auto !important;}
  }
`;

const USE_CASES = [
  {
    icon: "◎",
    title: "Generación de leads",
    text: "Obtén listas de negocios de cualquier rubro y zona geográfica, con teléfono, correo, sitio web y redes sociales. Todo en minutos.",
  },
  {
    icon: "▲",
    title: "Análisis de competencia",
    text: "Extrae las publicaciones de tus competidores con sus métricas reales de likes, comentarios y reproducciones. Descubre qué contenido les funciona y cuál no.",
  },
  {
    icon: "∿",
    title: "Investigación de tendencias",
    text: "Analiza hashtags y temas de tu industria para ver qué contenido está performando en tiempo real, antes de crear el tuyo.",
  },
  {
    icon: "▷",
    title: "Transcripción de video",
    text: "Convierte reels y videos en texto para estudiar los hooks, la estructura narrativa y el lenguaje que usan las cuentas que más crecen.",
  },
  {
    icon: "★",
    title: "Monitoreo de reputación",
    text: "Recopila reseñas y comentarios sobre cualquier marca para identificar patrones, quejas recurrentes y oportunidades de mejora.",
  },
  {
    icon: "◈",
    title: "Investigación de mercado",
    text: "Extrae precios, productos y catálogos de e-commerce para entender cómo se está moviendo tu categoría.",
  },
];

const STEPS = [
  {
    title: "Crea tu cuenta en Apify",
    text: "Entra a apify.com y regístrate. El plan gratuito incluye cinco dólares de crédito mensual sin necesidad de tarjeta.",
  },
  {
    title: "Obtén tu token de API",
    text: "Dentro de tu cuenta, ve a Settings, luego Integrations, y copia tu API token personal.",
  },
  {
    title: "Abre los conectores en Claude",
    text: "En Claude, entra a Settings y busca la sección de Connectors o Conectores.",
  },
  {
    title: "Agrega el servidor de Apify",
    text: "Añade un conector personalizado con la URL del servidor MCP de Apify y pega tu token de API cuando te lo pida.",
  },
  {
    title: "Empieza a pedirle datos",
    text: "Ya está listo. Ahora puedes pedirle a Claude en español que extraiga la información que necesitas.",
  },
];

const CONSIDERATIONS = [
  "Trabaja únicamente con información pública. Apify no accede a datos privados ni a contenido protegido.",
  "Respeta los términos de uso de cada plataforma que consultes y la normativa de protección de datos vigente.",
  "El crédito gratuito rinde para cientos de resultados. Empieza con volúmenes pequeños para calibrar.",
  "La calidad del resultado depende del contexto que le des a Claude. Mientras más específico seas, mejor será la salida.",
];

const PROMPT_EXAMPLE = `Usando Apify, extráeme una lista de 30 negocios
del rubro [tu industria] en [tu zona].

Quiero el nombre del negocio, teléfono, correo,
sitio web y perfil de redes sociales.

Organízalo en una tabla ordenada.`;

export default function AnalizadorApifyContent() {
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById("apify-navbar");
    const onScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 20) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);

    const scrollButtons = Array.from(
      document.querySelectorAll<HTMLElement>(".js-scroll-next")
    );
    const onScrollClick = (e: Event) => {
      e.preventDefault();
      document.getElementById("que-es-apify")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scrollButtons.forEach((btn) => btn.addEventListener("click", onScrollClick));

    let revealObserver: IntersectionObserver | undefined;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => revealObserver?.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("visible"));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      scrollButtons.forEach((btn) => btn.removeEventListener("click", onScrollClick));
      revealObserver?.disconnect();
    };
  }, []);

  return (
    <div className="apify-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{STYLES}</style>

      <nav className="navbar" id="apify-navbar">
        <div className="container nav-container">
          <a href="https://moisesmejias.com" className="logo" style={{ display: "inline-flex", alignItems: "center" }}>
            {!logoError ? (
              <img
                src="/taller/logo.png"
                alt="Moises Mejias"
                className="logo-img"
                onError={() => setLogoError(true)}
              />
            ) : (
              "Moises."
            )}
          </a>
          <a href="https://moisesmejias.com/taller" className="btn-primary btn-nav">
            Ver el taller
          </a>
        </div>
      </nav>

      <main>
        <section className="hero" id="hero">
          <div className="container">
            <span className="badge hero-anim d1">Guía práctica · Automatización con IA</span>
            <h1 className="hero-anim d2">
              Extrae datos de <span className="text-blue">cualquier sitio web</span> con Claude AI.
            </h1>
            <p className="hero-subtitle hero-anim d3">
              Apify tiene más de mil scrapers listos para usar. Conectado a Claude, puedes pedirle
              información en español y obtenerla en minutos. Sin escribir una sola línea de código.
            </p>
            <a href="#que-es-apify" className="btn-primary js-scroll-next hero-anim d4">
              Ver cómo funciona ↓
            </a>
            <div className="divider hero-anim d5" />
            <div className="stats-row hero-anim d5">
              <div className="stat">
                <span className="stat-number">1,500+</span>
                <span className="stat-label">Scrapers disponibles</span>
              </div>
              <div className="stat">
                <span className="stat-number">$5</span>
                <span className="stat-label">Crédito gratis al mes</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Líneas de código</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="que-es-apify">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">El concepto</span>
              <h2>¿Qué es Apify?</h2>
              <p>
                Apify es una plataforma con más de mil quinientos scrapers ya construidos — ellos
                les llaman Actors. Cada uno está diseñado para extraer información de una
                plataforma específica: Google Maps, Instagram, TikTok, LinkedIn, YouTube, Amazon, o
                cualquier sitio web. No necesitas programar nada. Solo eliges el Actor que necesitas
                y le dices qué buscar.
              </p>
            </div>
            <div className="grid-3">
              <div className="card reveal">
                <h3>Datos públicos</h3>
                <p>
                  Extrae información que ya está disponible públicamente en internet, de forma
                  ordenada y estructurada.
                </p>
              </div>
              <div className="card reveal">
                <h3>Sin programar</h3>
                <p>Los scrapers ya están construidos. Tú solo defines qué quieres y desde dónde.</p>
              </div>
              <div className="card reveal">
                <h3>Plan gratuito real</h3>
                <p>
                  Cinco dólares de crédito cada mes sin tarjeta. Si se acaba, se detiene. Sin cobros
                  sorpresa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="casos-de-uso">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">Casos de uso</span>
              <h2>Qué puedes lograr con esta integración.</h2>
            </div>
            <div className="grid-6">
              {USE_CASES.map((useCase) => (
                <div className="card reveal" key={useCase.title}>
                  <div className="icon-circle">{useCase.icon}</div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="como-conectarlo">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">Paso a paso</span>
              <h2>Cómo conectar Apify con Claude.</h2>
              <p>El proceso completo toma menos de cinco minutos.</p>
            </div>
            <div className="steps">
              {STEPS.map((step, i) => (
                <div className="step reveal" key={step.title}>
                  <div className="step-number">{i + 1}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="ejemplo-prompt">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">En la práctica</span>
              <h2>Así se ve una petición real.</h2>
              <p>Una vez conectado, no necesitas aprender comandos. Le hablas a Claude como le hablarías a un asistente.</p>
            </div>
            <pre className="code-block reveal">{PROMPT_EXAMPLE}</pre>
            <p className="code-note reveal">
              Antes de ejecutar, dale contexto a Claude sobre tu negocio y tu cliente ideal. Sin ese
              contexto, los resultados serán genéricos.
            </p>
          </div>
        </section>

        <section className="section" id="consideraciones">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">Antes de empezar</span>
              <h2>Lo que debes tener en cuenta.</h2>
            </div>
            <ul className="check-list">
              {CONSIDERATIONS.map((text) => (
                <li className="reveal" key={text}>
                  <span className="icon-check">✓</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta-section" id="cta-taller">
          <div className="container">
            <div className="cta-card reveal">
              <span className="badge">Próximamente</span>
              <h2>Muy pronto: Taller presencial de Claude AI en Lima.</h2>
              <p>
                Un día completo aprendiendo a usar Claude y las herramientas que se conectan con él
                para automatizar tu negocio. Con dos expertos invitados.
              </p>
              <a href="https://moisesmejias.com/taller" className="btn-primary">
                Quiero inscribirme →
              </a>
              <p className="cta-note">Cupos limitados. Regístrate para acceder al precio de lanzamiento.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="logo">Moises.</div>
              <p className="footer-tagline">Estrategia · Marketing · IA</p>
            </div>
            <div className="footer-right">
              <a href="https://www.instagram.com/soymoisesmkt/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <span className="footer-sep">·</span>
              <a href="https://moisesmejias.com" target="_blank" rel="noopener noreferrer">
                moisesmejias.com
              </a>
            </div>
          </div>
          <div className="divider" />
          <p className="footer-bottom">© 2026 Moises Mejias · moisesmejias.com</p>
        </div>
      </footer>
    </div>
  );
}
