"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { useState } from "react"

export default function LoginForm() {
  const { signIn } = useAuthActions()
  const [step, setStep] = useState<"email" | "code">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signIn("resend-otp", { email })
      setStep("code")
    } catch (err) {
      console.log("[admin login] send code error:", err)
      setError("Nepodařilo se odeslat kód. Zkontrolujte email.")
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signIn("resend-otp", { email, code })
    } catch (err) {
      console.log("[admin login] verify code error:", err)
      setError("Neplatný nebo vypršelý kód. Zkuste znovu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-[#C9A84C] font-serif italic text-3xl tracking-wider">BE-LIGHT</div>
          <div className="text-white/40 text-sm mt-2">Administrace</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-5">
              <div>
                <h2 className="text-white text-lg font-light mb-1">Přihlášení</h2>
                <p className="text-white/40 text-sm">Zadejte svůj email a pošleme vám jednorázový kód.</p>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-xs uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="vas@email.cz"
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#C9A84C] text-[#0a0a0a] font-medium py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Odesílám..." : "Odeslat kód"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <h2 className="text-white text-lg font-light mb-1">Ověření</h2>
                <p className="text-white/40 text-sm">
                  Zadejte kód zaslaný na <span className="text-white/60">{email}</span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-xs uppercase tracking-wider">Kód</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="123456"
                  maxLength={8}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-center text-xl tracking-widest"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || !code}
                className="w-full bg-[#C9A84C] text-[#0a0a0a] font-medium py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Ověřuji..." : "Přihlásit se"}
              </button>

              <button
                type="button"
                onClick={() => { setStep("email"); setCode(""); setError("") }}
                className="w-full text-white/40 text-sm hover:text-white/60 transition-colors"
              >
                ← Zpět
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
