"use client";

export default function WhatsAppButton() {
  const phone = "51990339180";
  const msg = encodeURIComponent(
    "Hola Moises, vi tu web y quiero conversar sobre mi negocio."
  );
  const href = `https://wa.me/${phone}?text=${msg}`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          cursor: "pointer",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1.1)";
          el.style.boxShadow = "0 6px 28px rgba(37,211,102,0.65)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)";
        }}
      >
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "30px", height: "30px", fill: "#fff" }}
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.736 5.474 2.026 7.773L0 32l8.466-2.001A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.322 22.678c-.347.975-2.018 1.862-2.77 1.978-.714.107-1.613.152-2.602-.163a23.854 23.854 0 01-2.352-.87C12.41 22.037 9.9 18.5 9.706 18.244c-.194-.256-1.584-2.108-1.584-4.022 0-1.913 1.004-2.857 1.36-3.245.356-.388.777-.485 1.036-.485.259 0 .518.002.744.014.238.013.558-.09.874.668.325.777 1.103 2.69 1.201 2.885.097.194.162.42.032.679-.13.258-.194.42-.388.646-.194.226-.409.505-.583.678-.194.194-.396.404-.17.793.226.388 1.003 1.652 2.153 2.676 1.48 1.319 2.728 1.727 3.116 1.922.388.194.614.162.84-.097.226-.26.968-1.133 1.228-1.52.259-.389.518-.324.873-.195.356.13 2.264 1.068 2.653 1.263.389.194.647.29.745.452.097.162.097.938-.25 1.913z" />
        </svg>
      </a>

      {/* Tooltip "¡Conversemos!" visible on hover via CSS */}
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }
          50%       { box-shadow: 0 4px 28px rgba(37,211,102,0.7); }
        }
        a[aria-label="Contactar por WhatsApp"] {
          animation: wa-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
