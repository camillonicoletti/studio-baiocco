// app/api/contatti/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("re_JyYsFopx_5MyArqQ3BPPnCGsVvSjcC3KW");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefono, messaggio } = body;

    if (!nome || !email || !messaggio) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Sito Studio Baiocco <noreply@studiobaioccoromana.it>',
      to: ['studiobaiocco@gmail.com'],
      replyTo: email,
      subject: `📬 Nuovo messaggio da ${nome} — Studio Baiocco`,
      html: `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuovo messaggio</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f2f5; font-family: 'Segoe UI', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%); border-radius: 16px 16px 0 0; padding: 40px 40px 32px 40px; text-align: center;">
              <div style="display:inline-block; background: rgba(255,255,255,0.1); border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 28px; margin-bottom: 16px;">
                📬
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                Nuovo messaggio dal sito
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.6); font-size: 14px;">
                Studio Baiocco · Consulenza del Lavoro
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background: #ffffff; padding: 40px;">

              <!-- Badge notifica -->
              <div style="background: #eef4ff; border-left: 4px solid #1a3a6b; border-radius: 4px; padding: 14px 18px; margin-bottom: 32px;">
                <p style="margin: 0; color: #1a3a6b; font-size: 14px; font-weight: 600;">
                  Hai ricevuto una nuova richiesta di contatto.
                </p>
              </div>

              <!-- Info mittente -->
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 1px;">
                Dati del mittente
              </p>

              <!-- Nome -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                <tr>
                  <td style="background: #f8f9fb; border-radius: 10px; padding: 16px 20px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.8px;">Nome e Cognome</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0a1628;">${nome}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                <tr>
                  <td style="background: #f8f9fb; border-radius: 10px; padding: 16px 20px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.8px;">Email</p>
                    <a href="mailto:${email}" style="margin: 0; font-size: 16px; font-weight: 600; color: #1a3a6b; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Telefono -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="background: #f8f9fb; border-radius: 10px; padding: 16px 20px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.8px;">Telefono</p>
                    ${telefono
                      ? `<a href="tel:${telefono}" style="margin: 0; font-size: 16px; font-weight: 600; color: #1a3a6b; text-decoration: none;">${telefono}</a>`
                      : `<p style="margin: 0; font-size: 15px; color: #bbb; font-style: italic;">Non fornito</p>`
                    }
                  </td>
                </tr>
              </table>

              <!-- Messaggio -->
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 1px;">
                Messaggio
              </p>
              <div style="background: #f8f9fb; border-radius: 10px; padding: 20px; border: 1px solid #eee;">
                <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.7; white-space: pre-wrap;">${messaggio.replace(/\n/g, '<br/>')}</p>
              </div>

              <!-- CTA Rispondi -->
              <div style="text-align: center; margin-top: 32px;">
                <a href="mailto:${email}?subject=Re: Richiesta dal sito Studio Baiocco"
                   style="display: inline-block; background: linear-gradient(135deg, #0a1628, #1a3a6b); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 36px; border-radius: 50px; letter-spacing: 0.3px;">
                  ✉️ Rispondi a ${nome}
                </a>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background: #f8f9fb; border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0 0 4px; font-size: 13px; font-weight: 700; color: #0a1628;">
                Studio Baiocco · Consulenza del Lavoro
              </p>
              <p style="margin: 0; font-size: 12px; color: #999;">
                Via Pietro Nenni, 10 · Matera &nbsp;|&nbsp;
                <a href="tel:+393477005683" style="color: #999; text-decoration: none;">(+39) 347 700 5683</a>
              </p>
              <p style="margin: 12px 0 0; font-size: 11px; color: #bbb;">
                Questa email è stata generata automaticamente dal form di contatto su
                <a href="https://studiobaioccoromana.it" style="color: #bbb;">studiobaioccoromana.it</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: "Errore nell'invio dell'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Errore del server.' },
      { status: 500 }
    );
  }
}
