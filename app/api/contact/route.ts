import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, phone } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, Email und Nachricht sind Pflichtfelder.' },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || 'noreply@example.com';

    if (!contactEmail) {
      return NextResponse.json(
        { error: 'Kontakt-Email nicht konfiguriert.' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `Kontaktformular <${fromEmail}>`,
      to: [contactEmail],
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <table style="border-collapse: collapse; font-family: sans-serif;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 8px; font-weight: bold;">Telefon:</td>
            <td style="padding: 8px;">${phone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; font-weight: bold;">Nachricht:</td>
            <td style="padding: 8px;">${message}</td>
          </tr>
        </table>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht.' },
      { status: 500 }
    );
  }
}
