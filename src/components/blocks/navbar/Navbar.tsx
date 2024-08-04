'use client'

import { BarChartIcon, BookIcon, LayoutGridIcon } from "lucide-react"
import Link from "next/link"
import { SignoutButton } from "../auth/SignoutButton"
import { usePathname } from "next/navigation"

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGridIcon },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChartIcon,
  },
  { name: 'Recipes', href: '/dashboard/recipes', icon: BookIcon },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-muted/40 border-r px-4 py-6 flex flex-col justify-between h-screen">
      <div className="flex flex-col gap-4">
        {links.map((link) => {
          const LinkIcon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
                }`}
              prefetch={false}
            >
              <LinkIcon className="w-5 h-5" />
              {link.name}
            </Link>
          )
        })}
      </div>
      <SignoutButton />
    </aside>
  )
}