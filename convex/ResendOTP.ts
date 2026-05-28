import { Email } from "@convex-dev/auth/providers/Email";

function generateOTP(length: number): string {
  const digits = "0123456789";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (num) => digits[num % digits.length]).join("");
}

export const ResendOTP = Email({
  id: "resend-otp",
  maxAge: 60 * 15,
  async generateVerificationToken() {
    return generateOTP(6);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    // Check if email is allowed (domain @ledshopik.cz or individual whitelist)
    const siteUrl = process.env.CONVEX_SITE_URL;
    if (siteUrl) {
      const checkRes = await fetch(`${siteUrl}/check-admin-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (checkRes.ok) {
        const { allowed } = await checkRes.json();
        if (!allowed) {
          throw new Error("Přístup zamítnut. Kontaktujte administrátora.");
        }
      }
    } else {
      // Fallback: allow only @ledshopik.cz if env not available
      if (!email.endsWith("@ledshopik.cz")) {
        throw new Error("Přístup zamítnut. Kontaktujte administrátora.");
      }
    }

    const response = await fetch(`${process.env.OTP_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        token,
        chatId: process.env.CHAT_ID,
        appName: `${process.env.APP_NAME}` || "My App",
        secretKey: process.env.SECRET_KEY,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to send verification email");
    }
  },
});
