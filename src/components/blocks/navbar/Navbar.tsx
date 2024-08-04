'use client'

import { BarChartIcon, BookIcon, LayoutGridIcon } from "lucide-react"
import Link from "next/link"
import { SignoutButton } from "../auth/SignoutButton"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getLatestUserRecipes } from "@/lib/firestoreApi"
import { removePrefix } from "@/lib/utils"

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGridIcon
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChartIcon,
  },
  {
    name: 'Recipes',
    href: '/dashboard/recipes',
    icon: BookIcon
  },
];

interface NavbarProps {
  userId: string;
}

export const Navbar = ({ userId }: NavbarProps) => {
  const pathname = usePathname();
  const [latestRecipes, setLatestRecipes] = useState<Array<{ id: string; title: string }>>([]);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getLatestUserRecipes(userId);
      setLatestRecipes(recipes);
    };

    fetchRecipes();
  }, [userId]);

  return (
    <aside className="bg-muted/40 border-r px-4 py-6 flex flex-col justify-between h-screen">
      <div className="flex flex-col">
        <nav className="flex flex-col gap-2 mb-8">
          {links.map((link) => {
            const LinkIcon = link.icon
            const isActive = pathname === link.href || (link.name === 'Recipes' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
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
        </nav>

        {latestRecipes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">Recent Recipes</h3>
            <ul className="space-y-1">
              {latestRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <Link
                    href={`/dashboard/recipes?id=${recipe.id}`}
                    className="text-sm text-muted-foreground hover:text-accent-foreground block py-1 px-3 rounded-md hover:bg-accent"
                  >
                    {removePrefix(recipe.title, "Title: ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SignoutButton />
    </aside>
  )
}
