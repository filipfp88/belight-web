"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RealizaceRedirect() {
  const router = useRouter()
  useEffect(() => {
    console.log("RealizaceRedirect: redirecting to /#realizace")
    router.replace("/#realizace")
  }, [router])
  return null
}
