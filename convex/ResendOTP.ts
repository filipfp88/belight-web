import { Email } from "@convex-dev/auth/providers/Email";

function generateOTP(length: number): string {
  const digits = "0123456789";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (num) => digits[num % digits.length]).join("");
}

async function sendEmail(apiKey: string, to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "BE-LIGHT Admin <noreply@belight.cz>",
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Resend chyba: ${(err as any).message ?? res.status}`);
  }
}

export const ResendOTP = Email({
  id: "resend-otp",
  maxAge: 60 * 15,
  async generateVerificationToken() {
    return generateOTP(6);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    // Kontrola whitelistu
    const siteUrl = process.env.CONVEX_SITE_URL;
    if (siteUrl) {
      const checkRes = await fetch(`${siteUrl}/check-admin-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (checkRes.ok) {
        const { allowed } = await checkRes.json();
        if (!allowed) throw new Error("Přístup zamítnut. Kontaktujte administrátora.");
      }
    } else {
      if (!email.endsWith("@ledshopik.cz")) {
        throw new Error("Přístup zamítnut. Kontaktujte administrátora.");
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY není nastavený");

    await sendEmail(
      apiKey,
      email,
      "Přihlašovací kód — BE-LIGHT Admin",
      `
        <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:32px;">
          <h2 style="color:#1a1a1a;margin-bottom:8px;">Přihlášení do adminu</h2>
          <p style="color:#555;margin-bottom:24px;">Váš jednorázový přihlašovací kód:</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:24px;text-align:center;">
            <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a1a1a;">${token}</span>
          </div>
          <p style="color:#999;font-size:13px;margin-top:24px;">Kód platí 15 minut. Pokud jste o přihlášení nežádali, ignorujte tento email.</p>
        </div>
      `
    );
  },
});
