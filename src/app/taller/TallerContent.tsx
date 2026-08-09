"use client";

import { useEffect, useState } from "react";

const STYLES = `
  .taller-root{
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
    --red:#EF4444;

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
    cursor:auto;
  }
  .taller-root *,.taller-root *::before,.taller-root *::after{box-sizing:border-box;}
  .taller-root{scroll-behavior:smooth;}
  .taller-root a{text-decoration:none;color:inherit;cursor:auto;}
  .taller-root ul{list-style:none;margin:0;padding:0;}
  .taller-root button{font-family:inherit;cursor:pointer;border:none;background:none;}
  .taller-root input,.taller-root select,.taller-root textarea{font-family:inherit;}
  .taller-root img{max-width:100%;display:block;}

  @media (min-width:768px){
    .taller-root{font-size:18px;}
  }

  .taller-root h1,.taller-root h2,.taller-root h3{color:var(--text);margin:0;}

  .taller-root h1{font-size:42px;font-weight:900;line-height:1.05;letter-spacing:-0.02em;}
  .taller-root h2{font-size:32px;font-weight:800;line-height:1.15;}
  .taller-root h3{font-size:20px;font-weight:700;line-height:1.3;}

  @media (min-width:768px){
    .taller-root h1{font-size:72px;}
    .taller-root h2{font-size:48px;}
    .taller-root h3{font-size:24px;}
  }

  .taller-root p{font-size:16px;line-height:1.7;margin:0;}
  @media (min-width:768px){ .taller-root p{font-size:18px;} }

  .taller-root .container{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;}

  .taller-root .section{padding:80px 0;}
  @media (min-width:768px){ .taller-root .section{padding:120px 0;} }

  .taller-root .section-divider{border-top:1px solid var(--border);}

  .taller-root .label{
    display:block;
    font-size:12px;
    font-weight:600;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--blue-light);
    margin-bottom:16px;
  }

  .taller-root .section-header{max-width:680px;margin:0 auto 64px;text-align:center;}
  .taller-root .section-header p{color:var(--text-secondary);margin-top:20px;}

  .taller-root .text-blue{color:var(--blue);}
  .taller-root .text-secondary{color:var(--text-secondary);}
  .taller-root .italic{font-style:italic;}
  .taller-root .text-small{font-size:14px;margin-top:12px;}

  .taller-root .reveal{opacity:0;transform:translateY(32px);transition:opacity 0.7s ease,transform 0.7s ease;}
  .taller-root .reveal.visible{opacity:1;transform:translateY(0);}
  .taller-root .two-col .reveal:nth-child(2){transition-delay:0.12s;}

  .taller-root .btn-primary{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    background:var(--blue);
    color:#fff;
    padding:16px 36px;
    border-radius:8px;
    font-size:17px;
    font-weight:700;
    transition:background 0.2s ease,transform 0.2s ease,box-shadow 0.2s ease;
    text-align:center;
  }
  .taller-root .btn-primary:hover{background:var(--blue-hover);}

  .taller-root .btn-hero{box-shadow:0 8px 30px rgba(29,78,216,0.4);}
  .taller-root .btn-glow{animation:tallerPulseGlow 2.6s ease-in-out infinite;}
  @keyframes tallerPulseGlow{
    0%,100%{box-shadow:0 8px 30px rgba(29,78,216,0.4),0 0 0 0 rgba(29,78,216,0.45);}
    50%{box-shadow:0 8px 30px rgba(29,78,216,0.4),0 0 0 12px rgba(29,78,216,0);}
  }

  .taller-root .btn-nav{padding:10px 20px;font-size:13px;}
  @media (min-width:768px){ .taller-root .btn-nav{padding:12px 28px;font-size:15px;} }

  .taller-root .badge{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:#1D4ED820;
    color:var(--blue-light);
    border:1px solid #1D4ED840;
    padding:6px 14px;
    border-radius:999px;
    font-size:12px;
    font-weight:600;
    text-transform:uppercase;
    letter-spacing:0.06em;
  }
  .taller-root .badge-dot{
    width:6px;height:6px;border-radius:50%;background:var(--blue-light);
    animation:tallerBlink 1.6s ease-in-out infinite;
  }
  @keyframes tallerBlink{0%,100%{opacity:1;}50%{opacity:0.25;}}

  .taller-root .card{
    background:var(--bg-alt);
    border:1px solid var(--border);
    border-radius:16px;
    padding:36px;
    transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease;
  }
  .taller-root .card:hover{transform:translateY(-6px);box-shadow:0 20px 45px rgba(0,0,0,0.35);border-color:var(--blue-hover);}

  .taller-root .divider{border-top:1px solid var(--border);width:100%;}

  .taller-root .navbar{
    position:sticky;
    top:0;
    z-index:100;
    background:rgba(15,23,42,0.85);
    backdrop-filter:blur(10px);
    -webkit-backdrop-filter:blur(10px);
    border-bottom:1px solid var(--border);
    transition:box-shadow 0.2s ease;
  }
  .taller-root .navbar.scrolled{box-shadow:0 4px 24px #00000040;}
  .taller-root .nav-container{
    height:68px;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .taller-root .logo{font-weight:800;font-size:20px;color:var(--text);}
  .taller-root .logo-wrap{display:inline-flex;align-items:center;}
  .taller-root .logo-img{height:28px;width:auto;display:block;}
  .taller-root .footer-left .logo-img{height:36px;}

  .taller-root .hero{padding:100px 0 80px;text-align:center;position:relative;overflow:hidden;}
  @media (min-width:768px){ .taller-root .hero{padding:160px 0 120px;} }

  .taller-root .hero-bg-image{
    position:absolute;inset:0;
    background-image:url('/taller/hero-bg.webp');
    background-size:cover;
    background-position:center 35%;
    opacity:0.6;
    z-index:0;
  }
  .taller-root .hero-bg-gradient{
    position:absolute;inset:0;
    background:linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.65) 45%, var(--bg) 100%);
    z-index:1;
  }
  .taller-root .blob{position:absolute;border-radius:50%;filter:blur(90px);mix-blend-mode:screen;pointer-events:none;z-index:2;opacity:0.55;}
  .taller-root .blob-1{width:380px;height:380px;background:var(--blue);top:-140px;left:-90px;animation:tallerFloatBlob 13s ease-in-out infinite;}
  .taller-root .blob-2{width:320px;height:320px;background:var(--blue-hover);bottom:-100px;right:-80px;animation:tallerFloatBlob 16s ease-in-out infinite reverse;}
  @keyframes tallerFloatBlob{
    0%,100%{transform:translate(0,0) scale(1);}
    50%{transform:translate(30px,-24px) scale(1.08);}
  }
  .taller-root .hero > .container{z-index:3;}

  @keyframes tallerFadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  .taller-root .hero-anim{opacity:0;animation:tallerFadeUp 0.8s ease forwards;}
  .taller-root .hero-anim.d1{animation-delay:0.05s;}
  .taller-root .hero-anim.d2{animation-delay:0.2s;}
  .taller-root .hero-anim.d3{animation-delay:0.35s;}
  .taller-root .hero-anim.d4{animation-delay:0.5s;}
  .taller-root .hero-anim.d5{animation-delay:0.65s;}
  .taller-root .hero-anim.d6{animation-delay:0.8s;}

  .taller-root .hero .badge{margin-bottom:24px;}
  .taller-root .hero h1{margin-bottom:24px;}

  .taller-root .hero-subtitle{
    color:var(--text-secondary);
    max-width:600px;
    margin:0 auto 48px;
  }

  .taller-root .hero-note{
    color:var(--text-muted);
    font-size:14px;
    margin-top:16px;
  }

  .taller-root .hero .divider{margin-top:80px;position:relative;z-index:3;}

  .taller-root .stats-row{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:48px;
    margin-top:48px;
    position:relative;
    z-index:3;
  }
  .taller-root .stat{display:flex;flex-direction:column;align-items:center;gap:6px;}
  .taller-root .stat-number{font-size:36px;font-weight:900;color:var(--blue-light);line-height:1;}
  .taller-root .stat-label{font-size:14px;color:var(--text-secondary);}
  @media (min-width:768px){ .taller-root .stat-number{font-size:48px;} }

  .taller-root .cupos-bar{width:120px;height:6px;background:var(--border);border-radius:999px;overflow:hidden;margin-top:12px;}
  .taller-root .cupos-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--blue),var(--blue-light));border-radius:999px;transition:width 1.2s ease;}
  .taller-root .cupos-remaining{display:block;font-size:12px;color:var(--text-secondary);margin-top:8px;}
  .taller-root .cupos-remaining strong{color:var(--blue-light);}

  .taller-root .two-col{display:grid;grid-template-columns:1fr;gap:24px;}
  @media (min-width:768px){ .taller-root .two-col{grid-template-columns:1fr 1fr;gap:32px;} }

  .taller-root .card-green{background:#0F2318;border:1px solid #22C55E20;}
  .taller-root .card-red{background:#1F0F0F;border:1px solid #EF444420;}
  .taller-root .card-green:hover{border-color:#22C55E80;}
  .taller-root .card-red:hover{border-color:#EF444480;}
  .taller-root .card-green h3{color:var(--green);margin-bottom:20px;}
  .taller-root .card-red h3{color:var(--red);margin-bottom:20px;}

  .taller-root .check-list,.taller-root .x-list{display:flex;flex-direction:column;gap:16px;}
  .taller-root .check-list li,.taller-root .x-list li{display:flex;align-items:flex-start;gap:12px;color:var(--text-secondary);}
  .taller-root .icon-check,.taller-root .icon-x{font-weight:700;flex-shrink:0;}
  .taller-root .icon-check{color:var(--green);}
  .taller-root .icon-x{color:var(--red);}

  .taller-root .speaker-feature{
    display:flex;flex-direction:column;gap:28px;
    background:var(--bg-alt);border:1px solid var(--border);border-radius:20px;
    padding:28px;margin-top:16px;
  }
  @media (min-width:768px){
    .taller-root .speaker-feature{flex-direction:row;align-items:center;padding:20px;gap:40px;}
  }
  .taller-root .speaker-photo-slot{
    position:relative;width:100%;aspect-ratio:4/3;border-radius:14px;overflow:hidden;
    background:linear-gradient(135deg,var(--border),var(--bg));flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
  }
  @media (min-width:768px){
    .taller-root .speaker-photo-slot{width:300px;height:300px;aspect-ratio:auto;}
  }
  .taller-root .speaker-photo-slot img{width:100%;height:100%;object-fit:cover;}
  .taller-root .photo-empty::after{content:attr(data-empty-text);color:var(--text-muted);font-size:13px;text-align:center;padding:20px;}
  .taller-root .speaker-feature-content .badge{margin-bottom:16px;}
  .taller-root .speaker-feature-content h3{margin-bottom:8px;font-size:28px;}
  .taller-root .speaker-feature-role{color:var(--blue-light);font-weight:600;font-size:15px;margin-bottom:16px;}
  .taller-root .speaker-feature-content p{color:var(--text-secondary);}

  .taller-root .podcast-link{
    display:inline-flex;align-items:center;gap:10px;margin-top:20px;
    color:var(--text-secondary);font-size:14px;font-weight:600;
    transition:color 0.2s ease;
  }
  .taller-root .podcast-link:hover{color:var(--text);}
  .taller-root .podcast-link .play-icon{
    width:28px;height:28px;border-radius:50%;background:var(--blue);color:#fff;
    display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;
  }

  .taller-root .also-learn{margin-top:48px;}
  .taller-root .also-learn-title{font-size:24px;font-weight:800;margin-bottom:8px;text-align:center;}
  @media (min-width:768px){ .taller-root .also-learn-title{font-size:28px;} }
  .taller-root .also-learn-intro{color:var(--text-secondary);text-align:center;max-width:520px;margin:0 auto 28px;font-size:15px;}
  .taller-root .also-learn-grid{display:grid;grid-template-columns:1fr;gap:20px;}
  @media (min-width:768px){ .taller-root .also-learn-grid{grid-template-columns:1fr 1fr;gap:24px;} }
  .taller-root .also-learn-card{
    background:var(--text);color:var(--bg);border-radius:16px;padding:28px;
    transition:transform 0.3s ease,box-shadow 0.3s ease;
  }
  .taller-root .also-learn-card:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(0,0,0,0.35);}
  .taller-root .also-learn-card .badge{
    background:var(--bg);color:var(--text);border-color:var(--bg);margin-bottom:14px;
  }
  .taller-root .also-learn-card h4{font-size:19px;font-weight:800;color:var(--bg);margin-bottom:10px;}
  .taller-root .also-learn-card p{color:#334155;font-size:15px;line-height:1.6;}

  .taller-root .cupos-banner{
    display:flex;align-items:center;justify-content:center;gap:10px;
    max-width:1100px;margin:0 auto;padding:16px 24px;
    background:#1D4ED814;border-top:1px solid var(--border);border-bottom:1px solid var(--border);
    color:var(--text-secondary);font-size:14px;font-weight:600;text-align:center;
  }
  .taller-root .cupos-banner-icon{font-size:16px;flex-shrink:0;}
  .taller-root .cupos-banner strong{color:var(--blue-light);}

  .taller-root .form-wrap{max-width:560px;margin:0 auto;position:relative;z-index:1;}
  .taller-root .register-form{
    background:var(--bg-alt);
    border:1px solid var(--border);
    border-radius:20px;
    padding:32px;
    position:relative;
  }
  @media (min-width:768px){ .taller-root .register-form{padding:48px;} }

  .taller-root .quiz-progress{height:4px;background:var(--bg);border-radius:999px;overflow:hidden;margin-bottom:24px;}
  .taller-root .quiz-progress-fill{height:100%;width:25%;background:linear-gradient(90deg,var(--blue),var(--blue-light));border-radius:999px;transition:width 0.4s ease;}
  .taller-root .quiz-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;min-height:20px;}
  .taller-root .quiz-back{color:var(--text-secondary);font-size:14px;font-weight:600;transition:color 0.2s ease;}
  .taller-root .quiz-back:hover{color:var(--text);}
  .taller-root .quiz-back.is-hidden{visibility:hidden;}
  .taller-root .quiz-step-counter{color:var(--text-muted);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-left:auto;}

  .taller-root .quiz-step{display:none;}
  .taller-root .quiz-step.active{display:block;animation:tallerStepIn 0.35s ease;}
  @keyframes tallerStepIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}

  .taller-root .quiz-step label,.taller-root .quiz-step .quiz-question{display:block;color:var(--text);font-size:20px;font-weight:700;margin-bottom:16px;}
  .taller-root .quiz-step input[type=text],.taller-root .quiz-step input[type=tel],.taller-root .quiz-step input[type=email]{
    width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;
    padding:16px 18px;color:var(--text);font-size:18px;outline:none;
    transition:border-color 0.2s ease;margin-bottom:20px;
  }
  .taller-root .quiz-step input:focus{border-color:var(--blue);}
  .taller-root .quiz-step input::placeholder{color:var(--text-muted);}
  .taller-root .quiz-next{width:100%;height:56px;}

  .taller-root .profile-options{display:flex;flex-direction:column;gap:10px;margin-bottom:8px;}
  .taller-root .profile-option{
    text-align:left;background:var(--bg);border:1px solid var(--border);color:var(--text);
    padding:14px 18px;border-radius:8px;font-size:15px;font-weight:600;
    transition:border-color 0.2s ease,background 0.2s ease,transform 0.15s ease;
  }
  .taller-root .profile-option:hover{border-color:var(--blue-hover);transform:translateX(2px);}
  .taller-root .profile-option.selected{border-color:var(--blue);background:#1D4ED820;color:var(--blue-light);}
  .taller-root .profile-error{color:var(--red);font-size:13px;margin:-4px 0 12px;}

  .taller-root .form-checkbox{display:flex;gap:12px;align-items:flex-start;margin:24px 0 28px;}
  .taller-root .form-checkbox input{
    width:18px;height:18px;margin-top:3px;accent-color:var(--blue);
    cursor:pointer;flex-shrink:0;
  }
  .taller-root .form-checkbox label{
    display:block;font-size:14px !important;font-weight:400 !important;color:var(--text-secondary);
    line-height:1.5;cursor:pointer;margin-bottom:0 !important;
  }

  .taller-root .btn-submit{width:100%;height:56px;}
  .taller-root .btn-submit:hover{transform:translateY(-2px);box-shadow:0 8px 24px #1D4ED840;}
  .taller-root .btn-submit:disabled{opacity:0.7;cursor:default;transform:none;}

  .taller-root .success-card{
    background:var(--bg-alt);border:1px solid var(--green);border-radius:20px;
    padding:32px;text-align:center;animation:tallerFadeIn 0.4s ease;
  }
  @media (min-width:768px){ .taller-root .success-card{padding:48px;} }
  .taller-root .success-icon{
    width:64px;height:64px;border-radius:50%;background:#22C55E20;
    color:var(--green);font-size:30px;font-weight:700;
    display:flex;align-items:center;justify-content:center;margin:0 auto 20px;
  }
  .taller-root .success-card h3{margin-bottom:12px;}
  .taller-root .success-card p{color:var(--text-secondary);}

  @keyframes tallerFadeIn{
    from{opacity:0;transform:translateY(8px);}
    to{opacity:1;transform:translateY(0);}
  }

  .taller-root .legal-text{font-size:13px;color:var(--text-muted);text-align:center;margin-top:24px;}

  .taller-root [hidden]{display:none !important;}

  .taller-root .footer{background:var(--bg);border-top:1px solid var(--border);padding:48px 0 0;}
  .taller-root .footer-content{
    display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;
    padding-bottom:40px;
  }
  @media (min-width:768px){
    .taller-root .footer-content{flex-direction:row;justify-content:space-between;align-items:flex-start;text-align:left;}
  }
  .taller-root .footer-tagline{color:var(--text-muted);font-size:14px;margin-top:6px;}
  .taller-root .footer-right{display:flex;align-items:center;gap:10px;}
  .taller-root .footer-right a{color:var(--text-secondary);font-size:14px;transition:color 0.2s ease;}
  .taller-root .footer-right a:hover{color:var(--text);}
  .taller-root .footer-sep{color:var(--text-muted);font-size:14px;}
  .taller-root .footer-bottom{text-align:center;color:var(--text-muted);font-size:13px;padding:24px 0;}

  .taller-root #registro{scroll-margin-top:88px;}

  @media (prefers-reduced-motion:reduce){
    .taller-root *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important;}
  }
`;

export default function TallerContent() {
  const [logoError, setLogoError] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 20) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);

    const registro = document.getElementById("registro");
    const scrollButtons = Array.from(
      document.querySelectorAll<HTMLElement>(".js-scroll-to-form")
    );
    const onScrollClick = (e: Event) => {
      e.preventDefault();
      registro?.scrollIntoView({ behavior: "smooth", block: "start" });
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

    function animateCount(el: Element, target: number, duration: number) {
      let startTime: number | null = null;
      function step(ts: number) {
        if (startTime === null) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = String(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      }
      requestAnimationFrame(step);
    }

    const CUPOS_TOTAL = 30;
    const CUPOS_RESERVADOS = 9;
    const cuposDisponibles = CUPOS_TOTAL - CUPOS_RESERVADOS;

    document.querySelectorAll(".cupos-banner-number").forEach((el) => {
      el.textContent = String(cuposDisponibles);
    });

    let statsObserver: IntersectionObserver | undefined;
    const statsRow = document.querySelector(".stats-row");
    if (statsRow && "IntersectionObserver" in window) {
      statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              document
                .querySelectorAll("[data-count]")
                .forEach((el) =>
                  animateCount(el, parseInt(el.getAttribute("data-count") || "0", 10), 1200)
                );
              const fill = document.getElementById("cuposBarFill");
              const remainingEl = document.getElementById("cuposRemainingNum");
              if (fill) fill.style.width = (cuposDisponibles / CUPOS_TOTAL) * 100 + "%";
              if (remainingEl) animateCount(remainingEl, cuposDisponibles, 1200);
              statsObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      statsObserver.observe(statsRow);
    }

    const form = document.getElementById("registerForm") as HTMLFormElement | null;
    const successMessage = document.getElementById("successMessage");
    const steps = form ? Array.from(form.querySelectorAll<HTMLElement>(".quiz-step")) : [];
    const totalSteps = steps.length;
    const progressFill = document.getElementById("quizProgressFill");
    const stepCurrentEl = document.getElementById("stepCurrent");
    const backBtn = document.getElementById("quizBack");
    let currentStep = 1;

    function showStep(n: number, focusInput = true) {
      steps.forEach((s) => s.classList.remove("active"));
      const target = steps[n - 1];
      target?.classList.add("active");
      if (focusInput) {
        const input = target?.querySelector<HTMLInputElement>(
          'input[type="text"], input[type="tel"], input[type="email"]'
        );
        if (input) setTimeout(() => input.focus(), 200);
      }
      if (progressFill) progressFill.style.width = (n / totalSteps) * 100 + "%";
      if (stepCurrentEl) stepCurrentEl.textContent = String(n);
      backBtn?.classList.toggle("is-hidden", n === 1);
      currentStep = n;
    }

    function validateStep(n: number) {
      const target = steps[n - 1];
      const input = target?.querySelector<HTMLInputElement>(
        'input[type="text"], input[type="tel"], input[type="email"]'
      );
      if (input && !input.checkValidity()) {
        input.reportValidity();
        return false;
      }
      if (n === 4) {
        const perfil = document.getElementById("perfilValue") as HTMLInputElement | null;
        const profileError = document.getElementById("profileError") as HTMLElement | null;
        if (!perfil?.value) {
          if (profileError) profileError.hidden = false;
          return false;
        }
        if (profileError) profileError.hidden = true;
      }
      return true;
    }

    const nextButtons = form ? Array.from(form.querySelectorAll<HTMLElement>(".quiz-next")) : [];
    const onNextClick = () => {
      if (validateStep(currentStep)) showStep(currentStep + 1);
    };
    nextButtons.forEach((btn) => btn.addEventListener("click", onNextClick));

    const onBackClick = () => {
      if (currentStep > 1) showStep(currentStep - 1);
    };
    backBtn?.addEventListener("click", onBackClick);

    const textInputs = form
      ? Array.from(
          form.querySelectorAll<HTMLInputElement>(
            'input[type="text"], input[type="tel"], input[type="email"]'
          )
        )
      : [];
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (currentStep < totalSteps && validateStep(currentStep)) showStep(currentStep + 1);
      }
    };
    textInputs.forEach((input) => input.addEventListener("keydown", onKeydown));

    const profileOptions = Array.from(document.querySelectorAll<HTMLElement>(".profile-option"));
    const onProfileClick = (opt: HTMLElement) => () => {
      profileOptions.forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      const perfilValue = document.getElementById("perfilValue") as HTMLInputElement | null;
      if (perfilValue) perfilValue.value = opt.getAttribute("data-value") || "";
      const profileError = document.getElementById("profileError") as HTMLElement | null;
      if (profileError) profileError.hidden = true;
    };
    const profileHandlers = profileOptions.map((opt) => {
      const handler = onProfileClick(opt);
      opt.addEventListener("click", handler);
      return { opt, handler };
    });

    if (steps.length) showStep(1, false);

    const onSubmit = (e: Event) => {
      e.preventDefault();
      if (!form || !validateStep(4)) return;
      const submitBtn = form.querySelector<HTMLButtonElement>(".btn-submit");
      const originalText = submitBtn?.textContent || "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            form.hidden = true;
            if (successMessage) {
              successMessage.hidden = false;
              successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          } else {
            throw new Error("Formspree error");
          }
        })
        .catch(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
          alert("No pudimos enviar tu registro. Intenta nuevamente en unos segundos.");
        });
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      scrollButtons.forEach((btn) => btn.removeEventListener("click", onScrollClick));
      revealObserver?.disconnect();
      statsObserver?.disconnect();
      nextButtons.forEach((btn) => btn.removeEventListener("click", onNextClick));
      backBtn?.removeEventListener("click", onBackClick);
      textInputs.forEach((input) => input.removeEventListener("keydown", onKeydown));
      profileHandlers.forEach(({ opt, handler }) => opt.removeEventListener("click", handler));
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <div className="taller-root">
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{STYLES}</style>

      <nav className="navbar" id="navbar">
        <div className="container nav-container">
          <span className="logo-wrap">
            {!logoError ? (
              <img
                src="/taller/logo.png"
                alt="Moises Mejias"
                className="logo-img"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="logo">Moises.</span>
            )}
          </span>
          <a href="#registro" className="btn-primary btn-nav js-scroll-to-form">
            Registrarme
          </a>
        </div>
      </nav>

      <main>
        <section className="hero" id="hero">
          <div className="hero-bg-image" />
          <div className="hero-bg-gradient" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="container">
            <span className="badge hero-anim d1">
              <span className="badge-dot" />
              Lima · Presencial · Próximamente
            </span>
            <h1 className="hero-anim d2">
              El primer taller de
              <br />
              <span className="text-blue">Claude AI</span> en Lima.
            </h1>
            <p className="hero-subtitle hero-anim d3">
              Aplicado para emprendedores y marketeros.
              <br />
              Con casos reales. En vivo. En Lima.
            </p>
            <a
              href="#registro"
              className="btn-primary btn-hero btn-glow js-scroll-to-form hero-anim d4"
            >
              Quiero mi lugar entre los primeros 30 →
            </a>
            <p className="hero-note hero-anim d5">
              Solo las primeras 30 personas acceden al precio de lanzamiento especial. Sin
              compromiso.
            </p>
            <div className="divider hero-anim d6" />
            <div className="stats-row hero-anim d6">
              <div className="stat">
                <span className="stat-number" data-count="30">
                  0
                </span>
                <span className="stat-label">Cupos con descuento</span>
                <div className="cupos-bar">
                  <div className="cupos-bar-fill" id="cuposBarFill" />
                </div>
                <span className="cupos-remaining">
                  Quedan <strong id="cuposRemainingNum">0</strong> disponibles
                </span>
              </div>
              <div className="stat">
                <span className="stat-number" data-count="3">
                  0
                </span>
                <span className="stat-label">Expertos en sala</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-count="1">
                  0
                </span>
                <span className="stat-label">Día que lo cambia todo</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="evento">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">El evento</span>
              <h2>No es un curso online.</h2>
              <p>
                Es un taller presencial donde trabajarás tu propio negocio con herramientas
                reales de inteligencia artificial. Claude AI está cambiando cómo los mejores
                negocios crean contenido, analizan mercados y ejecutan estrategias. Acá
                aprenderás a usarlo tú mismo, desde cero, con acompañamiento directo.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="para-quien">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">¿Es para ti?</span>
              <h2>Esto es para ti si...</h2>
            </div>
            <div className="two-col">
              <div className="card card-green reveal">
                <h3>✓ Sí es para ti</h3>
                <ul className="check-list">
                  <li>
                    <span className="icon-check">✓</span>
                    <span>Eres emprendedor y quieres automatizar tareas para ahorrar tiempo</span>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <span>Eres marketero y quieres mejorar tus resultados usando IA</span>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <span>Tienes un negocio y quieres usar IA sin depender de terceros</span>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <span>
                      Eres profesional independiente y quieres diferenciarte en tu mercado
                    </span>
                  </li>
                </ul>
              </div>
              <div className="card card-red reveal">
                <h3>✗ No es para ti</h3>
                <ul className="x-list">
                  <li>
                    <span className="icon-x">✗</span>
                    <span>Buscas soluciones mágicas sin ningún esfuerzo de tu parte</span>
                  </li>
                  <li>
                    <span className="icon-x">✗</span>
                    <span>Ya dominas Claude AI a nivel avanzado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="cupos-banner reveal">
          <span className="cupos-banner-icon">🕐</span>
          <span>
            Quedan <strong className="cupos-banner-number">30</strong> cupos con precio de
            lanzamiento
          </span>
        </div>

        <section className="section section-divider" id="contenido">
          <div className="container">
            <div className="section-header reveal">
              <span className="label">El contenido</span>
              <h2>Qué vas a aprender.</h2>
              <p>Un día completo, dictado por mí, con el apoyo de un equipo de especialistas invitados.</p>
            </div>

            <div className="speaker-feature reveal">
              <div
                className={`speaker-photo-slot${photoError ? " photo-empty" : ""}`}
                data-empty-text="Foto de Moisés aquí"
              >
                {!photoError && (
                  <img
                    src="/taller/moises-foto-1.jpg"
                    alt="Moises Mejias dando una conferencia"
                    onError={() => setPhotoError(true)}
                  />
                )}
              </div>
              <div className="speaker-feature-content">
                <span className="badge">Estrategia &amp; Meta Ads</span>
                <h3>Moises Mejias</h3>
                <p className="speaker-feature-role">
                  Asesor de marketing &amp; IA · 50+ marcas escaladas
                </p>
                <p>
                  Cómo publicitar tu negocio a través de Meta Ads usando Claude como herramienta
                  estratégica. Cómo programar y automatizar tareas para ganar tiempo real. Cómo
                  analizar a tu competencia para mejorar tu contenido y llegar exactamente al
                  público que quieres.
                </p>
                <a
                  className="podcast-link"
                  href="https://www.youtube.com/@MoisesMarketing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="play-icon">▶</span>
                  Escucha mi podcast en YouTube →
                </a>
              </div>
            </div>

            <div className="also-learn reveal">
              <h3 className="also-learn-title">Además aprenderás</h3>
              <p className="also-learn-intro">Con la participación de especialistas invitados.</p>
              <div className="also-learn-grid">
                <div className="also-learn-card">
                  <span className="badge">Claude AI · Certificado en Perú</span>
                  <h4>Claude AI desde cero</h4>
                  <p>
                    De la mano de un experto certificado en Claude AI en Perú — uno de los pocos
                    con esta certificación oficial en el país.
                  </p>
                </div>
                <div className="also-learn-card">
                  <span className="badge">Contenido &amp; Video con IA</span>
                  <h4>Creación de contenido y generación de videos con IA</h4>
                  <p>
                    Con un especialista en producción de contenido digital y generación de video
                    usando inteligencia artificial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="cupos-banner reveal">
          <span className="cupos-banner-icon">🕐</span>
          <span>
            Quedan <strong className="cupos-banner-number">30</strong> cupos con precio de
            lanzamiento
          </span>
        </div>

        <section className="section" id="registro">
          <div className="container">
            <div className="form-wrap">
              <div className="section-header reveal">
                <span className="label">Cupos limitados</span>
                <h2>Regístrate entre los primeros 30.</h2>
                <p>
                  Cuando abramos las inscripciones oficiales, tú serás el primero en saberlo y
                  en acceder al precio de lanzamiento exclusivo.
                </p>
              </div>

              <form
                id="registerForm"
                className="register-form reveal"
                action="https://formspree.io/f/mnpapdar"
                method="POST"
                noValidate
              >
                <input type="hidden" name="fuente" value="Registro Taller Claude AI – Lima" />
                <div className="quiz-progress">
                  <div className="quiz-progress-fill" id="quizProgressFill" />
                </div>
                <div className="quiz-meta">
                  <button type="button" className="quiz-back is-hidden" id="quizBack">
                    ‹ Atrás
                  </button>
                  <span className="quiz-step-counter">
                    Paso <span id="stepCurrent">1</span> de 4
                  </span>
                </div>

                <div className="quiz-step active" data-step="1">
                  <label htmlFor="nombre">¿Cuál es tu nombre completo?</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    required
                  />
                  <button type="button" className="btn-primary quiz-next">
                    Siguiente →
                  </button>
                </div>

                <div className="quiz-step" data-step="2">
                  <label htmlFor="telefono">¿Cuál es tu WhatsApp?</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="+51 999 999 999"
                    autoComplete="tel"
                    required
                  />
                  <button type="button" className="btn-primary quiz-next">
                    Siguiente →
                  </button>
                </div>

                <div className="quiz-step" data-step="3">
                  <label htmlFor="correo">¿Cuál es tu correo electrónico?</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="tucorreo@email.com"
                    autoComplete="email"
                    required
                  />
                  <button type="button" className="btn-primary quiz-next">
                    Siguiente →
                  </button>
                </div>

                <div className="quiz-step" data-step="4">
                  <p className="quiz-question" id="perfilQuestion">
                    ¿Cuál es tu perfil?
                  </p>
                  <div
                    className="profile-options"
                    role="group"
                    aria-labelledby="perfilQuestion"
                    id="profileOptions"
                  >
                    <button type="button" className="profile-option" data-value="Emprendedor">
                      Emprendedor
                    </button>
                    <button type="button" className="profile-option" data-value="Marketero">
                      Marketero
                    </button>
                    <button
                      type="button"
                      className="profile-option"
                      data-value="Dueño de negocio"
                    >
                      Dueño de negocio
                    </button>
                    <button
                      type="button"
                      className="profile-option"
                      data-value="Profesional independiente"
                    >
                      Profesional independiente
                    </button>
                    <button type="button" className="profile-option" data-value="Otro">
                      Otro
                    </button>
                  </div>
                  <input type="hidden" id="perfilValue" name="perfil" defaultValue="" />
                  <p className="profile-error" id="profileError" role="alert" hidden>
                    Selecciona una opción para continuar.
                  </p>

                  <div className="form-checkbox">
                    <input
                      type="checkbox"
                      id="acepta_novedades"
                      name="acepta_novedades"
                      value="si"
                    />
                    <label htmlFor="acepta_novedades">
                      ¿Estás de acuerdo con recibir novedades a través de correo electrónico
                      sobre la próxima apertura del taller?
                    </label>
                  </div>

                  <button type="submit" className="btn-primary btn-submit">
                    Quiero mi lugar entre los primeros 30 →
                  </button>
                </div>

                <noscript>
                  <style>{`
                    .taller-root .quiz-step{display:block !important;opacity:1 !important;transform:none !important;animation:none !important;}
                    .taller-root .quiz-progress,.taller-root .quiz-meta,.taller-root .quiz-next{display:none !important;}
                  `}</style>
                </noscript>
              </form>

              <div
                id="successMessage"
                className="success-card"
                role="status"
                aria-live="polite"
                hidden
              >
                <div className="success-icon">✓</div>
                <h3>¡Ya estás en la lista!</h3>
                <p>Te avisaremos primero cuando abramos las inscripciones. Revisa tu correo.</p>
              </div>

              <p className="legal-text">
                Tu información es privada. No enviamos spam. Solo te escribiremos cuando el
                taller esté listo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <span className="logo-wrap">
                {!logoError ? (
                  <img
                    src="/taller/logo.png"
                    alt="Moises Mejias"
                    className="logo-img"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="logo">Moises.</span>
                )}
              </span>
              <p className="footer-tagline">Estrategia · Marketing · IA</p>
            </div>
            <div className="footer-right">
              <a
                href="https://www.instagram.com/soymoisesmkt/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
