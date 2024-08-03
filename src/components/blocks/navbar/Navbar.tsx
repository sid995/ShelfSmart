'use client'

import { Button } from "@/components/ui/button"
import { BarChartIcon, BookIcon, LayoutGridIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SignoutButton } from "../auth/SignoutButton"

export const Navbar = async () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <aside className="bg-muted/40 border-r px-4 py-6 h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <Link
          href="#"
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${activeTab === "dashboard"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
            }`}
          onClick={() => setActiveTab("dashboard")}
          prefetch={false}
        >
          <LayoutGridIcon className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${activeTab === "analytics"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
            }`}
          onClick={() => setActiveTab("analytics")}
          prefetch={false}
        >
          <BarChartIcon className="w-5 h-5" />
          Analytics
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${activeTab === "recipe"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
            }`}
          onClick={() => setActiveTab("recipe")}
          prefetch={false}
        >
          <BookIcon className="w-5 h-5" />
          Recipe
        </Link>
      </div>
      <SignoutButton />
    </aside>
  )
}