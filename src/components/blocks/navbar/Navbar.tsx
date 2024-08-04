'use client'

import { BarChartIcon, BookIcon, ChevronDown, ChevronUp, LayoutGridIcon } from "lucide-react"
import Link from "next/link"
import { SignoutButton } from "../auth/SignoutButton"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getLatestUserRecipes } from "@/lib/firestoreApi"

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGridIcon },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChartIcon,
  },
  { name: 'Recipes', href: '/dashboard/recipes', icon: BookIcon },
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
      <div className="flex flex-col gap-4">
        {links.map((link) => {
          const LinkIcon = link.icon
          const isRecipeLink = link.name === 'Recipes';
          const isActive = pathname === link.href || (isRecipeLink && pathname.startsWith(link.href));

          return (
            <div key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                prefetch={false}
                onClick={() => {
                  if (isRecipeLink) {
                    setIsRecipesOpen(!isRecipesOpen);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  {link.name}
                </div>
                {isRecipeLink && (
                  latestRecipes.length > 0 ? (
                    isRecipesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  ) : null
                )}
              </Link>
              {isRecipeLink && isRecipesOpen && latestRecipes.length > 0 && (
                <ul className="ml-6 mt-2 space-y-1">
                  {latestRecipes.map((recipe) => (
                    <li key={recipe.id}>
                      <Link
                        href={`/dashboard/recipes?id=${recipe.id}`}
                        className="text-sm text-muted-foreground hover:text-accent-foreground block py-1 px-2 rounded-md hover:bg-accent"
                      >
                        {recipe.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
      <SignoutButton />
    </aside>
  )
}
