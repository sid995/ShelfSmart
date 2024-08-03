'use client'

import { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Layout, BarChart2, BookOpen, LogOut } from 'lucide-react';
import { signOutUser } from '@/lib/auth';

const navItems = [
  { text: 'Dashboard', icon: Layout, path: '/dashboard' },
  { text: 'Analytics', icon: BarChart2, path: '/analytics' },
  { text: 'Recipe', icon: BookOpen, path: '/recipe' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/signin');
  };

  return (
    <nav className={`h-screen bg-background shadow-md flex flex-col justify-between transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div>
        <div className="p-4 text-center">
          {/* Logo */}
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.text}>
                <Button
                  variant={pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start px-2 py-6 ${pathname === item.path ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent hover:text-accent-foreground'}`}
                  onClick={() => router.push(item.path)}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
                  {!isCollapsed && <span>{item.text}</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4">
        <Button
          variant="destructive"
          className="w-full justify-start px-2 py-6"
          onClick={handleSignOut}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </nav>
  );
}