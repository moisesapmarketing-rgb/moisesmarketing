import { NextRequest, NextResponse } from "next/server";

// TODO: cambiar a un remitente del dominio propio (ej. noreply@moisesmejias.com)
// una vez que ese dominio esté verificado en Resend. Hasta entonces, con este
// remitente de prueba Resend solo entrega al correo dueño de la cuenta.
const FROM_ADDRESS = "Moises Mejias <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY no configurada" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const nombre = typeof body?.nombre === "string" ? body.nombre.trim() : "";
  const correo = typeof body?.correo === "string" ? body.correo.trim() : "";

  if (!nombre || !correo) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const primerNombre = nombre.split(" ")[0];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:40px 28px;background:#0F172A;color:#F8FAFC;">
      <p style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#60A5FA;margin:0 0 20px;">Registro confirmado</p>
      <h1 style="font-size:26px;font-weight:900;margin:0 0 20px;line-height:1.25;">Ya estás en la lista, ${primerNombre}.</h1>
      <p style="font-size:16px;line-height:1.7;color:#94A3B8;margin:0 0 16px;">
        Tu registro para el <strong style="color:#F8FAFC;">Taller de Claude AI en Lima</strong> quedó confirmado.
      </p>
      <p style="font-size:16px;line-height:1.7;color:#94A3B8;margin:0 0 16px;">
        Vas a ser de los primeros en enterarte cuando abramos las inscripciones oficiales — antes que nadie, con acceso al precio de lanzamiento exclusivo reservado para los primeros 30.
      </p>
      <p style="font-size:16px;line-height:1.7;color:#94A3B8;margin:0 0 28px;">
        Como parte de este grupo, también vas a recibir un regalo especial el día del evento.
      </p>
      <p style="font-size:16px;line-height:1.7;color:#F8FAFC;margin:0;">Nos vemos pronto,<br>Moises</p>
    </div>
  `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [correo],
      subject: "Ya estás en la lista — Taller Claude AI Lima 🔒",
      html,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    return NextResponse.json({ error: errText }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
