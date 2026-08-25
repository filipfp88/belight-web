import { NextRequest, NextResponse } from "next/server";
import { fetchAction } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// Rate limiting: max 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hodina

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Příliš mnoho požadavků. Zkuste to za hodinu." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, city, message, source, recaptchaToken, attachmentUrl } = body as {
      name: string; email: string; phone?: string; city?: string;
      message?: string; source: string; recaptchaToken?: string; attachmentUrl?: string;
    };

    // Ověření reCAPTCHA tokenu
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey && recaptchaToken) {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json({ error: "Ověření selhalo, zkuste to znovu." }, { status: 400 });
      }
    }

    if (!name || !email || !source) {
      return NextResponse.json({ error: "Chybí povinná pole" }, { status: 400 });
    }
    if (typeof name !== "string" || name.length > 100) {
      return NextResponse.json({ error: "Neplatné jméno" }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Neplatný email" }, { status: 400 });
    }
    if (message && (typeof message !== "string" || message.length > 5000)) {
      return NextResponse.json({ error: "Zpráva je příliš dlouhá" }, { status: 400 });
    }

    await fetchAction(api.contactRequests.submitAndNotify, {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim().slice(0, 30) : undefined,
      city: typeof city === "string" ? city.trim().slice(0, 100) : undefined,
      message: typeof message === "string" ? message.trim() : undefined,
      source,
      recaptchaToken: recaptchaToken ?? undefined,
      attachmentUrl: typeof attachmentUrl === "string" ? attachmentUrl : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.log("[contact-notify] Error:", err);
    return NextResponse.json({ error: "Odeslání selhalo" }, { status: 500 });
  }
}
