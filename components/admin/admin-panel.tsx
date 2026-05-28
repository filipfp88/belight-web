"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth } from "convex/react"
import { useState } from "react"
import LoginForm from "./login-form"
import ProjectsTab from "./projects-tab"
import SeoTab from "./seo-tab"
import RedirectsTab from "./redirects-tab"
import SettingsTab from "./settings-tab"
import CatalogsTab from "./catalogs-tab"
import SliderTab from "./slider-tab"
import ShowroomsTab from "./showrooms-tab"
import ContentTab from "./content-tab"
import LandingPagesTab from "./landing-pages-tab"

type Tab = "projects" | "catalogs" | "slider" | "showrooms" | "content" | "landing" | "seo" | "redirects" | "settings"

const tabs: { id: Tab; label: string; icon: string; group?: string }[] = [
  { id: "projects", label: "Projekty", icon: "◈", group: "Web" },
  { id: "catalogs", label: "Katalogy", icon: "📄", group: "Web" },
  { id: "slider", label: "Před / Po", icon: "⇄", group: "Web" },
  { id: "showrooms", label: "Showroomy", icon: "📍", group: "Web" },
  { id: "content", label: "Obsah webu", icon: "✏", group: "Web" },
  { id: "landing", label: "Landing pages", icon: "↗", group: "Web" },
  { id: "seo", label: "SEO", icon: "◎", group: "Technické" },
  { id: "redirects", label: "Přesměrování", icon: "↪", group: "Technické" },
  { id: "settings", label: "Nastavení", icon: "⚙", group: "Technické" },
]

export default function AdminPanel() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const { signOut } = useAuthActions()
  const [activeTab, setActiveTab] = useState<Tab>("projects")

  const groups = ["Web", "Technické"]

  if (isLoading) return null
  if (!isAuthenticated) return <LoginForm />

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ebebeb] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-[#C9A84C] font-serif italic text-xl tracking-wide">BE-LIGHT</div>
          <div className="text-xs text-white/40 mt-1">Admin panel</div>
        </div>

        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {groups.map((group) => (
            <div key={group}>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 px-3 mb-1">{group}</p>
              <div className="space-y-0.5">
                {tabs.filter((t) => t.group === group).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === tab.id
                        ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base leading-none">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Odhlasit tlacitko skryto – auth docasne vypnuta */}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "catalogs" && <CatalogsTab />}
        {activeTab === "slider" && <SliderTab />}
        {activeTab === "showrooms" && <ShowroomsTab />}
        {activeTab === "content" && <ContentTab />}
        {activeTab === "landing" && <LandingPagesTab />}
        {activeTab === "seo" && <SeoTab />}
        {activeTab === "redirects" && <RedirectsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  )
}
